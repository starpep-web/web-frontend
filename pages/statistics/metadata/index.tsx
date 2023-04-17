import React from 'react';
import { Columns } from 'react-bulma-components';
import { GetServerSidePropsResult } from 'next';
import { PageWrapper } from '@components/common/pageWrapper';
import { PageMetadata } from '@components/common/pageMetadata';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { WithTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';
import { DatabaseMetadataStatistics } from '@lib/models/statistics';
import { getDatabaseMetadataStatistics } from '@lib/services/graphDb/statisticsService';

interface ServerSideProps {
  statistics: DatabaseMetadataStatistics
}

interface Props extends ServerSideProps {

}

const MetadataStatisticsPage: React.FC<Props> = ({ statistics }) => {
  const graphHeight = 400;

  return (
    <PageWrapper>
      <PageMetadata title="Statistics - Metadata" />

      <StatisticsTabs />

      <WithTitledBox title="1. Peptide Distribution by Sequence Length" height={graphHeight}>
        <BarChart id="length-distribution" data={statistics.lengthDistribution} yTitle="Frequency" xTitle="Sequence Length" />
      </WithTitledBox>

      <WithTitledBox title="2. Peptide Distribution by Function" height={graphHeight}>
        <BarChart id="function-distribution" data={statistics.functionDistribution} />
      </WithTitledBox>

      <WithTitledBox title="3. Peptide Distribution by Database" height={graphHeight}>
        <BarChart id="database-distribution" data={statistics.databaseDistribution} />
      </WithTitledBox>

      <WithTitledBox title={`4. Top ${statistics.targetDistribution.partialSize} Peptide Distribution by Target`}>
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="target-distribution" data={statistics.targetDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="target-percentage" data={statistics.targetDistribution.percentage} />
          </Columns.Column>
        </Columns>
      </WithTitledBox>

      <WithTitledBox title={`5. Top ${statistics.originDistribution.partialSize} Peptide Distribution by Origin`}>
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="origin-distribution" data={statistics.originDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="origin-percentage" data={statistics.originDistribution.percentage} />
          </Columns.Column>
        </Columns>
      </WithTitledBox>

      <WithTitledBox title={`6. Top ${statistics.cTerminusDistribution.partialSize} Peptide Distribution by CTerminus Modification`}>
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="cterminus-distribution" data={statistics.cTerminusDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="cterminus-percentage" data={statistics.cTerminusDistribution.percentage} />
          </Columns.Column>
        </Columns>
      </WithTitledBox>

      <WithTitledBox title={`7. Top ${statistics.nTerminusDistribution.partialSize} Peptide Distribution by NTerminus Modification`}>
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="nterminus-distribution" data={statistics.nTerminusDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="nterminus-percentage" data={statistics.nTerminusDistribution.percentage} />
          </Columns.Column>
        </Columns>
      </WithTitledBox>
    </PageWrapper>
  );
};

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ServerSideProps>> => {
  const statistics = await getDatabaseMetadataStatistics();

  return {
    props: {
      statistics
    }
  };
};

export default MetadataStatisticsPage;

