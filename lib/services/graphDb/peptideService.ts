import { readTransaction } from './dbService';
import type { PathSegment } from 'neo4j-driver';

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
export const getPeptideBySeq = async (seq: string): Promise<string | null> => {
  const query = 'MATCH (n:Peptide {seq: $seq}) RETURN n';
  const result = await readTransaction(query, { seq });

  if (result.records.length < 1) {
    return null;
  }

  return result.records[0].get('n').properties.seq;
};

export const searchPeptidesSingleQuery = async (seq: string, limit: number, skip: number): Promise<string[]> => {
  const query = 'MATCH (n:Peptide) WHERE n.seq CONTAINS $seq RETURN n SKIP $skip LIMIT $limit';
  const result = await readTransaction(query, { seq, limit, skip });

  return result.records.map((r) => r.get('n'));
};
