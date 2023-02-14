import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';

const HomePage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Home" />

      Main Page
    </PageWrapper>
  );
};

export default HomePage;
