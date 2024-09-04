import React from 'react';
import { PageWrapper } from '@components/common/pageWrapper';
import { AminoAcidDistributionDynamicChart } from '@components/statistics/concreteCharts/aminoAcidDistributionDynamicChart';
import { DatabaseGeneralInformationStatistics } from '@lib/models/statistics';
import { DatabaseHeatmap, getDbHeatmap } from '@lib/data/dbHeatmap';

interface ServerSideProps {
  statistics: DatabaseGeneralInformationStatistics
  dbHeatmap: DatabaseHeatmap
}

interface Props extends ServerSideProps {

}

const GeneralInformationStatisticsPage: React.FC<Props> = ({ statistics, dbHeatmap }) => {
  const graphHeight = 400;

  return (
    <PageWrapper>
      <AminoAcidDistributionDynamicChart height={graphHeight} />
    </PageWrapper>
  );
};
