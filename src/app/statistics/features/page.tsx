import React, { Fragment } from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { AttributeHistogramDynamicChart } from '@components/statistics/dynamicCharts/attributeHistogramDynamicChart';
import { AttributeScatterDynamicChart } from '@components/statistics/dynamicCharts/attributeScatterDynamicChart';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.statisticsFeatures, {
    pageTitle: 'Statistics - Features'
  });
};

const FeaturesStatisticsPage = () => {
  const graphHeight = 400;

  return (
    <Fragment>
      <StatisticsTabs currentHref={RouteDefs.statisticsFeatures} />

      <AttributeHistogramDynamicChart className="mb-4" height={graphHeight} />

      <AttributeScatterDynamicChart className="mb-4" height={graphHeight} />
    </Fragment>
  );
};

export default FeaturesStatisticsPage;
