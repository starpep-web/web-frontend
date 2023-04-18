import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { NumberStatistic } from '@components/statistics/numberStatistic';
import { WithTitledBox } from '@components/common/withTitledBox';
import { StatisticsTable } from '@components/statistics/statisticsTable';
import { AminoAcidDistributionDynamicChart } from '@components/statistics/concreteCharts/aminoAcidDistributionDynamicChart';
import { DatabaseGeneralInformationStatistics } from '@lib/models/statistics';
import { getDatabaseGeneralInformationStatistics } from '@lib/services/graphDb/statisticsService';

interface ServerSideProps {
  statistics: DatabaseGeneralInformationStatistics
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

      <WithTitledBox title="3. Peptide Distribution by Function">
        <StatisticsTable data={statistics.functionDistribution} headers={['Function', 'Count']} />
      </WithTitledBox>

      <WithTitledBox title="4. Peptide Distribution by Database">
        <StatisticsTable data={statistics.databaseDistribution} headers={['Database', 'Count']} />
      </WithTitledBox>

      <hr />

      <AminoAcidDistributionDynamicChart height={graphHeight} />
    </PageWrapper>
  );
};

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const statistics = await getDatabaseGeneralInformationStatistics();

  return {
    props: {
      statistics
    }
  };
};

export default GeneralInformationStatisticsPage;
