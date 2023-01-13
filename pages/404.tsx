import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';

const NotFoundPage = () => {
  return (
    <PageWrapper isErrorPage>
      <PageMetadata title="Not Found" />

      Not Found :(
    </PageWrapper>
  );
};

export default NotFoundPage;
