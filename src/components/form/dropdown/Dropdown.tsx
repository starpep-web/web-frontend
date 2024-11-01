import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props<T extends string> {
  label?: string
  icon?: React.JSXElementConstructor<React.SVGProps<SVGElement>>
  className?: string
  style?: React.CSSProperties

  options: T[]
  value: T
  onChange: (value: T) => void
}

export const Dropdown = <T extends string>({ label, icon, className, style, options, value, onChange }: Props<T>) => {
  const IconComponent = icon;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value as T);
  };

  return (
    <Form.Group className={className} style={style}>
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

        <Form.Select value={value} onChange={handleChange} className="w-100" style={{ paddingLeft: IconComponent && '30px' }}>
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
