import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { getTotalAAFrequency, getFilterAAFrequency } from '@lib/services/graphDb/statisticsService';

interface ServerSideProps {
  totalAAFrequency: Record<string, number>
  filterAAFrequency: Record<string, number>
}

interface Props extends ServerSideProps {

}

const StatisticsPlaygroundPage: React.FC<Props> = ({ totalAAFrequency, filterAAFrequency }) => {
  return (
    <PageWrapper>
      <PageMetadata title="Statistics Playground" />

      {JSON.stringify(totalAAFrequency, null, 2)}
      {JSON.stringify(filterAAFrequency, null, 2)}
    </PageWrapper>
  );
};

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const totalAAFrequency = await getTotalAAFrequency();
  const filterAAFrequency = await getFilterAAFrequency('ADAM');

  return {
    props: {
      totalAAFrequency,
      filterAAFrequency
    }
  };
};

export default StatisticsPlaygroundPage;
