import React from 'react';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import CardTitle from 'react-bootstrap/CardTitle';
import CardText from 'react-bootstrap/CardText';
import clsx from 'clsx';
import { StrapiImage } from '@components/cms/utils/strapiImage';
import { ShortCvModalButton } from '@components/cms/team/teamMemberCard/ShortCvModalButton';
import { Maybe } from '@lib/utils/types';
import styles from './TeamMemberCard.module.scss';

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
  const cardWidthClassName = featured ? styles.featuredCard : styles.simpleCard;

  return (
    <Card className={clsx('d-flex flex-column', cardWidthClassName)}>
      <CardBody className={clsx('text-center', styles.flexInitial)}>
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
          <CardBody className={clsx('border-top d-flex align-items-center justify-content-center', styles.flexInitial)}>
            <ShortCvModalButton content={shortCv} />
          </CardBody>
        )
      }
    </Card>
  );
};
