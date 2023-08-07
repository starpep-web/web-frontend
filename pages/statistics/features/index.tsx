import React from 'react';
import { PageWrapper } from '@components/common/pageWrapper';
import { PageMetadata } from '@components/common/pageMetadata';
import { StatisticsTabs } from '@components/statistics/statisticsTabs';

const FeaturesStatisticsPage = () => {
  // const graphHeight = 400;

  return (
    <PageWrapper>
      <PageMetadata title="Statistics - Features" />

      <StatisticsTabs />

      {/* <WithExportableTitledBox*/}
      {/*  title="1. Peptide Hydropathicity Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-hydropathicity-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="hydropathicity-distribution"*/}
      {/*    data={statistics.hydropathicityHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="Hydropathicity Ranges"*/}
      {/*    color={uniqolor('hydropathicity', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="2. Peptide Charge Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-charge-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="charge-distribution"*/}
      {/*    data={statistics.chargeHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="Charge Ranges"*/}
      {/*    color={uniqolor('charge', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="3. Peptide Isoelectric Point Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-isoelectric-point-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="isoelectric-point-distribution"*/}
      {/*    data={statistics.isoelectricPointHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="Isoelectric Point Ranges"*/}
      {/*    color={uniqolor('isoelectric-point', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="4. Peptide Boman Index Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-boman-index-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="boman-index-distribution"*/}
      {/*    data={statistics.bomanIndexHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="Boman Index Ranges"*/}
      {/*    color={uniqolor('boman-index', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="5. Peptide GAAC - Alphatic Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-gaac-alphatic-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="gaac-alphatic-distribution"*/}
      {/*    data={statistics.gaacAlphaticHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="GAAC - Alphatic Ranges"*/}
      {/*    color={uniqolor('gaac-alphatic', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="6. Peptide GAAC - Aromatic Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-gaac-aromatic-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="gaac-aromatic-distribution"*/}
      {/*    data={statistics.gaacAromaticHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="GAAC - Aromatic Ranges"*/}
      {/*    color={uniqolor('gaac-aromatic', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="7. Peptide GAAC - Positive Charge Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-gaac-positive-charge-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="gaac-positive-charge-distribution"*/}
      {/*    data={statistics.gaacPositiveChargeHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="GAAC - Positive Charge Ranges"*/}
      {/*    color={uniqolor('gaac-positive-charge', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="8. Peptide GAAC - Negative Charge Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-gaac-negative-charge-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="gaac-negative-charge-distribution"*/}
      {/*    data={statistics.gaacNegativeChargeHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="GAAC - Negative Charge Ranges"*/}
      {/*    color={uniqolor('gaac-negative-charge', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="9. Peptide GAAC - Uncharge Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-gaac-uncharge-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="gaac-uncharge-distribution"*/}
      {/*    data={statistics.gaacUnchargeHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="GAAC - Uncharge Ranges"*/}
      {/*    color={uniqolor('gaac-uncharge', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="10. Peptide Hydrophobicity Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-hydrophobicity-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="hydrophobicity-distribution"*/}
      {/*    data={statistics.hydrophobicityHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="Hydrophobicity Ranges"*/}
      {/*    color={uniqolor('hydrophobicity', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="11. Peptide Solvation Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-solvation-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="solvation-distribution"*/}
      {/*    data={statistics.solvationHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="Solvation Ranges"*/}
      {/*    color={uniqolor('solvation', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="12. Peptide Amphiphilicity Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-amphiphilicity-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="amphiphilicity-distribution"*/}
      {/*    data={statistics.amphiphilicityHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="Amphiphilicity Ranges"*/}
      {/*    color={uniqolor('amphiphilicity', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}

      {/* <WithExportableTitledBox*/}
      {/*  title="13. Peptide Hydrophilicity Distribution"*/}
      {/*  height={graphHeight}*/}
      {/*  exportedFilename="statistics-features-hydrophilicity-distribution"*/}
      {/* >*/}
      {/*  <BarChart*/}
      {/*    id="hydrophilicity-distribution"*/}
      {/*    data={statistics.hydrophilicityHistogram}*/}
      {/*    yTitle="Frequency"*/}
      {/*    xTitle="Hydrophilicity Ranges"*/}
      {/*    color={uniqolor('hydrophilicity', { format: 'rgb' }).color}*/}
      {/*  />*/}
      {/* </WithExportableTitledBox>*/}
    </PageWrapper>
  );
};

export default FeaturesStatisticsPage;
