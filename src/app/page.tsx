import React, { Fragment } from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getHomePage } from '@lib/services/strapi/graphql/queries/homePage';
import { ImageGallery } from '@components/cms/imageGallery';
import { TextCard } from '@components/cms/textCard';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.home, {
    pageTitle: 'Home'
  });
};

const HomePage = async () => {
  const { homePage } = await getHomePage();

  return (
    <Fragment>
      <ImageGallery
        className="mb-4"
        images={homePage?.data?.attributes?.imageGallery.images}
      />
      <TextCard
        className="mb-4"
        color={homePage?.data?.attributes?.heroText.color}
        text={homePage?.data?.attributes?.heroText.text}
      />
      <pre>
        {JSON.stringify(homePage, null, 2)}
      </pre>
    </Fragment>
  );
};

export default HomePage;
