import { Integer } from 'neo4j-driver';
import { readTransaction } from './dbService';
import {
  DatabaseGeneralInformationStatistics,
  DatabaseMetadataStatistics,
  DataVector2D,
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

  if (widthMethod !== undefined && !isHistogramMethodValid(widthMethod)) {
    throw new TypeError(`Invalid widthMethod ${widthMethod} provided.`);
  }

  return parseHistogramData(await computeHistogramDataForAttribute(attributeName, widthMethod), 3);
};

export const getScatterForAttributes = async (xAttributeName: string, yAttributeName: string): Promise<DataVector2D> => {
  if (!PeptideAttributes.isRawPropertyValid(xAttributeName)) {
    throw new TypeError(`Invalid xAttributeName ${xAttributeName} provided.`);
  }
  if (!PeptideAttributes.isRawPropertyValid(yAttributeName)) {
    throw new TypeError(`Invalid yAttributeName ${yAttributeName} provided.`);
  }

  // It is okay to interpolate the attributes here because they're already validated previously.
  const query = `
MATCH (m:Attributes)
WITH toFloat(m.${xAttributeName}) AS x, toFloat(m.${yAttributeName}) AS y
RETURN COLLECT([x, y]) AS data
`;
  const result = await readTransaction(query);
  const [record] = result.records;

  return record.get('data');
};

/* Static Statistics Groups by Tab */

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
