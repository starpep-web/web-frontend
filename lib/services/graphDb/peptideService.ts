/* eslint-disable max-len */
/* eslint-disable max-params */
import { QueryResult, int } from 'neo4j-driver';
import { readTransaction, sanitizeInput } from './dbService';
import {
  Peptide,
  FullPeptide,
  PeptideMetadata,
  RawRelationshipLabel,
  getRelationshipLabelFromRaw,
  getPeptideId, extractIdentityFromId
} from '@lib/models/peptide';
import { WithPagination, createPagination } from '@lib/utils/pagination';
import { TextQueryFilter } from '@lib/models/search';

const parseFullPeptideFromQueryResult = (result: QueryResult): FullPeptide | null => {
  const [firstRecord] = result.records;

  if (!firstRecord) {
    return null;
  }

  const peptideNode = firstRecord.get('n');
  const metadata: PeptideMetadata = result.records.reduce((metadata, record) => {
    const rawRelationship: RawRelationshipLabel = record.get('r').type;
    const relationship = getRelationshipLabelFromRaw(rawRelationship);
    const value = record.get('v').properties.name;

    if (!metadata[relationship]) {
      metadata[relationship] = [value];
    } else {
      metadata[relationship]!.push(value);
    }

    return metadata;
  }, {} as PeptideMetadata);

  return {
    id: getPeptideId(peptideNode.identity.toInt()),
    sequence: peptideNode.properties.seq,
    length: peptideNode.properties.seq.length,
    metadata
  };
};

export const getPeptideById = async (id: string): Promise<FullPeptide | null> => {
  const identity = extractIdentityFromId(id);
  if (!identity) {
    return null;
  }

  const query = 'MATCH (n:Peptide)-[r]->(v) WHERE ID(n) = $id RETURN n, r, v';
  const result = await readTransaction(query, { id: int(identity) });

  return parseFullPeptideFromQueryResult(result);
};

export const getPeptideBySequence = async (sequence: string): Promise<FullPeptide | null> => {
  const query = 'MATCH (n:Peptide {seq: $sequence})-[r]->(v) RETURN n, r, v';
  const result = await readTransaction(query, { sequence: sequence.toUpperCase() });

  return parseFullPeptideFromQueryResult(result);
};

const parseSearchFilter = (filters?: TextQueryFilter[]): string => {
  if (!filters || !filters.length) {
    return '';
  }

  // FilterOperator, MetadataLabel, and FilterComparator are already validated prior to calling this function.
  return filters.reduce((text, [operator, metadataLabel, comparator, filterValue]) => {
    const operatorText = comparator.startsWith('NOT') ? `${operator} NOT` : operator;

    return text.concat(`${operatorText} (n)-[]->(:${metadataLabel} {name: "${sanitizeInput(filterValue)}" }) `); // Last white space is important.
  }, '');
};

export const searchPeptidesTextQuery = async (sequence: string, limit: number, skip: number, sanitizedFilter: string): Promise<Peptide[]> => {
  const query = `MATCH (n:Peptide) WHERE n.seq CONTAINS $sequence ${sanitizedFilter} RETURN DISTINCT(n) ORDER BY ID(n) ASC SKIP $skip LIMIT $limit`;
  const result = await readTransaction(query, { sequence: sequence.toUpperCase(), limit, skip });

  return result.records.map((r) => {
    const node = r.get('n');

    return {
      id: getPeptideId(node.identity.toInt()),
      sequence: node.properties.seq,
      length: node.properties.seq.length
    };
  });
};

export const searchPeptidesTextQueryPaginated = async (sequence: string, page: number, filters?: TextQueryFilter[], limit = 50): Promise<WithPagination<Peptide[]>> => {
  const start = (page - 1) * limit;
  const sanitizedFilter = parseSearchFilter(filters);

  const countQuery = `MATCH (n:Peptide) WHERE n.seq CONTAINS $sequence ${sanitizedFilter} RETURN COUNT(DISTINCT(n)) AS c`;
  const result = await readTransaction(countQuery, { sequence: sequence.toUpperCase() });
  const total = result.records[0]?.get('c').toInt() ?? 0;

  const pagination = createPagination(start, total, limit);

  return {
    data: await searchPeptidesTextQuery(sequence, limit, start, sanitizedFilter),
    pagination
  };
};

export const searchPeptidesRegexQuery = async (regex: string, limit: number, skip: number, sanitizedFilter: string): Promise<Peptide[]> => {
  const query = `MATCH (n:Peptide) WHERE n.seq =~ $regex ${sanitizedFilter} RETURN DISTINCT(n) ORDER BY ID(n) ASC SKIP $skip LIMIT $limit`;
  const result = await readTransaction(query, { regex, limit, skip });

  return result.records.map((r) => {
    const node = r.get('n');

    return {
      id: getPeptideId(node.identity.toInt()),
      sequence: node.properties.seq,
      length: node.properties.seq.length
    };
  });
};

export const searchPeptidesRegexQueryPaginated = async (regex: string, page: number, filters?: TextQueryFilter[], limit = 50): Promise<WithPagination<Peptide[]>> => {
  const start = (page - 1) * limit;
  const sanitizedFilter = parseSearchFilter(filters);

  const countQuery = `MATCH (n:Peptide) WHERE n.seq =~ $regex ${sanitizedFilter} RETURN COUNT(DISTINCT(n)) AS c`;
  const result = await readTransaction(countQuery, { regex });
  const total = result.records[0]?.get('c').toInt() ?? 0;

  const pagination = createPagination(start, total, limit);

  return {
    data: await searchPeptidesRegexQuery(regex, limit, start, sanitizedFilter),
    pagination
  };
};
