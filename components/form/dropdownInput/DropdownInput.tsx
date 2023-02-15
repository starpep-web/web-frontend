import React, { ChangeEvent } from 'react';
import { Form, Icon } from 'react-bulma-components';
import clsx from 'clsx';
import styles from './DropdownInput.module.scss';

interface Props {
  label?: string
  placeholder?: string
  icon?: string

  value: string
  onChange: (value: string) => void

  open: boolean
  options: string[]
}

const DropdownInput: React.FC<Props> = ({ label, placeholder, icon, value, onChange, open, options }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.currentTarget.value);
  };

  return (
    <div className={clsx({ dropdown: true, 'is-active': open })}>
      <div className="dropdown-trigger">
        <Form.Field aria-haspopup aria-controls="dropdown-menu">
          {
            label &&
              <Form.Label>
                {label}
              </Form.Label>
          }

          <Form.Control>
            <Form.Input type="text" value={value} onChange={handleInputChange} placeholder={placeholder} />

            {
              icon &&
              <Icon align="left" size="small">
                {icon}
              </Icon>
            }
          </Form.Control>
        </Form.Field>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            options.map((option, idx) => (
              <div key={idx} className={clsx('dropdown-item', styles.dropdownItem)} tabIndex={0}>
                {option}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default DropdownInput;
