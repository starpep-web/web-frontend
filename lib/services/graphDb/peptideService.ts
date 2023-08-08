import { QueryResult, int } from 'neo4j-driver';
import { readTransaction, sanitizeInput } from './dbService';
import {
  SearchResultPeptide,
  FullPeptide,
  PeptideMetadata,
  PeptideAttributes,
  RawRelationshipLabel,
  MetadataRelationshipLabel,
  getRelationshipLabelFromRaw,
  getPeptideId, extractIdentityFromId
} from '@lib/models/peptide';
import { WithPagination, createPagination } from '@lib/utils/pagination';
import { TextQueryMetadataFilter } from '@lib/models/search';

const parseSearchPeptideAttributes = (properties: PeptideAttributes.Neo4jProperties): PeptideAttributes.SearchAttributes => {
  return {
    hydropathicity: properties.hydropathicity,
    charge: properties.charge.toInt(),
    isoelectricPoint: properties.isoelectric_point,
    bomanIndex: properties.boman_index,
    gaacAlphatic: properties.gaac_alphatic,
    gaacAromatic: properties.gaac_aromatic,
    gaacPositiveCharge: properties.gaac_positive_charge,
    gaacNegativeCharge: properties.gaac_negative_charge,
    gaacUncharge: properties.gaac_uncharge
  };
};

const parseFullPeptideAttributes = (properties: PeptideAttributes.Neo4jProperties): PeptideAttributes.FullAttributes => {
  return {
    ...parseSearchPeptideAttributes(properties),
    hydrophobicity: properties.hydrophobicity,
    solvation: properties.solvation,
    amphiphilicity: properties.amphiphilicity,
    hydrophilicity: properties.hydrophilicity,
    hemolyticProbScore: properties.hemolytic_prob_score,
    stericHindrance: properties.steric_hindrance,
    netHydrogen: properties.net_hydrogen.toInt(),
    molWt: properties.mol_wt,
    aliphaticIndex: properties.aliphatic_index
  };
};

const parseFullPeptideFromQueryResult = (result: QueryResult): FullPeptide | null => {
  const [firstRecord] = result.records;

  if (!firstRecord) {
    return null;
  }

  const peptideNode = firstRecord.get('n');
  const [metadata, attributes]: [PeptideMetadata, PeptideAttributes.FullAttributes] = result.records.reduce((peptideData, record) => {
    const rawRelationship: RawRelationshipLabel = record.get('r').type;

    if (rawRelationship === 'characterized_by') {
      peptideData[1] = parseFullPeptideAttributes(record.get('v').properties);
    } else {
      const peptideDataObject = peptideData[0];
      const relationship = getRelationshipLabelFromRaw(rawRelationship) as MetadataRelationshipLabel;
      const value = record.get('v').properties.name;

      if (!peptideDataObject[relationship]) {
        peptideDataObject[relationship] = [value];
      } else {
        peptideDataObject[relationship]!.push(value);
      }
    }

    return peptideData;
  }, [{}, {}] as [PeptideMetadata, PeptideAttributes.FullAttributes]);

  return {
    id: getPeptideId(peptideNode.identity.toInt()),
    sequence: peptideNode.properties.seq,
    length: peptideNode.properties.seq.length,
    metadata,
    attributes
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

// TODO: Search filters should work with attributes too. Implementation for them maybe different than these.
const parseSearchMetadataFilters = (filters?: TextQueryMetadataFilter[]): string => {
  if (!filters || !filters.length) {
    return '';
  }

  // FilterOperator, MetadataLabel, and FilterComparator are already validated prior to calling this function.
  return filters.reduce((text, [operator, metadataLabel, comparator, filterValue]) => {
    const operatorText = comparator.startsWith('NOT') ? `${operator} NOT` : operator;

    return text.concat(`${operatorText} (n)-[]->(:${metadataLabel} {name: "${sanitizeInput(filterValue)}" }) `); // Last white space is important.
  }, '');
};

export const searchPeptidesTextQuery = async (sequence: string, limit: number, skip: number, sanitizedFilter: string): Promise<SearchResultPeptide[]> => {
  const query = `MATCH (n:Peptide)-[]->(v:Attributes) WHERE n.seq CONTAINS $sequence ${sanitizedFilter} RETURN DISTINCT(n), v ORDER BY ID(n) ASC SKIP $skip LIMIT $limit`;
  const result = await readTransaction(query, { sequence: sequence.toUpperCase(), limit, skip });

  return result.records.map((r) => {
    const node = r.get('n');
    const attributes = parseSearchPeptideAttributes(r.get('v').properties);

    return {
      id: getPeptideId(node.identity.toInt()),
      sequence: node.properties.seq,
      length: node.properties.seq.length,
      attributes
    };
  });
};

export const searchPeptidesTextQueryPaginated = async (
  sequence: string,
  page: number,
  metadataFilters?: TextQueryMetadataFilter[],
  limit = 50
): Promise<WithPagination<SearchResultPeptide[]>> => {
  const start = (page - 1) * limit;
  const sanitizedFilter = parseSearchMetadataFilters(metadataFilters);

  const countQuery = `MATCH (n:Peptide) WHERE n.seq CONTAINS $sequence ${sanitizedFilter} RETURN COUNT(DISTINCT(n)) AS c`;
  const result = await readTransaction(countQuery, { sequence: sequence.toUpperCase() });
  const total = result.records[0]?.get('c').toInt() ?? 0;

  const pagination = createPagination(start, total, limit);

  return {
    data: await searchPeptidesTextQuery(sequence, limit, start, sanitizedFilter),
    pagination
  };
};

export const searchPeptidesRegexQuery = async (regex: string, limit: number, skip: number, sanitizedFilter: string): Promise<SearchResultPeptide[]> => {
  const query = `MATCH (n:Peptide)-[]->(v:Attributes) WHERE n.seq =~ $regex ${sanitizedFilter} RETURN DISTINCT(n), v ORDER BY ID(n) ASC SKIP $skip LIMIT $limit`;
  const result = await readTransaction(query, { regex, limit, skip });

  return result.records.map((r) => {
    const node = r.get('n');
    const attributes = parseSearchPeptideAttributes(r.get('v').properties);

    return {
      id: getPeptideId(node.identity.toInt()),
      sequence: node.properties.seq,
      length: node.properties.seq.length,
      attributes
    };
  });
};

export const searchPeptidesRegexQueryPaginated = async (
  regex: string,
  page: number,
  metadataFilters?: TextQueryMetadataFilter[],
  limit = 50
): Promise<WithPagination<SearchResultPeptide[]>> => {
  const start = (page - 1) * limit;
  const sanitizedFilter = parseSearchMetadataFilters(metadataFilters);

  const countQuery = `MATCH (n:Peptide) WHERE n.seq =~ $regex ${sanitizedFilter} RETURN COUNT(DISTINCT(n)) AS c`;
  const result = await readTransaction(countQuery, { regex });
  const total = result.records[0]?.get('c').toInt() ?? 0;

  const pagination = createPagination(start, total, limit);

  return {
    data: await searchPeptidesRegexQuery(regex, limit, start, sanitizedFilter),
    pagination
  };
};
