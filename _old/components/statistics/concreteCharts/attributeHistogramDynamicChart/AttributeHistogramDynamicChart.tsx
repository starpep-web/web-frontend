import React, { useState, useCallback } from 'react';
import { Box } from 'react-bulma-components';
import { WithExportableTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';
import { useFetch } from '@components/hooks/useFetch';
import AttributePicker from './AttributePicker';
import { getHistogramForAttribute } from '@lib/services/localApi/statisticsService';
import { PeptideAttributes } from '@lib/models/peptide';
import uniqolor from 'uniqolor';

interface Props {
  height?: number
}

const AttributeHistogramDynamicChart: React.FC<Props> = ({ height }) => {
  const [attribute, setAttribute] = useState<PeptideAttributes.RawPropertyName>('hydropathicity');
  const dataRequest = useCallback(() => {
    return getHistogramForAttribute(attribute);
  }, [attribute]);

  const { data } = useFetch(dataRequest);
  const isExportDisabled = !data || !Object.keys(data).length;

  const handleAttributeChange = (attribute: PeptideAttributes.RawPropertyName) => {
    setAttribute(attribute);
  };

  return (
    <Box>
      <WithExportableTitledBox
        title={`Peptide ${PeptideAttributes.getFriendlyNameForRawAttribute(attribute)} Distribution`}
        height={height}
        exportedFilename={`statistics-features-${attribute}-distribution`}
        disabled={isExportDisabled}
      >
        <BarChart
          id="attribute-histogram"
          data={data ?? {}}
          yTitle="Frequency"
          xTitle={`${PeptideAttributes.getFriendlyNameForRawAttribute(attribute)} Ranges`}
          color={uniqolor(attribute ?? '', { format: 'rgb' }).color}
        />
      </WithExportableTitledBox>

      <AttributePicker onChange={handleAttributeChange} value={attribute} />
    </Box>
  );
};

export default AttributeHistogramDynamicChart;
