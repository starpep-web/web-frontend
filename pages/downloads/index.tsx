import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const DownloadsPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Downloads" />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default DownloadsPage;
