import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { NumberStatistic } from '@components/statistics/numberStatistic';
import { AminoAcidDistributionDynamicChart } from '@components/statistics/concreteCharts/aminoAcidDistributionDynamicChart';
import { DatabaseStatistics } from '@lib/models/statistics';
import { getDatabaseStatistics } from '@lib/services/graphDb/statisticsService';

interface ServerSideProps {
  statistics: DatabaseStatistics
}

interface Props extends ServerSideProps {

}

const GeneralInformationStatisticsPage: React.FC<Props> = ({ statistics }) => {
  const graphHeight = 400;

  return (
    <PageWrapper>
      <PageMetadata title="Statistics - General Information" />

      <StatisticsTabs />

      <NumberStatistic title="1. Total Peptides" value={statistics.count} />
      <NumberStatistic title="2. Total Peptides with Unusual AA's" value={statistics.unusualCount} />

      <hr />

      <AminoAcidDistributionDynamicChart height={graphHeight} />
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

export default GeneralInformationStatisticsPage;
