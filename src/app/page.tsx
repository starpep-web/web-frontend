import React, { Fragment } from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getHomePage } from '@lib/services/strapi/graphql/queries/homePage';
import { ImageGallery } from 'src/components/cms/common/imageGallery';
import { TextCard } from 'src/components/cms/common/textCard';
import { TextImageColumn } from 'src/components/cms/common/textImageColumn';
import { TeamMemberCardGroup } from '@components/cms/team/teamMemberCardGroup';

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
        featured
      />
      <TextCard
        className="mb-5"
        color={homePage?.data?.attributes?.heroText.color}
        text={homePage?.data?.attributes?.heroText.text}
      />
      <TextImageColumn
        id="about"
        className="mb-5"
        text={homePage?.data?.attributes?.about.text}
        image={homePage?.data?.attributes?.about.image}
        flip={homePage?.data?.attributes?.about.flip}
      />
      <TeamMemberCardGroup
        id="contact"
        className="mb-4"
        title={homePage?.data?.attributes?.projectLeaders.title}
        type={homePage?.data?.attributes?.projectLeaders.type}
        members={homePage?.data?.attributes?.projectLeaders.members}
      />
      <TeamMemberCardGroup
        className="mb-4"
        title={homePage?.data?.attributes?.collaborators.title}
        type={homePage?.data?.attributes?.collaborators.type}
        members={homePage?.data?.attributes?.collaborators.members}
      />
      <TeamMemberCardGroup
        className="mb-4"
        title={homePage?.data?.attributes?.developers.title}
        type={homePage?.data?.attributes?.developers.type}
        members={homePage?.data?.attributes?.developers.members}
      />
    </Fragment>
  );
};

export default HomePage;
