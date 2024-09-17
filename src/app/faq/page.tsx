import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getFaqPage } from '@lib/services/strapi/graphql/queries/faqPage';
import { FaqAccordion } from '@components/cms/faqAccordion';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.faq, {
    pageTitle: 'FAQ'
  });
};

const FaqPage = async () => {
  const { faqPage } = await getFaqPage();

  return (
    <FaqAccordion
      className="mb-4"
      items={faqPage?.data?.attributes?.faqs}
    />
  );
};

export default FaqPage;
