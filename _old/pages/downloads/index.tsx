import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ApplicationDownloads } from '@components/downloads/applicationDownloads';

const DownloadsPage = () => {
  return (
    <PageWrapper>
      <ApplicationDownloads />
    </PageWrapper>
  );
};

export default DownloadsPage;
