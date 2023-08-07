import { Integer } from 'neo4j-driver';
import { readTransaction } from './dbService';
import {
  DatabaseGeneralInformationStatistics,
  DatabaseMetadataStatistics,
  HistogramData,
  HistogramWidthMethod,
  isHistogramMethodValid,
  PartialRelationStatistics
} from '@lib/models/statistics';
import { PeptideAttributes } from '@lib/models/peptide';
import { createAlphabet } from '@lib/utils/array';
import { formatNumberDecimals } from '@lib/utils/number';
import { BadRequestError } from '@lib/errors/http';

/* Static Statistics Functions */

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

// Interpolation in query should be fine since this function is only called locally and already validated prior.
const generateHistogramQueryForAttribute = (attributeName: PeptideAttributes.RawPropertyName, widthMethod: HistogramWidthMethod): string => {
  const dependencyQuery = widthMethod === 'scott' ?
    'stDev(a) AS s' :
    'percentileCont(a, 0.75) AS q3, percentileCont(a, 0.25) AS q1';
  const widthQuery = widthMethod === 'scott' ?
    '3.49 * s * n^(-1.0/3)' :
    '2 * (q3 - q1) * n^(-1.0/3)';

  return `
MATCH (m:Attributes)
WITH m.${attributeName} AS a
WITH MIN(a) AS min, MAX(a) AS max, COUNT(a) AS n, ${dependencyQuery}
WITH min, max, n, max - min AS r, ${widthQuery} AS w
WITH min, max, n, r, w, toInteger(round(r / w)) AS k
MATCH (m:Attributes)
WITH m.${attributeName} AS a, min, max, n, r, w, k
WITH min, max, w, k, toInteger(round((a - min) / w)) AS kn, COUNT(*) AS f ORDER BY kn
RETURN toFloat(min) as min, toFloat(max) as max, toFloat(w) AS width, k AS numOfBins, COLLECT({ classNum: kn, frequency: f }) AS bins
  `;
};

const computeHistogramDataForAttribute = async (attributeName: PeptideAttributes.RawPropertyName, widthMethod: HistogramWidthMethod = 'scott'): Promise<HistogramData> => {
  const query = generateHistogramQueryForAttribute(attributeName, widthMethod);
  const result = await readTransaction(query);
  const [record] = result.records;

  return {
    min: record.get('min'),
    max: record.get('max'),
    width: record.get('width'),
    numOfBins: record.get('numOfBins').toInt(),
    bins: record.get('bins').map((bin: { classNum: Integer, frequency: Integer }) => ({
      classNum: bin.classNum.toInt(),
      frequency: bin.frequency.toInt()
    }))
  };
};

const parseHistogramData = (data: HistogramData, binMaxDigits: number): Record<string, number> => {
  const histogram: Record<string, number> = {};

  for (let i = 0; i < data.numOfBins; i++) {
    const start = formatNumberDecimals(data.min + (data.width * i), binMaxDigits);
    const end = formatNumberDecimals(data.min + (data.width * (i + 1)), binMaxDigits);
    const key = `${start}; ${end}`;

    histogram[key] = data.bins.find((bin) => bin.classNum === i)?.frequency ?? 0;
  }

  return histogram;
};

export const getHistogramForAttribute = async (attributeName: string, widthMethod?: string): Promise<Record<string, number>> => {
  if (!PeptideAttributes.isRawPropertyValid(attributeName)) {
    throw new TypeError(`Invalid attributeName ${attributeName} provided.`);
  }

  if (!isHistogramMethodValid(widthMethod)) {
    throw new TypeError(`Invalid widthMethod ${widthMethod} provided.`);
  }

  return parseHistogramData(await computeHistogramDataForAttribute(attributeName, widthMethod), 3);
};

/* Static Statistics Groups by Tab */

export const getDatabaseGeneralInformationStatistics = async (): Promise<DatabaseGeneralInformationStatistics> => {
  return {
    count: await getPeptideCount(),
    unusualCount: await getUnusualCount(),
    functionDistribution: await getPeptideFunctionDistribution(),
    databaseDistribution: await getPeptideDatabaseDistribution()
  };
};

export const getDatabaseMetadataStatistics = async (partialsLimit = 25): Promise<DatabaseMetadataStatistics> => {
  return {
    lengthDistribution: await getPeptideLengthDistribution(),
    functionDistribution: await getPeptideFunctionDistribution(),
    databaseDistribution: await getPeptideDatabaseDistribution(),
    targetDistribution: await getPartialPeptideTargetDistribution(partialsLimit),
    originDistribution: await getPartialPeptideOriginDistribution(partialsLimit),
    cTerminusDistribution: await getPartialPeptideCTerminusDistribution(partialsLimit),
    nTerminusDistribution: await getPartialPeptideNTerminusDistribution(partialsLimit)
  };
};

/* Dynamic Statistics Functions */

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
