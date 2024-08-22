import React from 'react';
import { PageWrapper } from '@components/common/pageWrapper';
import { PageMetadata } from '@components/common/pageMetadata';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { AttributeHistogramDynamicChart } from '@components/statistics/concreteCharts/attributeHistogramDynamicChart';
import { AttributeScatterDynamicChart } from '@components/statistics/concreteCharts/attributeScatterDynamicChart';

const FeaturesStatisticsPage = () => {
  const graphHeight = 400;

  return (
    <PageWrapper>
      <StatisticsTabs />

      <AttributeHistogramDynamicChart height={graphHeight} />
      <AttributeScatterDynamicChart height={graphHeight} />
    </PageWrapper>
  );
};

export default FeaturesStatisticsPage;
