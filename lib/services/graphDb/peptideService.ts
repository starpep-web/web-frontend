import { getSession } from './dbService';
import type { PathSegment } from 'neo4j-driver';

export const getPeptidesConstitutedBy = async () => {
  const session = getSession();
  const query = 'MATCH p=()-[r:constituted_by]->() RETURN p LIMIT 25';

  const result = await session.readTransaction((tx) => {
    return tx.run(query);
  });

  await session.close();

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
