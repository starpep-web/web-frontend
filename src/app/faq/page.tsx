import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getFaqPage } from '@lib/services/strapi/graphql/queries/faqPage';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.faq, {
    pageTitle: 'FAQ'
  });
};

const FaqPage = async () => {
  const { faqPage } = await getFaqPage();

  return (
    <pre>
      {JSON.stringify(faqPage, null, 2)}
    </pre>
  );
};

export default FaqPage;
