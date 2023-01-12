import { readTransaction } from './dbService';
import type { PathSegment } from 'neo4j-driver';
import { Peptide, FullPeptide } from '@lib/models/peptide';

// eslint-disable-next-line no-warning-comments
// TODO: Remove this function.
export const getPeptidesConstitutedBy = async () => {
  const query = 'MATCH p=()-[r:constituted_by]->() RETURN p LIMIT 25';
  const result = await readTransaction(query);

  return result.records.map((r) => {
    return r.get('p').segments.map((s: PathSegment<any>) => {
      return {
        start: s.start.identity.toString(),
        startName: s.start.properties.seq,
        end: s.end.identity.toString(),
        endName: s.end.properties.name,
        relationshipType: s.relationship.type
      };
    });
  });
};

// eslint-disable-next-line no-warning-comments
// TODO: Get Peptide with properties.
export const getPeptideBySequence = async (sequence: string): Promise<FullPeptide | null> => {
  const query = 'MATCH (n:Peptide {seq: $sequence}) RETURN n LIMIT 1';
  const result = await readTransaction(query, { sequence: sequence.toUpperCase() });
  const [record] = result.records;

  if (!record) {
    return null;
  }

  const node = record.get('n');
  return {
    sequence: node.properties.seq
  };
};

// eslint-disable-next-line no-warning-comments
// TODO: Implement pagination logic.
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
