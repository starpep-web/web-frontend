import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.statisticsFeatures, {
    pageTitle: 'Statistics - Features'
  });
};

const FeaturesStatisticsPage = () => {
  return (
    <StatisticsTabs currentHref={RouteDefs.statisticsFeatures} />
  );
};

export default FeaturesStatisticsPage;
