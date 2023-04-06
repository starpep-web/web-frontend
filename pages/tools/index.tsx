import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const ToolsPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Tools" />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default ToolsPage;
