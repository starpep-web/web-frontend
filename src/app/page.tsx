import React, { Fragment } from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getHomePage } from '@lib/services/strapi/graphql/queries/homePage';
import { ImageGallery } from '@components/cms/imageGallery';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.home, {
    pageTitle: 'Home'
  });
};

const HomePage = async () => {
  const { homePage } = await getHomePage();

  return (
    <Fragment>
      <ImageGallery images={homePage?.data?.attributes?.imageGallery.images} />
      <pre>
        {JSON.stringify(homePage, null, 2)}
      </pre>
    </Fragment>
  );
};

export default HomePage;
