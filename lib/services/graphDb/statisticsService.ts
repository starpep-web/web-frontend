import { readTransaction } from './dbService';
import { DatabaseStatistics } from '@lib/models/statistics';

export const getPeptideCount = async (): Promise<number> => {
  const query = 'MATCH (n:Peptide) RETURN COUNT(n) AS c';
  const result = await readTransaction(query);

  return result.records[0]?.get('c').low ?? 0;
};

export const getPeptideLengthDistribution = async (): Promise<Record<number, number>> => {
  const query = 'MATCH (n:Peptide) RETURN SIZE(n.seq) AS length, COUNT(*) as frequency ORDER BY length';
  const result = await readTransaction(query);

  return Object.fromEntries(result.records.map((record) => {
    const length = record.get('length').low;
    const frequency = record.get('frequency').low;

    return [length, frequency];
  }));
};

export const getDatabaseStatistics = async (): Promise<DatabaseStatistics> => {
  return {
    count: await getPeptideCount(),
    lengthDistribution: await getPeptideLengthDistribution()
  };
};
