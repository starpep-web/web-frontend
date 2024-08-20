import React from 'react';
import { Form, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './Dropdown.module.scss';

interface Props {
  label?: string
  icon?: IconProp
  placeholder?: string
  className?: string

  options: string[]
  value: string
  onChange: (value: string) => void
}

const Dropdown: React.FC<Props> = ({ label, icon, placeholder, className, options, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <Form.Field className={className}>
      {
        label && (
          <Form.Label>
            {label}
          </Form.Label>
        )
      }

      <Form.Control>
        <Form.Select value={value} onChange={handleChange} placeholder={placeholder} className={styles.dropdownSelect}>
          {
            options.map((option, idx) => (
              <option value={option} key={idx}>
                {option}
              </option>
            ))
          }
        </Form.Select>

        {
          icon && (
            <Icon align="left" size="small">
              <FontAwesomeIcon icon={icon} />
            </Icon>
          )
        }
      </Form.Control>
    </Form.Field>
  );
};

export default Dropdown;
