import React from 'react';
import { Form, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  onChange: (value: string) => void
  value: string
  regexEnabled?: boolean
}

const TextSearchInput: React.FC<Props> = ({ onChange, value, regexEnabled = false }) => {
  const placeholder = regexEnabled ?
    'Insert a regular expression to search' :
    'Insert a sequence to search';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    onChange(regexEnabled ? value : value.toUpperCase());
  };

  return (
    <Form.Control>
      <Form.Input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={value}
      />

      <Icon align="left">
        <FontAwesomeIcon icon="search" />
      </Icon>
    </Form.Control>
  );
};

export default TextSearchInput;
