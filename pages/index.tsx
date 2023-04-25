import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { Home } from '@components/home';

const HomePage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Home" />

      <Home />
    </PageWrapper>
  );
};

export default HomePage;
