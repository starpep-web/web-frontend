import { QueryResult, int, Integer } from 'neo4j-driver';
import { readTransaction, sanitizeInput } from './dbService';
import { WithExportPayloadData, ExportPayloadData } from '@lib/models/export';
import { BitArray, bitArrayToBase64 } from '@lib/utils/export';

export const exportPayloadDataForPeptidesTextQuery = async (sequence: string, sanitizedFilter: string): Promise<ExportPayloadData> => {
  const query = `
MATCH (n:Peptide)-[]->(v:Attributes)
WHERE n.seq CONTAINS $sequence ${sanitizedFilter}
WITH DISTINCT(n) AS n
WITH ID(n) AS id
RETURN COLLECT(id) AS ids
`;
  const result = await readTransaction(query, { sequence: sequence.toUpperCase() });
  const [record] = result.records;
  const matchedIds: Integer[] = record.get('ids');

  // Caveat: The use of ID(n) depends on there being 45120 peptides since other nodes will have identifiers that start with 45120 and higher.
  // Note: If new peptides are added, the ID should probably inside the node as a property instead of relying on the Neo4j ID.
  const totalPeptides = 45120;

  const matchedIdBitArray: BitArray = new Array(totalPeptides).fill(0);
  matchedIds.forEach((id) => {
    const index = id.toInt();
    matchedIdBitArray[index] = 1;
  });

  return bitArrayToBase64(matchedIdBitArray);
};


export const exportPayloadDataForPeptidesRegexQuery = async (regex: string, sanitizedFilter: string): Promise<ExportPayloadData> => {
  const query = `
MATCH (n:Peptide)-[]->(v:Attributes)
WHERE n.seq =~ $regex ${sanitizedFilter}
WITH DISTINCT(n) AS n
WITH ID(n) AS id
RETURN COLLECT(id) AS ids
`;
  const result = await readTransaction(query, { regex });
  const [record] = result.records;
  const matchedIds: Integer[] = record.get('ids');

  // Caveat: The use of ID(n) depends on there being 45120 peptides since other nodes will have identifiers that start with 45120 and higher.
  // Note: If new peptides are added, the ID should probably inside the node as a property instead of relying on the Neo4j ID.
  const totalPeptides = 45120;

  const matchedIdBitArray: BitArray = new Array(totalPeptides).fill(0);
  matchedIds.forEach((id) => {
    const index = id.toInt();
    matchedIdBitArray[index] = 1;
  });

  return bitArrayToBase64(matchedIdBitArray);
};
