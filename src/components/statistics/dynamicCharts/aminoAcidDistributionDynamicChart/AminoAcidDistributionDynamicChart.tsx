'use client';
import React, { useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import { WithExportableTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';
import { FullFilterPicker } from './FullFilterPicker';
import { FullFilterPickerValues, CompositeFrequencyData } from './types';
import { getAminoAcidFrequencyAction } from '@actions/statistics/dynamic/aa-frequency';
import { useFetch } from '@components/hooks/useFetch';

interface Props {
  className?: string
  height?: number
}

export const AminoAcidDistributionDynamicChart: React.FC<Props> = ({ className, height }) => {
  const [filters, setFilters] = useState<FullFilterPickerValues | null>(null);
  const filterRequest = useCallback<() => Promise<CompositeFrequencyData>>(async () => {
    if (!filters) {
      return {} as CompositeFrequencyData;
    }

    const leftKey = filters.left.value ? `${filters.left.type}: ${filters.left.value}` : 'Whole Database';
    const rightKey = filters.right.value ? `${filters.right.type}: ${filters.right.value}` : 'Whole Database';
    return {
      [leftKey]: await getAminoAcidFrequencyAction(filters.left.type, filters.left.value),
      [rightKey]: await getAminoAcidFrequencyAction(filters.right.type, filters.right.value)
    };
  }, [filters]);

  const { data, loading } = useFetch(filterRequest);

  const handleFilterSubmit = (filters: FullFilterPickerValues) => {
    setFilters(filters);
  };

  return (
    <Card className={className}>
      <CardBody>
        <WithExportableTitledBox
          title="Amino Acid Distribution Compared"
          height={height}
          exportedFilename="statistics-aa-distribution"
          disabled={!data || !Object.keys(data).length}
        >
          <BarChart
            id="aa-distribution"
            data={data ?? {}}
            yTitle="Frequency"
            xTitle="Amino Acid"
            showLegend
          />
        </WithExportableTitledBox>

        <FullFilterPicker loading={loading} onSubmit={handleFilterSubmit} />
      </CardBody>
    </Card>
  );
};
