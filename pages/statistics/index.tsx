import React from 'react';
import { GetServerSidePropsResult } from 'next';
import { Columns } from 'react-bulma-components';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { NumberStatistic } from '@components/statistics/numberStatistic';
import { BarChart } from '@components/statistics/charts';
import { WithTitledBox } from '@components/common/withTitledBox';
import { DatabaseStatistics } from '@lib/models/statistics';
import { getDatabaseStatistics } from '@lib/services/graphDb/statisticsService';

interface ServerSideProps {
  statistics: DatabaseStatistics
}

interface Props extends ServerSideProps {

}

const StatisticsPage: React.FC<Props> = ({ statistics }) => {
  const graphHeight = 400;

  return (
    <PageWrapper>
      <PageMetadata title="Statistics" />

      <NumberStatistic title="1. Total Peptides" value={statistics.count} />
      <NumberStatistic title="2. Total Peptides with Unusual AA's" value={statistics.unusualCount} />

      <WithTitledBox title="3. Peptide Distribution by Sequence Length" height={graphHeight}>
        <BarChart id="length-distribution" data={statistics.lengthDistribution} yTitle="Frequency" xTitle="Sequence Length" />
      </WithTitledBox>

      <WithTitledBox title="4. Peptide Distribution by Function" height={graphHeight}>
        <BarChart id="function-distribution" data={statistics.functionDistribution} />
      </WithTitledBox>

      <WithTitledBox title="5. Peptide Distribution by Database" height={graphHeight}>
        <BarChart id="database-distribution" data={statistics.databaseDistribution} />
      </WithTitledBox>

      <WithTitledBox title={`6. Top ${statistics.targetDistribution.partialSize} Peptide Distribution by Target`}>
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="target-distribution" data={statistics.targetDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="target-percentage" data={statistics.targetDistribution.percentage} />
          </Columns.Column>
        </Columns>
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
