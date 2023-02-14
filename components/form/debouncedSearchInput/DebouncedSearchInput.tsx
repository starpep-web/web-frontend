import React, { useState, useEffect } from 'react';
import { DropdownInput } from '@components/form/dropdownInput';
import { useDebounce } from '@components/hooks/debounce';
import { getDatabaseSuggestions } from '@lib/services/localApi/searchService';

const DebouncedSearchInput = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    getDatabaseSuggestions(debouncedValue)
      .then((results) => {
        setOptions(results);
      });
  }, [debouncedValue]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <DropdownInput value={value} onChange={handleChange} options={options} />
  );
};

export default DebouncedSearchInput;
