import React from 'react';
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
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

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const { frequencyFilter: frequencyFilterParam } = context.query;
  const frequencyFilter = frequencyFilterParam ? (Array.isArray(frequencyFilterParam) ? frequencyFilterParam[0] : frequencyFilterParam) : null;

  const totalAAFrequency = await getTotalAAFrequency();
  const filterAAFrequency = frequencyFilter ? await getFilterAAFrequency(frequencyFilter) : {};

  return {
    props: {
      totalAAFrequency,
      filterAAFrequency
    }
  };
};

export default StatisticsPlaygroundPage;
