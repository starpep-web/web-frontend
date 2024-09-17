import React, { Fragment } from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getHomePage } from '@lib/services/strapi/graphql/queries/homePage';
import { ImageGallery } from 'src/components/cms/common/imageGallery';
import { TextCard } from 'src/components/cms/common/textCard';
import { TextImageColumn } from 'src/components/cms/common/textImageColumn';

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
        className="mb-5"
        color={homePage?.data?.attributes?.heroText.color}
        text={homePage?.data?.attributes?.heroText.text}
      />
      <TextImageColumn
        className="mb-5"
        text={homePage?.data?.attributes?.about.text}
        image={homePage?.data?.attributes?.about.image}
        flip={homePage?.data?.attributes?.about.flip}
      />
      <pre>
        {JSON.stringify(homePage, null, 2)}
      </pre>
    </Fragment>
  );
};

export default HomePage;
