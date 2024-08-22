import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.faq, {
    pageTitle: 'FAQ'
  });
};

const FaqPage = () => {
  return (
    <div>
      FAQ!
    </div>
  );
};

export default FaqPage;
