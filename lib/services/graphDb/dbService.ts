import neo4j from 'neo4j-driver';
import { BUILDING_STAGE, NEO4J_DB_URI } from '@lib/config';

export const NODE_LABELS = ['Origin', 'Target', 'Peptide', 'CrossRef', 'Database', 'Function', 'Cterminus', 'Nterminus', 'UnusualAA'] as const;
export type NodeLabel = typeof NODE_LABELS[number];

// Don't start a connection while building.
export const driver = (BUILDING_STAGE !== 'true' ? neo4j.driver(NEO4J_DB_URI) : null)!;

process.on('beforeExit', () => {
  return driver.close();
});

export const getSession = () => {
  return driver.session({
    defaultAccessMode: neo4j.session.READ
  });
};

export const readTransaction = async (query: string, params?: Record<string, string | number>) => {
  const session = getSession();
  const result = await session.readTransaction((tx) => {
    return tx.run(query, params);
  });

  await session.close();
  return result;
};
