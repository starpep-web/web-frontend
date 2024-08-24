import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  label?: string
  icon?: React.JSXElementConstructor<React.SVGProps<SVGElement>>
  placeholder?: string
  className?: string

  options: string[]
  value: string
  onChange: (value: string) => void
}

export const Dropdown = ({ label, icon, placeholder, className, options, value, onChange }: Props) => {
  const IconComponent = icon;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <Form.Group className={className}>
      {
        label && (
          <Form.Label>
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

        <Form.Select value={value} onChange={handleChange} placeholder={placeholder} className="w-100" style={{ paddingLeft: '30px' }}>
          {
            options.map((option, idx) => (
              <option value={option} key={idx}>
                {option}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>
    </Form.Group>
  );
};