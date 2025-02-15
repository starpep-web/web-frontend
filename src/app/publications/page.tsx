import React from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { getPublicationsPage } from '@lib/services/strapi/graphql/queries/publicationsPage';
import { PageContainer } from '@components/common/pageContainer';
import { PublicationGroup } from '@components/cms/publications/publicationGroup';
import { SoftwarePublicationGroup } from '@components/cms/publications/softwarePublicationGroup';
import { RouteDefs } from '@lib/constants/routes';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.publications, {
    pageTitle: 'Publications'
  });
};

const PublicationsPage = async () => {
  const { publicationsPage } = await getPublicationsPage();

  return (
    <PageContainer main>
      <PublicationGroup
        className="mb-5"
        title={publicationsPage?.data?.attributes?.originalPublications.title}
        publications={publicationsPage?.data?.attributes?.originalPublications.publications}
      />

      <PublicationGroup
        className="mb-5"
        title={publicationsPage?.data?.attributes?.relevantPublications.title}
        publications={publicationsPage?.data?.attributes?.relevantPublications.publications}
      />

      <hr className="mb-5" />

      <SoftwarePublicationGroup
        className="mb-3"
        title={publicationsPage?.data?.attributes?.softwarePublications.title}
        publications={publicationsPage?.data?.attributes?.softwarePublications.publications}
      />
    </PageContainer>
  );
};

export default PublicationsPage;
