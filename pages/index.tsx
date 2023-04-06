import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const HomePage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Home" />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default HomePage;
