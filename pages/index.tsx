import React from 'react';
import type { GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { getPeptidesConstitutedBy } from '@lib/services/graphDb/peptideService';

interface ServerSideProps {
  result: any
}

interface Props extends ServerSideProps {

}

const HomePage: React.FC<Props> = ({ result }) => {
  console.log(result);

  return (
    <PageWrapper>
      <PageMetadata title="Home" />

      Main Page
    </PageWrapper>
  );
};

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const result = await getPeptidesConstitutedBy();

  return { props: { result } };
};

export default HomePage;
