import React from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import CardTitle from 'react-bootstrap/CardTitle';
import Button from 'react-bootstrap/Button';
import { Maybe } from '@lib/utils/types';
import { StrapiImage } from '@components/cms/utils/strapiImage';

interface Props {
  className?: string;
  name?: Maybe<string>
  downloadUrl?: Maybe<string>
  sourceUrl?: Maybe<string>
  image?: Maybe<{
    data?: Maybe<{
      attributes: Maybe<{
        url: string
        alternativeText?: Maybe<string>
        width?: Maybe<number>
        height?: Maybe<number>
      }>
    }>
  }>
}

export const SoftwarePublication: React.FC<Props> = ({ className, name, downloadUrl, sourceUrl, image }) => {
  return (
    <Card className={className}>
      {
        image && (
          <StrapiImage className="card-img-top object-fit-cover" {...image.data?.attributes} />
        )
      }

      <CardBody>
        {
          name && (
            <CardTitle className="fs-4 mb-3">
              {name}
            </CardTitle>
          )
        }

        <div className="d-flex gap-3">
          {
            downloadUrl && (
              <Button variant="primary" as="a" href={downloadUrl}>
                Download
              </Button>
            )
          }

          {
            sourceUrl && (
              <Button variant="primary" as="a" href={sourceUrl}>
                View Source
              </Button>
            )
          }
        </div>
      </CardBody>
    </Card>
  );
};
