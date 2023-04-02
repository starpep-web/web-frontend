import React, { useState, useEffect } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { InfiniteDropdownInput } from '@components/form/infiniteDropdownInput';
import { useDebounce } from '@components/hooks/debounce';
import { WithPagination } from '@lib/utils/pagination';

interface Props {
  dataFetch: (value: string) => Promise<WithPagination<string[]>>
  onChange?: (value: string) => void

  label?: string
  placeholder?: string
  icon?: IconProp
}

const DebouncedInfiniteSearchInput: React.FC<Props> = ({ dataFetch, onChange, label, placeholder, icon }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    dataFetch(debouncedValue)
      .then((results) => {
        setOptions(results.data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, [debouncedValue]);

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
    setOpen(true);
    onChange?.(newValue);
  };

  const handleDropdownOpen = () => {
    setOpen(true);
  };

  const handleDropdownClose = () => {
    setOpen(false);
  };

  return (
    <InfiniteDropdownInput
      label={label}
      placeholder={placeholder}
      icon={icon}
      value={value}
      onChange={handleInputChange}
      onSelect={handleDropdownClose}
      onBlur={handleDropdownClose}
      onFocus={handleDropdownOpen}
      open={open}
      options={options}
    />
  );
};

export default DebouncedInfiniteSearchInput;
