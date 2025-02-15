import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getPublicationsPage } from '@lib/services/strapi/graphql/queries/publicationsPage';
import { PageContainer } from '@components/common/pageContainer';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.publications, {
    pageTitle: 'Publications'
  });
};

const PublicationsPage = async () => {
  const { publicationsPage } = await getPublicationsPage();

  return (
    <PageContainer main>
      <pre>{JSON.stringify(publicationsPage)}</pre>
    </PageContainer>
  );
};

export default PublicationsPage;
