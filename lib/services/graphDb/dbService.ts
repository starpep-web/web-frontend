import neo4j from 'neo4j-driver';
import { BUILDING_STAGE, NEO4J_DB_URI } from '@lib/config';

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
