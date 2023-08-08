import React from 'react';
import { PageWrapper } from '@components/common/pageWrapper';
import { PageMetadata } from '@components/common/pageMetadata';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { AttributeHistogramDynamicChart } from '@components/statistics/concreteCharts/attributeHistogramDynamicChart';

const FeaturesStatisticsPage = () => {
  const graphHeight = 400;

  return (
    <PageWrapper>
      <PageMetadata title="Statistics - Features" />

      <StatisticsTabs />

      <AttributeHistogramDynamicChart height={graphHeight} />
    </PageWrapper>
  );
};

export default FeaturesStatisticsPage;
