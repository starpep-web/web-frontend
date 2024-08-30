import { Integer } from 'neo4j-driver';
import { readTransaction } from './dbService';
import {
  DatabaseMetadataStatistics
} from '@lib/models/statistics';
import { createAlphabet } from '@lib/utils/array';
import { BadRequestError } from '@lib/errors/http';

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
