import React, { Fragment } from 'react';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import { getDatabaseDistribution, getDatabaseHeatmap, getFunctionDistribution, getPeptideCount, getUnusualPeptideCount } from '@lib/services/api/endpoints/statistics';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { NumberStatistic } from '@components/statistics/numberStatistic';
import { StatisticsTable } from '@components/statistics/statisticsTable';
import { WithExportableTitledBox } from '@components/common/withTitledBox';
import { HeatMap } from '@components/statistics/charts';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.statisticsGeneralInformation, {
    pageTitle: 'Statistics - General Information'
  });
};

const GeneralInformationStatisticsPage = async () => {
  const count = await getPeptideCount();
  const unusualCount = await getUnusualPeptideCount();
  const functionDistribution = await getFunctionDistribution();
  const databaseDistribution = await getDatabaseDistribution();
  const databaseHeatmap = await getDatabaseHeatmap();

  const graphHeight = 400;

  return (
    <Fragment>
      <StatisticsTabs currentHref={RouteDefs.statisticsGeneralInformation} />

      <NumberStatistic
        className="mb-4"
        title="1. Total Peptides"
        value={count}
      />
      <NumberStatistic
        className="mb-4"
        title="2. Total Peptides with Unusual AA's"
        value={unusualCount}
      />

      <WithExportableTitledBox
        className="mb-4"
        title="3. Peptide Distribution by Function"
        exportedFilename="statistics-general-information-distribution-table-by-function"
      >
        <StatisticsTable data={functionDistribution} headers={['Function', 'Count']} />
      </WithExportableTitledBox>

      <WithExportableTitledBox
        className="mb-4"
        title="4. Peptide Distribution by Database"
        exportedFilename="statistics-general-information-distribution-table-by-database"
      >
        <StatisticsTable data={databaseDistribution} headers={['Database', 'Count']} />
      </WithExportableTitledBox>

      <WithExportableTitledBox
        className="mb-4"
        title="5. Database Intersection Heatmap"
        height={graphHeight * 2}
        minWidth={graphHeight * 2}
        noTitleMargin
        exportedFilename="statistics-general-information-database-intersection-heatmap"
      >
        <HeatMap
          id="database-intersection-heatmap"
          normalizedData={databaseHeatmap.data.relative}
          realData={databaseHeatmap.data.absolute}
          xLabels={databaseHeatmap.labels.x}
          yLabels={databaseHeatmap.labels.y}
          showValues={false}
        />
      </WithExportableTitledBox>

      <hr />
    </Fragment>
  );
};

export default GeneralInformationStatisticsPage;
