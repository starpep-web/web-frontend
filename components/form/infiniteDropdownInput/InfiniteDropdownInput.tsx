import React, { ChangeEvent, MouseEvent, KeyboardEvent, FocusEvent } from 'react';
import { Form, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BounceLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'clsx';
import { LOADER_COLOR } from '@lib/constants/styling';
import styles from './InfiniteDropdownInput.module.scss';

interface Props {
  label?: string
  icon?: IconProp

  open: boolean
  options: string[]

  onShouldFetch?: () => void
  moreDataAvailable?: boolean
  loading?: boolean

  onChange?: (value: string) => void
  onSelect?: (value: string) => void
  placeholder?: string
  value: string
  onBlur?: () => void
  onFocus?: () => void
}

const InfiniteDropdownInput: React.FC<Props> = ({
  label,
  icon,
  open,
  options,
  onShouldFetch,
  moreDataAvailable,
  loading,
  onChange,
  onSelect,
  placeholder,
  value,
  onBlur,
  onFocus
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange?.(e.currentTarget.value);
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.className.includes('dropdown-item')) {
      return;
    }

    onBlur?.();
  };

  const handleOptionClick = ({ currentTarget: { textContent } }: MouseEvent<HTMLDivElement>) => {
    onChange?.(textContent ?? '');
    onSelect?.(textContent ?? '');
  };

  const handleOptionEnter = ({ key, currentTarget: { textContent } }: KeyboardEvent<HTMLDivElement>) => {
    if (key === 'Enter') {
      onChange?.(textContent ?? '');
      onSelect?.(textContent ?? '');
    }
  };

  const handleScrollNext = () => {
    onShouldFetch?.();
  };

  return (
    <div className={clsx('dropdown w-100', { 'is-active': open })}>
      <div className="dropdown-trigger w-100">
        <Form.Field aria-haspopup aria-controls="dropdown-menu">
          {
            label &&
            <Form.Label>
              {label}
            </Form.Label>
          }

          <Form.Control>
            <Form.Input
              type="text"
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onFocus={onFocus}
              onBlur={handleInputBlur}
            />

            {
              icon &&
              <Icon align="left">
                <FontAwesomeIcon icon={icon} />
              </Icon>
            }
          </Form.Control>
        </Form.Field>
      </div>

      <div className="dropdown-menu w-100" id="dropdown-menu" role="menu">
        <InfiniteScroll
          className={clsx('dropdown-content', styles.dropdownContent)}
          next={handleScrollNext}
          hasMore={moreDataAvailable ?? true}
          loader={null}
          dataLength={options.length}
          height={192}
        >
          {
            options.map((option, idx) => (
              <div
                key={idx}
                role="menuitem"
                className={clsx('dropdown-item', styles.dropdownItem)}
                tabIndex={-1}
                onClick={handleOptionClick}
                onKeyDown={handleOptionEnter}
              >
                {option}
              </div>
            ))
          }

          {
            loading && (
              <div className={styles.dropdownLoaderContainer}>
                <BounceLoader className={styles.dropdownLoader} loading size={14} color={LOADER_COLOR} />
              </div>
            )
          }
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteDropdownInput;
