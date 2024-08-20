import React, { useState, useCallback } from 'react';
import { Box } from 'react-bulma-components';
import { WithExportableTitledBox } from '@components/common/withTitledBox';
import { ScatterChart } from '@components/statistics/charts';
import { useFetch } from '@components/hooks/fetch';
import AttributesPicker from './AttributesPicker';
import { getScatterForAttributes } from '@lib/services/localApi/statisticsService';
import { PeptideAttributes } from '@lib/models/peptide';
import { Axis2D } from '@lib/models/statistics';
import uniqolor from 'uniqolor';

interface Props {
  height?: number
}

const AttributeScatterDynamicChart: React.FC<Props> = ({ height }) => {
  const [xAttribute, setXAttribute] = useState<PeptideAttributes.RawPropertyName>('hydropathicity');
  const [yAttribute, setYAttribute] = useState<PeptideAttributes.RawPropertyName>('charge');
  const dataRequest = useCallback(() => {
    return getScatterForAttributes(xAttribute, yAttribute);
  }, [xAttribute, yAttribute]);

  const { data } = useFetch(dataRequest);
  const isExportDisabled = !data || !data.length;

  const handleAttributesChange = (axis: Axis2D, attribute: PeptideAttributes.RawPropertyName) => {
    if (axis === 'x') {
      setXAttribute(attribute);
    } else {
      setYAttribute(attribute);
    }
  };

  return (
    <Box>
      <WithExportableTitledBox
        title={`${PeptideAttributes.getFriendlyNameForRawAttribute(xAttribute)} vs. ${PeptideAttributes.getFriendlyNameForRawAttribute(yAttribute)}`}
        height={height}
        exportedFilename={`statistics-features-${xAttribute}-${yAttribute}-scatter`}
        disabled={isExportDisabled}
      >
        <ScatterChart
          id="attribute-scatter"
          xTitle={PeptideAttributes.getFriendlyNameForRawAttribute(xAttribute)}
          yTitle={PeptideAttributes.getFriendlyNameForRawAttribute(yAttribute)}
          data={data ?? []}
          color={uniqolor(xAttribute ?? '', { format: 'rgb' }).color}
          beginAtZero={false}
        />
      </WithExportableTitledBox>

      <AttributesPicker onChange={handleAttributesChange} xValue={xAttribute} yValue={yAttribute} />
    </Box>
  );
};

export default AttributeScatterDynamicChart;
