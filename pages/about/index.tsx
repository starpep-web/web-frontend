import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const AboutPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="About" />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default AboutPage;
