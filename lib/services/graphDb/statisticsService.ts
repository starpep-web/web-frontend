import { Integer } from 'neo4j-driver';
import { readTransaction } from './dbService';
import { DatabaseStatistics, PartialRelationStatistics } from '@lib/models/statistics';
import { createAlphabet } from '@lib/utils/array';
import { BadRequestError } from '@lib/errors/http';

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

export const getPartialPeptideOriginDistribution = async (limit: number): Promise<PartialRelationStatistics> => {
  const query = `
MATCH (n:Peptide)-[r:produced_by]->(v)
WITH v.name AS origin, COUNT(*) AS frequency
WITH COLLECT({\`origin\`: origin, \`freq\`: frequency}) as aggregate, SUM(frequency) AS total
UNWIND aggregate AS agg
WITH agg.origin AS origin, agg.freq AS frequency, total
RETURN origin, frequency, total, toFloat(frequency) / total AS percentage
ORDER BY frequency DESC
LIMIT $limit
  `;
  const result = await readTransaction(query, { limit });

  const distribution = Object.fromEntries(result.records.map((record) => {
    const origin = record.get('origin');
    const frequency = record.get('frequency').toInt();

    return [origin, frequency];
  }));
  const percentage = Object.fromEntries(result.records.map((record) => {
    const origin = record.get('origin');
    const percentage = record.get('percentage');

    return [origin, percentage];
  }));
  const total = result.records[0]?.get('total').toInt() ?? 0;

  return {
    distribution,
    percentage,
    total,
    partialSize: limit
  };
};

export const getPartialPeptideCTerminusDistribution = async (limit: number): Promise<PartialRelationStatistics> => {
  const query = `
MATCH (n:Peptide)-[r:modified_by]->(v:Cterminus)
WITH v.name AS cModifier, COUNT(*) AS frequency
WITH COLLECT({\`cModifier\`: cModifier, \`freq\`: frequency}) as aggregate, SUM(frequency) AS total
UNWIND aggregate AS agg
WITH agg.cModifier AS cModifier, agg.freq AS frequency, total
RETURN cModifier, frequency, total, toFloat(frequency) / total AS percentage
ORDER BY frequency DESC
LIMIT $limit
  `;
  const result = await readTransaction(query, { limit });

  const distribution = Object.fromEntries(result.records.map((record) => {
    const cModifier = record.get('cModifier');
    const frequency = record.get('frequency').toInt();

    return [cModifier, frequency];
  }));
  const percentage = Object.fromEntries(result.records.map((record) => {
    const cModifier = record.get('cModifier');
    const percentage = record.get('percentage');

    return [cModifier, percentage];
  }));
  const total = result.records[0]?.get('total').toInt() ?? 0;

  return {
    distribution,
    percentage,
    total,
    partialSize: limit
  };
};

export const getPartialPeptideNTerminusDistribution = async (limit: number): Promise<PartialRelationStatistics> => {
  const query = `
MATCH (n:Peptide)-[r:modified_by]->(v:Nterminus)
WITH v.name AS nModifier, COUNT(*) AS frequency
WITH COLLECT({\`nModifier\`: nModifier, \`freq\`: frequency}) as aggregate, SUM(frequency) AS total
UNWIND aggregate AS agg
WITH agg.nModifier AS nModifier, agg.freq AS frequency, total
RETURN nModifier, frequency, total, toFloat(frequency) / total AS percentage
ORDER BY frequency DESC
LIMIT $limit
  `;
  const result = await readTransaction(query, { limit });

  const distribution = Object.fromEntries(result.records.map((record) => {
    const nModifier = record.get('nModifier');
    const frequency = record.get('frequency').toInt();

    return [nModifier, frequency];
  }));
  const percentage = Object.fromEntries(result.records.map((record) => {
    const nModifier = record.get('nModifier');
    const percentage = record.get('percentage');

    return [nModifier, percentage];
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
    targetDistribution: await getPartialPeptideTargetDistribution(partialsLimit),
    originDistribution: await getPartialPeptideOriginDistribution(partialsLimit),
    cTerminusDistribution: await getPartialPeptideCTerminusDistribution(partialsLimit),
    nTerminusDistribution: await getPartialPeptideNTerminusDistribution(partialsLimit)
  };
};

export const FREQUENCY_FILTER_TYPES = ['Database', 'Function', 'Origin'] as const;
export type FrequencyFilterType = typeof FREQUENCY_FILTER_TYPES[number];

export const getTotalAAFrequency = async (): Promise<Record<string, number>> => {
  const query = "MATCH (n:Peptide) WITH apoc.text.join(COLLECT(n.seq), '') AS seqText WITH apoc.coll.frequenciesAsMap(SPLIT(seqText, '')) AS freq RETURN freq";
  const result = await readTransaction(query);
  const resultObject: Record<string, Integer> = result.records[0]?.get('freq') ?? {};

  return Object.fromEntries(createAlphabet().map((letter) => {
    return [letter, resultObject[letter]?.toInt() ?? 0];
  }));
};

export const getFilterAAFrequency = async (type: FrequencyFilterType, filter: string): Promise<Record<string, number>> => {
  if (!FREQUENCY_FILTER_TYPES.includes(type)) {
    throw new BadRequestError(`Invalid filter type ${type} supplied, must be one of ${FREQUENCY_FILTER_TYPES.join(', ')}`);
  }

  // We can interpolate the type into the query because we're checking above it is valid.
  const query = `MATCH (n:Peptide)-[]-(v: ${type}) WHERE v.name = $filter WITH apoc.text.join(COLLECT(n.seq), '') AS seqText WITH apoc.coll.frequenciesAsMap(SPLIT(seqText, '')) AS freq RETURN freq`;
  const result = await readTransaction(query, { filter });
  const resultObject: Record<string, Integer> = result.records[0]?.get('freq') ?? {};

  return Object.fromEntries(createAlphabet().map((letter) => {
    return [letter, resultObject[letter]?.toInt() ?? 0];
  }));
};
