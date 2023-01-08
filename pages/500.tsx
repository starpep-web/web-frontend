import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';

const ServerSideErrorPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Server Side Error" />

      Server Side Error
    </PageWrapper>
  );
};

export default ServerSideErrorPage;
