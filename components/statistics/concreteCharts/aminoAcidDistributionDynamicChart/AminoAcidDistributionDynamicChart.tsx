import React from 'react';
import { Box } from 'react-bulma-components';
import { WithTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';
import FullFilterPicker from './FullFilterPicker';
import { FullFilterPickerValues } from './types';

interface Props {
  height?: number
}

const AminoAcidDistributionDynamicChart: React.FC<Props> = ({
  height
}) => {
  const handleFilterSubmit = (filters: FullFilterPickerValues) => {
    console.log(filters);
  };

  return (
    <Box>
      <FullFilterPicker onSubmit={handleFilterSubmit} />
      <WithTitledBox title="Amino Acid Distribution Compared" height={height}>
        <BarChart id="aa-distribution" data={{}} yTitle="Frequency" xTitle="Amino Acid" />
      </WithTitledBox>
    </Box>
  );
};

export default AminoAcidDistributionDynamicChart;
