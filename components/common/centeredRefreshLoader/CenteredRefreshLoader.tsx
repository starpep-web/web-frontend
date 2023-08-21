import React from 'react';
import { BounceLoader } from 'react-spinners';
import clsx from 'clsx';
import { useAutoRefresh } from '@components/hooks/autoRefresh';
import { LOADER_COLOR } from '@lib/constants/styling';
import styles from './CenteredRefreshLoader.module.scss';

interface Props {
  title?: string
  subtitle?: string
  refreshInterval?: number
}

const CenteredRefreshLoader: React.FC<Props> = ({ title, subtitle, refreshInterval }) => {
  useAutoRefresh(refreshInterval);

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

export default CenteredRefreshLoader;
