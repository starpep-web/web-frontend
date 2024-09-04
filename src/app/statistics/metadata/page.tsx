import React, { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createPageMetadata } from '@lib/next/metadata';
import { RouteDefs } from '@lib/constants/routes';
import {
  getLengthDistribution,
  getFunctionDistribution,
  getDatabaseDistribution,
  getPartialTargetDistribution,
  getPartialOriginDistribution, getPartialCTerminusDistribution, getPartialNTerminusDistribution
} from '@lib/services/api/endpoints/statistics';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';
import { WithExportableTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';

export const generateMetadata = () => {
  return createPageMetadata(RouteDefs.statisticsMetadata, {
    pageTitle: 'Statistics - Metadata'
  });
};

const MetadataStatisticsPage = async () => {
  const lengthDistribution = await getLengthDistribution();
  const functionDistribution = await getFunctionDistribution();
  const databaseDistribution = await getDatabaseDistribution();
  const targetDistribution = await getPartialTargetDistribution();
  const originDistribution = await getPartialOriginDistribution();
  const cTerminusDistribution = await getPartialCTerminusDistribution();
  const nTerminusDistribution = await getPartialNTerminusDistribution();

  const graphHeight = 400;

  return (
    <Fragment>
      <StatisticsTabs currentHref={RouteDefs.statisticsMetadata} />

      <WithExportableTitledBox
        className="mb-4"
        title="1. Peptide Distribution by Sequence Length"
        height={graphHeight}
        exportedFilename="statistics-metadata-distribution-by-sequence-length"
      >
        <BarChart id="length-distribution" data={lengthDistribution} yTitle="Frequency" xTitle="Sequence Length" />
      </WithExportableTitledBox>

      <WithExportableTitledBox
        className="mb-4"
        title="2. Peptide Distribution by Function"
        height={graphHeight}
        exportedFilename="statistics-metadata-distribution-by-function"
      >
        <BarChart id="function-distribution" data={functionDistribution} />
      </WithExportableTitledBox>

      <WithExportableTitledBox
        className="mb-4"
        title="3. Peptide Distribution by Database"
        height={graphHeight}
        exportedFilename="statistics-metadata-distribution-by-database"
      >
        <BarChart id="database-distribution" data={databaseDistribution} />
      </WithExportableTitledBox>

      <WithExportableTitledBox
        className="mb-4"
        title={`4. Top ${targetDistribution.partialSize} Peptide Distribution by Target`}
        exportedFilename="statistics-metadata-distribution-by-top-targets"
      >
        <Row>
          <Col style={{ height: graphHeight }} xs={{ span: 12 }} xl={{ span: 6 }}>
            <BarChart id="target-distribution" data={targetDistribution.distribution} />
          </Col>
          <Col style={{ height: graphHeight }} xs={{ span: 12 }} xl={{ span: 6 }}>
            <BarChart id="target-percentage" data={targetDistribution.percentage} />
          </Col>
        </Row>
      </WithExportableTitledBox>

      <WithExportableTitledBox
        className="mb-4"
        title={`5. Top ${originDistribution.partialSize} Peptide Distribution by Origin`}
        exportedFilename="statistics-metadata-distribution-by-top-origins"
      >
        <Row>
          <Col style={{ height: graphHeight }} xs={{ span: 12 }} xl={{ span: 6 }}>
            <BarChart id="origin-distribution" data={originDistribution.distribution} />
          </Col>
          <Col style={{ height: graphHeight }} xs={{ span: 12 }} xl={{ span: 6 }}>
            <BarChart id="origin-percentage" data={originDistribution.percentage} />
          </Col>
        </Row>
      </WithExportableTitledBox>

      <WithExportableTitledBox
        className="mb-4"
        title={`6. Top ${cTerminusDistribution.partialSize} Peptide Distribution by CTerminus Modification`}
        exportedFilename="statistics-metadata-distribution-by-top-cterminus"
      >
        <Row>
          <Col style={{ height: graphHeight }} xs={{ span: 12 }} xl={{ span: 6 }}>
            <BarChart id="cterminus-distribution" data={cTerminusDistribution.distribution} />
          </Col>
          <Col style={{ height: graphHeight }} xs={{ span: 12 }} xl={{ span: 6 }}>
            <BarChart id="cterminus-percentage" data={cTerminusDistribution.percentage} />
          </Col>
        </Row>
      </WithExportableTitledBox>

      <WithExportableTitledBox
        className="mb-4"
        title={`7. Top ${nTerminusDistribution.partialSize} Peptide Distribution by NTerminus Modification`}
        exportedFilename="statistics-metadata-distribution-by-top-nterminus"
      >
        <Row>
          <Col style={{ height: graphHeight }} xs={{ span: 12 }} xl={{ span: 6 }}>
            <BarChart id="nterminus-distribution" data={nTerminusDistribution.distribution} />
          </Col>
          <Col style={{ height: graphHeight }} xs={{ span: 12 }} xl={{ span: 6 }}>
            <BarChart id="nterminus-percentage" data={nTerminusDistribution.percentage} />
          </Col>
        </Row>
      </WithExportableTitledBox>
    </Fragment>
  );
};

export default MetadataStatisticsPage;
