import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { NumberStatistic } from '@components/statistics/numberStatistic';
import { BarChart, PieChart } from '@components/statistics/charts';
import { WithTitledBox } from '@components/common/withTitledBox';
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

      <NumberStatistic title="1. Total Peptides" value={statistics.count} />
      <NumberStatistic title="2. Total Peptides with Unusual AA's" value={statistics.unusualCount} />

      <WithTitledBox title="3. Peptide Distribution by Sequence Length">
        <BarChart id="length-distribution" data={statistics.lengthDistribution} />
      </WithTitledBox>

      <WithTitledBox title="4. Peptide Distribution by Function">
        <PieChart id="function-distribution" data={statistics.functionDistribution} />
      </WithTitledBox>

      <WithTitledBox title="5. Peptide Distribution by Database">
        <PieChart id="database-distribution" data={statistics.databaseDistribution} />
      </WithTitledBox>
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
