import { readTransaction } from './dbService';
import { DatabaseStatistics } from '@lib/models/statistics';

export const getPeptideCount = async (): Promise<number> => {
  const query = 'MATCH (n:Peptide) RETURN COUNT(n) AS c';
  const result = await readTransaction(query);

  return result.records[0]?.get('c').toInt() ?? 0;
};

export const getPeptideLengthDistribution = async (): Promise<Record<number, number>> => {
  const query = 'MATCH (n:Peptide) RETURN SIZE(n.seq) AS length, COUNT(*) as frequency ORDER BY length';
  const result = await readTransaction(query);

  return Object.fromEntries(result.records.map((record) => {
    const length = record.get('length').toInt();
    const frequency = record.get('frequency').toInt();

    return [length, frequency];
  }));
};

export const getPeptideFunctionDistribution = async (): Promise<Record<string, number>> => {
  const query = 'MATCH (n:Peptide)-[r:related_to]-(v) RETURN v.name AS func, COUNT(*) AS frequency';
  const result = await readTransaction(query);

  return Object.fromEntries(result.records.map((record) => {
    const func = record.get('func');
    const frequency = record.get('frequency').toInt();

    return [func, frequency];
  }));
};

export const getPeptideDatabaseDistribution = async (): Promise<Record<string, number>> => {
  const query = 'MATCH (n:Peptide)-[r:compiled_in]-(v) RETURN v.name AS database, COUNT(*) AS frequency';
  const result = await readTransaction(query);

  return Object.fromEntries(result.records.map((record) => {
    const database = record.get('database');
    const frequency = record.get('frequency').toInt();

    return [database, frequency];
  }));
};

export const getDatabaseStatistics = async (): Promise<DatabaseStatistics> => {
  return {
    count: await getPeptideCount(),
    lengthDistribution: await getPeptideLengthDistribution(),
    functionDistribution: await getPeptideFunctionDistribution(),
    databaseDistribution: await getPeptideDatabaseDistribution()
  };
};
