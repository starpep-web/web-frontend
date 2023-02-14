import React, { ChangeEvent } from 'react';
import { Form } from 'react-bulma-components';

interface Props {
  value: string
  onChange: (value: string) => void

  options: string[]
}

const DropdownInput: React.FC<Props> = ({ value, onChange, options }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.currentTarget.value);
  };

  return (
    <div>
      <Form.Input value={value} onChange={handleInputChange} placeholder="Search" />

      <pre>
        {JSON.stringify(options, null, 2)}
      </pre>
    </div>
  );
};

export default DropdownInput;
