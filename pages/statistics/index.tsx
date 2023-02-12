import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { DatabaseStatistics } from '@lib/models/statistics';
import { getDatabaseStatistics } from '@lib/services/graphDb/statisticsService';

interface ServerSideProps {
  statistics: DatabaseStatistics
}

interface Props extends ServerSideProps {

}

const StatisticsPage: React.FC<Props> = ({ statistics }) => {
  return (
    <PageWrapper>
      <PageMetadata title="Statistics" />

      Statistics Page

      <pre>
        {JSON.stringify(statistics, null, 2)}
      </pre>
    </PageWrapper>
  );
};

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const statistics = await getDatabaseStatistics();

  return {
    props: {
      statistics
    }
  };
};

export default StatisticsPage;
