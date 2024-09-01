import React, { ChangeEvent, MouseEvent, KeyboardEvent, FocusEvent } from 'react';
import clsx from 'clsx';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from '@components/common/loader';
import styles from './InfiniteDropdownInput.module.scss';

interface Props {
  label?: string
  icon?: React.JSXElementConstructor<React.SVGProps<SVGElement>>

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

export const InfiniteDropdownInput: React.FC<Props> = ({
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
  const IconComponent = icon;

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
    <Dropdown className="w-100" show={open}>
      <div className="w-100">
        <Form.Group>
          {
            label && (
              <Form.Label className="fw-semibold" column={false}>
                {label}
              </Form.Label>
            )
          }

          <Form.Group className="relative">
            {
              IconComponent && (
                <IconComponent
                  className="mx-2 my-0 absolute top-50 start-0 translate-middle-y"
                  height={16}
                  width={16}
                  style={{ fill: '#dbdbdb' }}
                />
              )
            }

            <Form.Control
              type="text"
              style={{
                paddingLeft: IconComponent ? '30px' : undefined,
                paddingRight: loading ? '30px' : undefined
              }}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onFocus={onFocus}
              onBlur={handleInputBlur}
            />

            {
              loading && (
                <div className="mx-2 my-0 absolute top-50 end-0 translate-middle-y" style={{ width: 16, height: 16 }}>
                  <Loader loading={loading} size={16} />
                </div>
              )
            }
          </Form.Group>
        </Form.Group>
      </div>

      <Dropdown.Menu className="w-100">
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
              <Dropdown.Item
                key={idx}
                className={styles.dropdownItem}
                onClick={handleOptionClick}
                onKeyDown={handleOptionEnter}
              >
                {option}
              </Dropdown.Item>
            ))
          }
        </InfiniteScroll>
      </Dropdown.Menu>
    </Dropdown>
  );
};
