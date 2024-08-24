import React from 'react';
import clsx from 'clsx';
import { BounceLoader } from 'react-spinners';

const DEFAULT_LOADER_COLOR = '#276FB8';

interface Props {
  className?: string
  color?: string
  loading: boolean
  absoluteCenter?: boolean
}

export const Loader = ({ className, color, loading, absoluteCenter }: Props) => {
  return (
    <BounceLoader
      className={clsx(className, absoluteCenter && 'position-absolute translate-middle top-50 start-50')}
      color={color ?? DEFAULT_LOADER_COLOR}
      loading={loading}
    />
  );
};
