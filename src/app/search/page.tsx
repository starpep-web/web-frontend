import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.search, {
    pageTitle: 'Search'
  });
};

const SearchPage = () => {
  return (
    <div>
      Search!
    </div>
  );
};

export default SearchPage;
