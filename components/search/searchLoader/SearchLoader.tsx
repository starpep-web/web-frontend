import React, { useEffect } from 'react';
import { BounceLoader } from 'react-spinners';
import clsx from 'clsx';
import { LOADER_COLOR } from '@lib/constants/styling';
import styles from './SearchLoader.module.scss';

interface Props {
  title?: string
  subtitle?: string
  refreshInterval?: number
}

const SearchLoader: React.FC<Props> = ({ title, subtitle, refreshInterval }) => {
  useEffect(() => {
    if (!refreshInterval || !Number.isInteger(refreshInterval) || refreshInterval < 1000) {
      return;
    }

    const handler = setTimeout(() => {
      window.location.reload();
    }, refreshInterval);

    return () => {
      clearTimeout(handler);
    };
  }, [refreshInterval]);

  return (
    <div className={clsx('absolute-center', styles['search-loader'])}>
      <BounceLoader className="mb-4" loading color={LOADER_COLOR} />
      {
        !!title && (
          <h5 className="title is-5">
            {title}
          </h5>
        )
      }
      {
        !!subtitle && (
          <p className="subtitle">
            {subtitle}
          </p>
        )
      }
    </div>
  );
};

export default SearchLoader;
