import React, { useState, useEffect } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { InfiniteDropdownInput } from '@components/form/infiniteDropdownInput';
import { useDebounce } from '@components/hooks/debounce';
import { usePrevious } from '@components/hooks/previous';
import { WithPagination } from '@lib/utils/pagination';

interface Props {
  dataFetch: (value: string, page: number) => Promise<WithPagination<string>>
  onChange?: (value: string) => void

  label?: string
  placeholder?: string
  initialValue?: string
  icon?: IconProp
}

const DebouncedInfiniteSearchInput: React.FC<Props> = ({ dataFetch, onChange, label, placeholder, initialValue, icon }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue ?? '');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [allOptions, setAllOptions] = useState<string[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const debouncedValue = useDebounce(value, 500);
  const previousDebouncedValue = usePrevious(debouncedValue);

  useEffect(() => {
    setLoading(true);
    dataFetch(debouncedValue, currentPage)
      .then((results) => {
        if (debouncedValue === previousDebouncedValue) {
          setAllOptions([...allOptions, ...results.data]);
        } else {
          setAllOptions(results.data);
        }

        setHasMoreData(!results.pagination.isLastPage);
      })
      .catch(() => {
        setAllOptions([]);
        setHasMoreData(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dataFetch, debouncedValue, currentPage]);

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

  const handleShouldFetch = () => {
    if (hasMoreData && !loading) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <InfiniteDropdownInput
      label={label}
      placeholder={placeholder}
      icon={icon}
      value={value}
      onShouldFetch={handleShouldFetch}
      moreDataAvailable={hasMoreData}
      loading={loading}
      onChange={handleInputChange}
      onSelect={handleDropdownClose}
      onBlur={handleDropdownClose}
      onFocus={handleDropdownOpen}
      open={open}
      options={allOptions}
    />
  );
};

export default DebouncedInfiniteSearchInput;
