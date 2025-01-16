import React from 'react';
import Link from 'next/link';
import { createPageMetadata } from '@lib/next/metadata';
import Card from 'react-bootstrap/Card';
import CardTitle from 'react-bootstrap/CardTitle';
import CardBody from 'react-bootstrap/CardBody';
import Button from 'react-bootstrap/Button';
import CircleQuestionIcon from '@assets/svg/icons/circle-question-solid.svg';
import HouseIcon from '@assets/svg/icons/house-solid.svg';
import { RouteDefs } from '@lib/constants/routes';
import { PageContainer } from '@components/common/pageContainer';

export const generateMetadata = () => {
  return createPageMetadata('', {
    pageTitle: 'Page Not Found'
  });
};

const NotFoundPage = () => {
  return (
    <PageContainer main>
      <Card className="mx-auto p-4" style={{ maxWidth: '600px', marginTop: '10svh', marginBottom: '10svh' }}>
        <CardTitle className="d-flex align-items-center">
          <CircleQuestionIcon className="d-inline me-3" height="2.5rem" style={{ fill: 'var(--bs-primary)' }} />

          <h1 className="mb-0">
            Page Not Found
          </h1>
        </CardTitle>

        <CardBody>
          The page you were looking for was not found. Please check that the URL you inserted is correct.
        </CardBody>

        <div className="d-flex justify-content-center">
          <Button as={Link as unknown as 'a'} href={RouteDefs.home} variant="primary" className="w-100-sm d-inline-flex align-items-center justify-content-center">
            <HouseIcon className="d-inline me-3" height={20} style={{ fill: '#fff' }} />

            Go Home
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
};

export default NotFoundPage;
