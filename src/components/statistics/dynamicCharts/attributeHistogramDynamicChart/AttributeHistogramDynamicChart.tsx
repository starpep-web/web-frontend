'use client';
import React, { useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import uniqolor from 'uniqolor';
import { WithExportableTitledBox } from '@components/common/withTitledBox';
import { BarChart } from '@components/statistics/charts';
import { useFetch } from '@components/hooks/useFetch';
import { AttributePicker } from './AttributePicker';
import { getAttributeHistogramAction } from '@actions/statistics/dynamic/attribute-histogram';
import { getFriendlyNameForRawAttribute } from '@lib/services/api/helpers/peptide';
import { RawAttributeName } from '@lib/services/api/models/peptide';

interface Props {
  className?: string
  height?: number
}

export const AttributeHistogramDynamicChart: React.FC<Props> = ({ className, height }) => {
  const [attribute, setAttribute] = useState<RawAttributeName>('hydropathicity');
  const dataRequest = useCallback(() => {
    return getAttributeHistogramAction(attribute);
  }, [attribute]);
  const { data } = useFetch(dataRequest);

  const isExportDisabled = !data || !Object.keys(data).length;

  const handleAttributeChange = (attribute: RawAttributeName) => {
    setAttribute(attribute);
  };

  return (
    <Card className={className}>
      <CardBody>
        <WithExportableTitledBox
          title={`Peptide ${getFriendlyNameForRawAttribute(attribute)} Distribution`}
          height={height}
          exportedFilename={`statistics-features-${attribute}-distribution`}
          disabled={isExportDisabled}
        >
          <BarChart
            id="attribute-histogram"
            data={data ?? {}}
            yTitle="Frequency"
            xTitle={`${getFriendlyNameForRawAttribute(attribute)} Ranges`}
            color={uniqolor(attribute ?? '', { format: 'rgb' }).color}
          />
        </WithExportableTitledBox>

        <AttributePicker onChange={handleAttributeChange} value={attribute} />
      </CardBody>
    </Card>
  );
};
