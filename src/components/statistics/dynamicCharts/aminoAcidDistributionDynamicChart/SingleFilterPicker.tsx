'use client';
import React, { useState } from 'react';
import { DebouncedInfiniteSearchInput } from '@components/form/debouncedInfiniteSearchInput';
import { Dropdown } from '@components/form/dropdown';
import { getDatabaseSuggestionsAction } from '@actions/search/suggestions/database';
import { getFunctionSuggestionsAction } from '@actions/search/suggestions/function';
import { getOriginSuggestionsAction } from '@actions/search/suggestions/origin';
import { FrequencyFilterType } from '@lib/services/api/models/statistics';
import { FilterPickerValue, GraphPosition } from './types';
import { WithPagination } from '@lib/services/api/models/api';
import DatabaseIcon from '@assets/svg/icons/database-solid.svg';
import AtomIcon from '@assets/svg/icons/atom-solid.svg';
import StarOfLifeIcon from '@assets/svg/icons/star-of-life-solid.svg';
import FilterIcon from '@assets/svg/icons/filter-solid.svg';

type FrequencyFilterTypeOptions = {
  fn: (query: string, page?: number) => Promise<WithPagination<string>>
  icon: React.JSXElementConstructor<React.SVGProps<SVGElement>>
};

const typeOptions: Record<FrequencyFilterType, FrequencyFilterTypeOptions> = {
  Database: {
    fn: getDatabaseSuggestionsAction,
    icon: DatabaseIcon
  },
  Function: {
    fn: getFunctionSuggestionsAction,
    icon: AtomIcon
  },
  Origin: {
    fn: getOriginSuggestionsAction,
    icon: StarOfLifeIcon
  }
};

interface Props {
  title: string
  initialType?: FrequencyFilterType
  position: GraphPosition
  onChange?: (data: FilterPickerValue) => void
}

export const SingleFilterPicker: React.FC<Props> = ({ title, initialType, position, onChange }) => {
  const [type, setType] = useState<FrequencyFilterType>(initialType ?? 'Database');
  const [value, setValue] = useState<string>('');

  const options = typeOptions[type];

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
    <div className="w-100 mb-4" style={{ flexBasis: '1/2' }}>
      <h5 className="text-center mb-3">
        {title}
      </h5>

      <Dropdown
        className="w-100 mb-2"
        value={type}
        onChange={handleTypeChange}
        options={Object.keys(typeOptions)}
        icon={FilterIcon}
      />

      <DebouncedInfiniteSearchInput
        dataFetch={options.fn}
        onChange={handleValueChange}
        placeholder={`Search by ${type}`}
        initialValue={value}
        icon={options.icon}
        key={type} // We pass a key here to re-create this component once type changes.
      />
    </div>
  );
};
