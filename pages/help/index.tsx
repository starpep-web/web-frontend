import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const HelpPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Help" />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default HelpPage;
