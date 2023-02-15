import React, { useState, useEffect } from 'react';
import { DropdownInput } from '@components/form/dropdownInput';
import { useDebounce } from '@components/hooks/debounce';

interface Props {
  dataFetch: (value: string) => Promise<string[]>
}

const DebouncedSearchInput: React.FC<Props> = ({ dataFetch }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dataFetch(debouncedValue)
      .then((results) => {
        setOptions(results);
      })
      .catch(() => {
        setOptions([]);
      });
  }, [debouncedValue]);

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <DropdownInput value={value} onChange={handleInputChange} options={options} />
  );
};

export default DebouncedSearchInput;
