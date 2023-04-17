import React from 'react';
import { PageWrapper } from '@components/common/pageWrapper';
import { PageMetadata } from '@components/common/pageMetadata';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const MetadataStatisticsPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Statistics - Metadata" />

      <StatisticsTabs />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default MetadataStatisticsPage;

