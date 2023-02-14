import { readTransaction } from './dbService';
import {
  Peptide,
  FullPeptide,
  PeptideMetadata,
  RawRelationshipLabel,
  getRelationshipLabelFromRaw
} from '@lib/models/peptide';
import { WithPagination, createPagination } from '@lib/utils/pagination';

export const getPeptideBySequence = async (sequence: string): Promise<FullPeptide | null> => {
  const query = 'MATCH (n:Peptide {seq: $sequence})-[r]->(v) RETURN n, r, v';
  const result = await readTransaction(query, { sequence: sequence.toUpperCase() });
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
    sequence: peptideNode.properties.seq,
    metadata
  };
};

export const searchPeptidesSingleQuery = async (sequence: string, limit: number, skip: number): Promise<Peptide[]> => {
  const query = 'MATCH (n:Peptide) WHERE n.seq CONTAINS $sequence RETURN n SKIP $skip LIMIT $limit';
  const result = await readTransaction(query, { sequence: sequence.toUpperCase(), limit, skip });

  return result.records.map((r) => {
    const node = r.get('n');

    return {
      sequence: node.properties.seq
    };
  });
};

export const searchPeptidesSingleQueryPaginated = async (sequence: string, page: number, limit = 50): Promise<WithPagination<Peptide[]>> => {
  const start = (page - 1) * limit;

  const countQuery = 'MATCH (n:Peptide) WHERE n.seq CONTAINS $sequence RETURN COUNT(n) AS c';
  const result = await readTransaction(countQuery, { sequence: sequence.toUpperCase() });
  const total = result.records[0]?.get('c').toInt() ?? 0;

  const pagination = createPagination(start, total, limit);

  return {
    data: await searchPeptidesSingleQuery(sequence, limit, start),
    pagination
  };
};
