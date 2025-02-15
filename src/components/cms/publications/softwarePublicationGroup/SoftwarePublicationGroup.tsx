import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Maybe } from '@lib/utils/types';
import { SoftwarePublication } from '@components/cms/publications/softwarePublication';

interface Props {
  className?: string;
  title?: Maybe<string>;
  publications?: Maybe<
    Maybe<{
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
    }>[]
  >
}

export const SoftwarePublicationGroup: React.FC<Props> = ({ className, title, publications }) => {
  if (!publications?.length) {
    return null;
  }

  return (
    <section className={className}>
      <h3 className="mb-4 text-decoration-underline">
        {title}
      </h3>

      <Row>
        {
          publications.map((publication, idx) => publication && (
            <Col key={idx} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 0 }} xl={{ span: 4, offset: 0 }}>
              <SoftwarePublication
                className="mb-4"
                {...publication}
              />
            </Col>
          ))
        }
      </Row>
    </section>
  );
};
