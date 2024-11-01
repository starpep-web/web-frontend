import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { PeptideSearchBox } from '@components/search/peptideSearchBox';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.search, {
    pageTitle: 'Search'
  });
};

const SearchPage = () => {
  return (
    <PeptideSearchBox />
  );
};

export default SearchPage;
