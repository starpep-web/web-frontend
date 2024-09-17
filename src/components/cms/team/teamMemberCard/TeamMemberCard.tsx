import React from 'react';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import CardTitle from 'react-bootstrap/CardTitle';
import CardText from 'react-bootstrap/CardText';
import { StrapiImage } from '@components/cms/utils/strapiImage';
import { ShortCvModalButton } from '@components/cms/team/teamMemberCard/ShortCvModalButton';
import { Maybe } from '@lib/utils/types';

interface Props {
  avatar?: Maybe<{
    data: Maybe<{
      attributes: Maybe<{
        url: string
        alternativeText?: Maybe<string>
        width?: Maybe<number>
        height?: Maybe<number>
      }>
    }>
  }>
  name?: string
  email?: string
  occupation?: Maybe<string>
  affiliations?: Maybe<string>
  location?: Maybe<string>
  website?: Maybe<string>
  shortCv?: Maybe<string>
  featured?: boolean
}

export const TeamMemberCard: React.FC<Props> = ({ avatar, name, email, occupation, affiliations, location, website, shortCv, featured }) => {
  const splitAffiliations = affiliations?.split('\n');
  const cardWidth = featured ? 450 : 350;

  return (
    <Card className="d-flex flex-column" style={{ width: cardWidth }}>
      <CardBody className="text-center" style={{ flex: 'initial' }}>
        <StrapiImage
          className="rounded-circle object-fit-cover mb-3"
          {...avatar?.data?.attributes}
          width={85}
          height={85}
        />

        {
          name && (
            <CardTitle className="text-center mb-0">
              {name}
            </CardTitle>
          )
        }
      </CardBody>

      <CardBody className="flex-fill">
        {
          occupation && (
            <CardText className="mb-0">
              {occupation}
            </CardText>
          )
        }
        {
          splitAffiliations?.map((affiliation, idx) => (
            <CardText key={idx} className="mb-0">
              {affiliation}
            </CardText>
          ))
        }
        {
          location && (
            <CardText className="mb-0">
              {location}
            </CardText>
          )
        }
        {
          email && (
            <CardText className="mb-0">
              <Link href={`mailto:${email}`}>
                {email}
              </Link>
            </CardText>
          )
        }
        {
          website && (
            <CardText className="mb-0">
              <Link href={website} target="_blank">
                {website}
              </Link>
            </CardText>
          )
        }
      </CardBody>

      {
        shortCv && (
          <CardBody className="border-top d-flex align-items-center justify-content-center" style={{ flex: 'initial' }}>
            <ShortCvModalButton content={shortCv} />
          </CardBody>
        )
      }
    </Card>
  );
};
