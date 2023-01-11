import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { PeptideSearchBox } from '@components/search/peptideSearchBox';

const SearchPage = () => {
  return (
    <PageWrapper>
      <PageMetadata title="Search" />

      <PeptideSearchBox />
    </PageWrapper>
  );
};

export default SearchPage;
