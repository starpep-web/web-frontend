import React, { Fragment, useRef } from 'react';
import clsx from 'clsx';
import { resolveColorClass, BulmaColor, DEFAULT_COLOR } from '@components/bulmaExtensions/_resolvers/color';
import { resolveSizeClass, BulmaSize } from '@components/bulmaExtensions/_resolvers/size';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: BulmaColor
  grabberSize?: BulmaSize
  circle?: boolean
  showValue?: boolean
}

const Slider: React.FC<Props> = ({
  color = DEFAULT_COLOR,
  grabberSize,
  circle,
  showValue,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Fragment>
      <input
        {...props}
        ref={inputRef}
        type="range"
        className={
          clsx(
            'slider is-fullwidth',
            resolveColorClass(color),
            resolveSizeClass(grabberSize),
            {
              'is-circle': circle,
              'has-output': showValue
            }
          )
        }
      />
      {
        showValue && (
          <output>
            {inputRef.current?.value}
          </output>
        )
      }
    </Fragment>
  );
};

export default Slider;
