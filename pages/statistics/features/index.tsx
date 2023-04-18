import React from 'react';
import { PageWrapper } from '@components/common/pageWrapper';
import { PageMetadata } from '@components/common/pageMetadata';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const FeaturesStatisticsPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Statistics - Features" />

      <StatisticsTabs />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default FeaturesStatisticsPage;

