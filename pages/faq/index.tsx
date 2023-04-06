import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const FaqPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="FAQ" />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default FaqPage;
