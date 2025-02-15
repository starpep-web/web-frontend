import React from 'react';
import Form from 'react-bootstrap/Form';
import MagnifyingGlassIcon from '@assets/svg/icons/magnifying-glass-solid.svg';

interface Props {
  onChange: (value: string) => void
  value: string
  regexEnabled?: boolean
}

export const TextSearchInput: React.FC<Props> = ({ onChange, value, regexEnabled = false }) => {
  const placeholder = regexEnabled ?
    'Insert a regular expression to search' :
    'Insert a sequence to search';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    onChange(regexEnabled ? value : value.toUpperCase());
  };

  return (
    <Form.Group className="relative">
      <MagnifyingGlassIcon
        className="mx-2 my-0 absolute top-50 start-0 translate-middle-y"
        height={16}
        width={16}
        style={{ fill: '#dbdbdb' }}
      />

      <Form.Control
        type="text"
        className="w-100"
        style={{ paddingLeft: '30px' }}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={value}
      />
    </Form.Group>
  );
};
