import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { PeptideSearchBox } from '@components/search/peptideSearchBox';
import { PageContainer } from '@components/common/pageContainer';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.search, {
    pageTitle: 'Search'
  });
};

const SearchPage = () => {
  return (
    <PageContainer main>
      <PeptideSearchBox />
    </PageContainer>
  );
};

export default SearchPage;
