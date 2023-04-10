import React, { useRef } from 'react';
import { Block, Heading, Button } from 'react-bulma-components';
import SingleFilterPicker from './SingleFilterPicker';
import { FilterPickerValue, FullFilterPickerValues } from './types';
import { FrequencyFilterType } from '@lib/services/graphDb/statisticsService';
import clsx from 'clsx';
import styles from './FilterPicker.module.scss';

interface Props {
  loading?: boolean
  onSubmit?: (filters: FullFilterPickerValues) => void
}

const FullFilterPicker: React.FC<Props> = ({ loading, onSubmit }) => {
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
    <Block mt={6}>
      <Heading style={{ textAlign: 'center' }} size={5}>
        Pick a Filter for this Graph
      </Heading>

      <Block className={clsx(styles.responsiveFlex, styles.fullFilterBlock)}>
        <SingleFilterPicker title="Left Filter" initialType={initialType} position="left" onChange={handleFilterChange} />
        <SingleFilterPicker title="Right Filter" initialType={initialType} position="right" onChange={handleFilterChange} />
      </Block>

      <Block style={{ textAlign: 'center' }}>
        <Button color="primary" className="w-100" onClick={handleSubmit} loading={loading} disabled={loading}>
          Apply Filter
        </Button>
      </Block>

      <p>
        * Leave any filter empty to compare the frequencies from the whole database.
      </p>
    </Block>
  );
};

export default FullFilterPicker;
