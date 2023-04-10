import React, { useState, useCallback } from 'react';
import { Box } from 'react-bulma-components';
import { WithTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';
import FullFilterPicker from './FullFilterPicker';
import { FullFilterPickerValues, CompositeFrequencyData } from './types';
import { getFilteredAAFrequency } from '@lib/services/localApi/statisticsService';
import { useFetch } from '@components/hooks/fetch';

interface Props {
  height?: number
}

const AminoAcidDistributionDynamicChart: React.FC<Props> = ({
  height
}) => {
  const [filters, setFilters] = useState<FullFilterPickerValues | null>(null);
  const filterRequest = useCallback<() => Promise<CompositeFrequencyData>>(async () => {
    if (!filters) {
      return {} as CompositeFrequencyData;
    }

    const leftKey = `${filters.left.type}: ${filters.left.value}`;
    const rightKey = `${filters.right.type}: ${filters.right.value}`;
    return {
      [leftKey]: await getFilteredAAFrequency(filters.left.type, filters.left.value),
      [rightKey]: await getFilteredAAFrequency(filters.right.type, filters.right.value)
    };
  }, [filters]);

  const { data } = useFetch(filterRequest);

  const handleFilterSubmit = (filters: FullFilterPickerValues) => {
    setFilters(filters);
  };

  return (
    <Box>
      <FullFilterPicker onSubmit={handleFilterSubmit} />
      <WithTitledBox title="Amino Acid Distribution Compared" height={height}>
        <BarChart id="aa-distribution" data={data ?? {}} yTitle="Frequency" xTitle="Amino Acid" />
      </WithTitledBox>
    </Box>
  );
};

export default AminoAcidDistributionDynamicChart;
