'use client';
import React, { useState, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import uniqolor from 'uniqolor';
import { WithExportableTitledBox } from '@components/common/withTitledBox';
import { ScatterChart } from '@components/statistics/charts';
import { useFetch } from '@components/hooks/useFetch';
import AttributesPicker from './AttributesPicker';
import { getAttributeScatterAction } from '@actions/statistics/dynamic/attribute-scatter';
import { getFriendlyNameForRawAttribute } from '@lib/services/api/helpers/peptide';
import { RawAttributeName } from '@lib/services/api/models/peptide';
import { Axis2D } from '@lib/services/api/models/statistics';

interface Props {
  className?: string
  height?: number
}

export const AttributeScatterDynamicChart: React.FC<Props> = ({ className, height }) => {
  const [xAttribute, setXAttribute] = useState<RawAttributeName>('hydropathicity');
  const [yAttribute, setYAttribute] = useState<RawAttributeName>('charge');
  const dataRequest = useCallback(() => {
    return getAttributeScatterAction(xAttribute, yAttribute);
  }, [xAttribute, yAttribute]);
  const { data } = useFetch(dataRequest);
  const isExportDisabled = !data || !data.length;

  const handleAttributesChange = (axis: Axis2D, attribute: RawAttributeName) => {
    if (axis === 'x') {
      setXAttribute(attribute);
    } else {
      setYAttribute(attribute);
    }
  };

  return (
    <Card className={className}>
      <CardBody>
        <WithExportableTitledBox
          title={`${getFriendlyNameForRawAttribute(xAttribute)} vs. ${getFriendlyNameForRawAttribute(yAttribute)}`}
          height={height}
          exportedFilename={`statistics-features-${xAttribute}-${yAttribute}-scatter`}
          disabled={isExportDisabled}
        >
          <ScatterChart
            id="attribute-scatter"
            xTitle={getFriendlyNameForRawAttribute(xAttribute)}
            yTitle={getFriendlyNameForRawAttribute(yAttribute)}
            data={data ?? []}
            color={uniqolor(xAttribute ?? '', { format: 'rgb' }).color}
            beginAtZero={false}
          />
        </WithExportableTitledBox>

        <AttributesPicker onChange={handleAttributesChange} xValue={xAttribute} yValue={yAttribute} />
      </CardBody>
    </Card>
  );
};
