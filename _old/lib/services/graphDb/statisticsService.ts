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
