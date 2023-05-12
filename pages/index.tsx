import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { HomeContainer } from 'components/home/homeContainer';

const HomePage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Home" />

      <HomeContainer />
    </PageWrapper>
  );
};

export default HomePage;
