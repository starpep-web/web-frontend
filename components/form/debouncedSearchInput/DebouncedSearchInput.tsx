import React, { useState, useEffect } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DropdownInput } from '@components/form/dropdownInput';
import { useDebounce } from '@components/hooks/debounce';

interface Props {
  dataFetch: (value: string) => Promise<string[]>

  label?: string
  placeholder?: string
  icon?: IconProp
}

const DebouncedSearchInput: React.FC<Props> = ({ dataFetch, label, placeholder, icon }) => {
  const [open, setOpen] = useState<boolean>(false);
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
    setOpen(true);
  };

  const handleDropdownOpen = () => {
    setOpen(true);
  };

  const handleDropdownClose = () => {
    setOpen(false);
  };

  return (
    <DropdownInput
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

export default DebouncedSearchInput;
