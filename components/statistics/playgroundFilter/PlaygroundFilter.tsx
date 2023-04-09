import React, { useState } from 'react';
import { Block, Button } from 'react-bulma-components';
import { DebouncedInfiniteSearchInput } from '@components/form/debouncedInfiniteSearchInput';
import { Dropdown } from '@components/form/dropdown';
import {
  MetadataSuggestionFunction,
  getDatabaseSuggestions,
  getFunctionSuggestions,
  getOriginSuggestions,
  getTargetSuggestions,
  getCTerminusSuggestions,
  getNTerminusSuggestions,
  getCrossRefSuggestions,
  getUnusualAASuggestions
} from '@lib/services/localApi/searchService';
import { FrequencyFilterType } from '@lib/services/graphDb/statisticsService';
import { metadataFilterIcons } from '@lib/icons/metadataFilterIcons';
import styles from './PlaygroundFilter.module.scss';

const fetchFunctions: Record<FrequencyFilterType, MetadataSuggestionFunction> = {
  Database: getDatabaseSuggestions,
  Function: getFunctionSuggestions,
  Origin: getOriginSuggestions,
  Target: getTargetSuggestions,
  Cterminus: getCTerminusSuggestions,
  Nterminus: getNTerminusSuggestions,
  CrossRef: getCrossRefSuggestions,
  UnusualAA: getUnusualAASuggestions
};

interface Props {
  defaultType?: FrequencyFilterType | null
  defaultValue?: string | null
  onSubmit?: (type: FrequencyFilterType, value: string) => void
}

const PlaygroundFilter: React.FC<Props> = ({ defaultType, defaultValue, onSubmit }) => {
  const [type, setType] = useState<FrequencyFilterType>(defaultType ?? 'Database');
  const [value, setValue] = useState<string>(defaultValue ?? '');

  const fetchFunction = fetchFunctions[type];

  const handleTypeChange = (type: string) => {
    setValue('');
    setType(type as FrequencyFilterType);
  };

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  const handleSubmit = () => {
    onSubmit?.(type, value);
  };

  return (
    <Block className={styles.playgroundFilter}>
      <Dropdown
        value={type as string}
        onChange={handleTypeChange}
        options={Object.keys(fetchFunctions)}
        placeholder="Pick a filter"
        icon="filter"
      />

      <DebouncedInfiniteSearchInput
        dataFetch={fetchFunction}
        onChange={handleValueChange}
        placeholder={`Search by ${type}`}
        initialValue={value}
        icon={metadataFilterIcons[type]}
        key={type} // We pass a key here to re-create this component once type changes.
      />

      <Button onClick={handleSubmit} color="primary">
        Filter
      </Button>
    </Block>
  );
};

export default PlaygroundFilter;
