import React from 'react';
import clsx from 'clsx';
import { BounceLoader } from 'react-spinners';

const DEFAULT_LOADER_COLOR = '#276FB8';

interface Props {
  className?: string
  style?: React.CSSProperties
  color?: string
  loading: boolean
  absoluteCenter?: boolean
  size?: number
}

export const Loader = ({ className, style, color, loading, absoluteCenter, size }: Props) => {
  return (
    <BounceLoader
      className={clsx(className, absoluteCenter && 'position-absolute translate-middle top-50 start-50')}
      color={color ?? DEFAULT_LOADER_COLOR}
      loading={loading}
      style={style}
      size={size}
    />
  );
};
