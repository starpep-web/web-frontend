import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import {
  getLengthDistribution,
  getFunctionDistribution,
  getDatabaseDistribution,
  getPartialTargetDistribution,
  getPartialOriginDistribution, getPartialCTerminusDistribution, getPartialNTerminusDistribution
} from '@lib/services/api/endpoints/statistics';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.statisticsMetadata, {
    pageTitle: 'Statistics - Metadata'
  });
};

const MetadataStatisticsPage = async () => {
  const lengthDistribution = await getLengthDistribution();
  const functionDistribution = await getFunctionDistribution();
  const databaseDistribution = await getDatabaseDistribution();
  const targetDistribution = await getPartialTargetDistribution();
  const originDistribution = await getPartialOriginDistribution();
  const cTerminusDistribution = await getPartialCTerminusDistribution();
  const nTerminusDistribution = await getPartialNTerminusDistribution();

  return (
    <pre>
      {JSON.stringify({
        lengthDistribution, functionDistribution, databaseDistribution, targetDistribution, originDistribution, cTerminusDistribution, nTerminusDistribution
      }, null, 2)}
    </pre>
  );
};

export default MetadataStatisticsPage;
