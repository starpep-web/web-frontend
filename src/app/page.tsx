import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getHomePage } from '@lib/services/strapi/graphql/queries/homePage';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.home, {
    pageTitle: 'Home'
  });
};

const HomePage = async () => {
  const { homePage } = await getHomePage();

  return (
    <pre>
      {JSON.stringify(homePage, null, 2)}
    </pre>
  );
};

export default HomePage;
