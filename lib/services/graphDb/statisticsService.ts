import { readTransaction } from './dbService';
import { DatabaseStatistics, PartialRelationStatistics } from '@lib/models/statistics';

export const getPeptideCount = async (): Promise<number> => {
  const query = 'MATCH (n:Peptide) RETURN COUNT(n) AS c';
  const result = await readTransaction(query);

  return result.records[0]?.get('c').toInt() ?? 0;
};

export const getUnusualCount = async (): Promise<number> => {
  const query = 'MATCH (n:Peptide)-[r:constituted_by]->(v) RETURN COUNT(v) AS c';
  const result = await readTransaction(query);

  return result.records[0]?.get('c').toInt() ?? 0;
};

export const getPeptideLengthDistribution = async (): Promise<Record<number, number>> => {
  const query = 'MATCH (n:Peptide) RETURN SIZE(n.seq) AS length, COUNT(*) as frequency ORDER BY length DESC';
  const result = await readTransaction(query);

  return Object.fromEntries(result.records.map((record) => {
    const length = record.get('length').toInt();
    const frequency = record.get('frequency').toInt();

    return [length, frequency];
  }));
};

export const getPeptideFunctionDistribution = async (): Promise<Record<string, number>> => {
  const query = 'MATCH (n:Peptide)-[r:related_to]->(v) RETURN v.name AS func, COUNT(*) AS frequency ORDER BY frequency DESC';
  const result = await readTransaction(query);

  return Object.fromEntries(result.records.map((record) => {
    const func = record.get('func');
    const frequency = record.get('frequency').toInt();

    return [func, frequency];
  }));
};

export const getPeptideDatabaseDistribution = async (): Promise<Record<string, number>> => {
  const query = 'MATCH (n:Peptide)-[r:compiled_in]->(v) RETURN v.name AS database, COUNT(*) AS frequency ORDER BY database ASC';
  const result = await readTransaction(query);

  return Object.fromEntries(result.records.map((record) => {
    const database = record.get('database');
    const frequency = record.get('frequency').toInt();

    return [database, frequency];
  }));
};

export const getPartialPeptideTargetDistribution = async (limit: number): Promise<PartialRelationStatistics> => {
  const query = `
MATCH (n:Peptide)-[r:assessed_against]->(v)
WITH v.name AS target, COUNT(*) AS frequency
WITH COLLECT({\`target\`: target, \`freq\`: frequency}) as aggregate, SUM(frequency) AS total
UNWIND aggregate AS agg
WITH agg.target AS target, agg.freq AS frequency, total
RETURN target, frequency, total, toFloat(frequency) / total AS percentage
ORDER BY frequency DESC
LIMIT $limit
  `;
  const result = await readTransaction(query, { limit });

  const distribution = Object.fromEntries(result.records.map((record) => {
    const target = record.get('target');
    const frequency = record.get('frequency').toInt();

    return [target, frequency];
  }));
  const percentage = Object.fromEntries(result.records.map((record) => {
    const target = record.get('target');
    const percentage = record.get('percentage');

    return [target, percentage];
  }));
  const total = result.records[0]?.get('total').toInt() ?? 0;

  return {
    distribution,
    percentage,
    total,
    partialSize: limit
  };
};

export const getDatabaseStatistics = async (partialsLimit = 25): Promise<DatabaseStatistics> => {
  return {
    count: await getPeptideCount(),
    unusualCount: await getUnusualCount(),
    lengthDistribution: await getPeptideLengthDistribution(),
    functionDistribution: await getPeptideFunctionDistribution(),
    databaseDistribution: await getPeptideDatabaseDistribution(),
    targetDistribution: await getPartialPeptideTargetDistribution(partialsLimit)
  };
};
