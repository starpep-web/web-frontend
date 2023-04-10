import React, { useState } from 'react';
import { DebouncedInfiniteSearchInput } from '@components/form/debouncedInfiniteSearchInput';
import { Dropdown } from '@components/form/dropdown';
import {
  MetadataSuggestionFunction,
  getDatabaseSuggestions,
  getFunctionSuggestions,
  getOriginSuggestions
} from '@lib/services/localApi/searchService';
import { FrequencyFilterType } from '@lib/services/graphDb/statisticsService';
import { metadataFilterIcons } from '@lib/icons/metadataFilterIcons';
import { FilterPickerValue, GraphPosition } from './types';
import clsx from 'clsx';
import styles from './FilterPicker.module.scss';

const suggestionsFetchFunctions: Record<FrequencyFilterType, MetadataSuggestionFunction> = {
  Database: getDatabaseSuggestions,
  Function: getFunctionSuggestions,
  Origin: getOriginSuggestions
};

interface Props {
  initialType?: FrequencyFilterType
  position: GraphPosition
  onChange?: (data: FilterPickerValue) => void
}

const SingleFilterPicker: React.FC<Props> = ({ initialType, position, onChange }) => {
  const [type, setType] = useState<FrequencyFilterType>(initialType ?? 'Database');
  const [value, setValue] = useState<string>('');

  const suggestionsFetchFunction = suggestionsFetchFunctions[type];

  const handleTypeChange = (type: string) => {
    setType(type as FrequencyFilterType);
    setValue('');
    onChange?.({
      position,
      type: type as FrequencyFilterType,
      value
    });
  };

  const handleValueChange = (value: string) => {
    setValue(value);
    onChange?.({
      position,
      type,
      value
    });
  };

  return (
    <div className={clsx(styles.responsiveFlex, styles.flexExpand, 'mb-2')}>
      <Dropdown
        className={styles.filterDropdown}
        value={type as string}
        onChange={handleTypeChange}
        options={Object.keys(suggestionsFetchFunctions)}
        placeholder="Pick a filter"
        icon="filter"
      />

      <DebouncedInfiniteSearchInput
        dataFetch={suggestionsFetchFunction}
        onChange={handleValueChange}
        placeholder={`Search by ${type}`}
        initialValue={value}
        icon={metadataFilterIcons[type]}
        key={type} // We pass a key here to re-create this component once type changes.
      />
    </div>
  );
};

export default SingleFilterPicker;
