import React from 'react';
import { Columns } from 'react-bulma-components';
import { GetServerSidePropsResult } from 'next';
import { PageWrapper } from '@components/common/pageWrapper';
import { PageMetadata } from '@components/common/pageMetadata';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { WithExportableTitledBox } from '@components/common/withTitledBox';
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

      <WithExportableTitledBox title="1. Peptide Distribution by Sequence Length" height={graphHeight} exportedFilename="statistics-metadata-distribution-by-sequence-length">
        <BarChart id="length-distribution" data={statistics.lengthDistribution} yTitle="Frequency" xTitle="Sequence Length" />
      </WithExportableTitledBox>

      <WithExportableTitledBox title="2. Peptide Distribution by Function" height={graphHeight} exportedFilename="statistics-metadata-distribution-by-function">
        <BarChart id="function-distribution" data={statistics.functionDistribution} />
      </WithExportableTitledBox>

      <WithExportableTitledBox title="3. Peptide Distribution by Database" height={graphHeight} exportedFilename="statistics-metadata-distribution-by-database">
        <BarChart id="database-distribution" data={statistics.databaseDistribution} />
      </WithExportableTitledBox>

      <WithExportableTitledBox title={`4. Top ${statistics.targetDistribution.partialSize} Peptide Distribution by Target`} exportedFilename="statistics-metadata-distribution-by-top-targets">
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="target-distribution" data={statistics.targetDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="target-percentage" data={statistics.targetDistribution.percentage} />
          </Columns.Column>
        </Columns>
      </WithExportableTitledBox>

      <WithExportableTitledBox title={`5. Top ${statistics.originDistribution.partialSize} Peptide Distribution by Origin`} exportedFilename="statistics-metadata-distribution-by-top-origins">
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="origin-distribution" data={statistics.originDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="origin-percentage" data={statistics.originDistribution.percentage} />
          </Columns.Column>
        </Columns>
      </WithExportableTitledBox>

      <WithExportableTitledBox title={`6. Top ${statistics.cTerminusDistribution.partialSize} Peptide Distribution by CTerminus Modification`} exportedFilename="statistics-metadata-distribution-by-top-cterminus">
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="cterminus-distribution" data={statistics.cTerminusDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="cterminus-percentage" data={statistics.cTerminusDistribution.percentage} />
          </Columns.Column>
        </Columns>
      </WithExportableTitledBox>

      <WithExportableTitledBox title={`7. Top ${statistics.nTerminusDistribution.partialSize} Peptide Distribution by NTerminus Modification`} exportedFilename="statistics-metadata-distribution-by-top-nterminus">
        <Columns>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="nterminus-distribution" data={statistics.nTerminusDistribution.distribution} />
          </Columns.Column>
          <Columns.Column style={{ height: graphHeight }} tablet={{ size: 12 }} desktop={{ size: 6 }}>
            <BarChart id="nterminus-percentage" data={statistics.nTerminusDistribution.percentage} />
          </Columns.Column>
        </Columns>
      </WithExportableTitledBox>
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
