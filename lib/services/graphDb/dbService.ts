import neo4j from 'neo4j-driver';
import { NEO4J_DB_URI } from '@lib/config';

export const driver = neo4j.driver(NEO4J_DB_URI);

process.on('beforeExit', () => {
  return driver.close();
});

export const getSession = () => {
  return driver.session({
    defaultAccessMode: neo4j.session.READ
  });
};
