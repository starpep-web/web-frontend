import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';

const ContactPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Contact" />

      <ComingSoonPlaceholder absoluteCenter />
    </PageWrapper>
  );
};

export default ContactPage;
