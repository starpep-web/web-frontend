'use client';
import React, { Fragment, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { SingleFilterPicker } from './SingleFilterPicker';
import { FilterPickerValue, FullFilterPickerValues } from './types';
import { FrequencyFilterType } from '@lib/services/api/models/statistics';

interface Props {
  loading?: boolean
  onSubmit?: (filters: FullFilterPickerValues) => void
}

export const FullFilterPicker: React.FC<Props> = ({ loading, onSubmit }) => {
  const initialType: FrequencyFilterType = 'Database';

  const leftRef = useRef<FilterPickerValue>({
    position: 'left',
    type: initialType,
    value: ''
  });
  const rightRef = useRef<FilterPickerValue>({
    position: 'right',
    type: initialType,
    value: ''
  });

  const handleFilterChange = (filter: FilterPickerValue) => {
    if (filter.position === 'left') {
      leftRef.current = filter;
    } else if (filter.position === 'right') {
      rightRef.current = filter;
    }
  };

  const handleSubmit = () => {
    onSubmit?.({
      left: leftRef.current,
      right: rightRef.current
    });
  };

  return (
    <div className="mt-4">
      <h4 className="text-center mb-3">
        Pick a Filter for this Graph
      </h4>

      <div className="d-flex gap-3 flex-column flex-md-row">
        <SingleFilterPicker title="Left Filter" initialType={initialType} position="left" onChange={handleFilterChange} />
        <SingleFilterPicker title="Right Filter" initialType={initialType} position="right" onChange={handleFilterChange} />
      </div>

      <div className="text-center">
        <Button variant="primary" className="w-100 d-inline-flex align-items-center justify-content-center" onClick={handleSubmit} disabled={loading}>
          {
            loading ? (
              <div className="d-flex align-items-center justify-content-center" style={{ height: 20, width: 50 }}>
                <Spinner size="sm" animation="border" role="status" />
              </div>
            ) : (
              <Fragment>
                Apply Filter
              </Fragment>
            )
          }
        </Button>
      </div>

      <p className="mt-3 mb-0">
        * Leave any filter empty to compare the frequencies from the whole database.
      </p>
    </div>
  );
};
