import React from 'react';
import clsx from 'clsx';
import { resolveColorClass, BulmaColor, DEFAULT_COLOR } from '@components/bulmaExtensions/_resolvers/color';
import { resolveSizeClass, BulmaSize } from '@components/bulmaExtensions/_resolvers/size';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  color?: BulmaColor
  boxSize?: BulmaSize
  noBorder?: boolean
  coloredBackground?: boolean
}

const Radio: React.FC<Props> = ({
  label,
  id,
  color = DEFAULT_COLOR,
  boxSize,
  noBorder,
  coloredBackground,
  ...props
}) => {
  return (
    <div className="field">
      <input
        {...props}
        id={id}
        type="radio"
        className={
          clsx(
            'is-checkradio',
            resolveColorClass(color),
            resolveSizeClass(boxSize),
            {
              'has-no-border': noBorder,
              'has-background-color': coloredBackground
            }
          )
        }
      />
      <label htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
