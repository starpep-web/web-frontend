import neo4j from 'neo4j-driver';
import { BUILDING_STAGE, NEO4J_DB_URI } from '@lib/config';

// Don't start a connection while building.
export const driver = (BUILDING_STAGE !== 'true' ? neo4j.driver(NEO4J_DB_URI) : null)!;

process.once('beforeExit', () => {
  return driver.close();
});

export const getSession = () => {
  return driver.session({
    defaultAccessMode: neo4j.session.READ
  });
};

export const readTransaction = async (query: string, params?: Record<string, any>) => {
  const session = getSession();
  const result = await session.readTransaction((tx) => {
    return tx.run(query, params);
  });

  await session.close();
  return result;
};

// According to this: https://neo4j.com/developer/kb/protecting-against-cypher-injection/#_escape_characters_in_cypher
export const sanitizeInput = (input: string): string => {
  return input.replace(/'|\\u0027|"|\\u0022|`|\\u0060/g, (replacement) => {
    return `\\${replacement}`;
  });
};
