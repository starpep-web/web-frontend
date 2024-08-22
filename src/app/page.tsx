import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.home, {
    pageTitle: 'Home'
  });
};

const HomePage = () => {
  return (
    <div>
      Home!
    </div>
  );
};

export default HomePage;
