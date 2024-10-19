'use client';
import React from 'react';
import clsx from 'clsx';
import { Loader } from '@components/common/loader';
import { useAutoRefresh } from '@components/hooks/useAutoRefresh';

interface Props {
  className?: string
  style?: React.CSSProperties
  title?: string
  subtitle?: string
  refreshInterval?: number
}

export const RefreshLoader: React.FC<Props> = ({ className, style, title, subtitle, refreshInterval }) => {
  useAutoRefresh(refreshInterval);

  return (
    <div className={clsx('d-flex flex-column align-items-center', className)} style={style}>
      <div className="relative mb-4" style={{ width: '60px', height: '60px' }}>
        <Loader className="d-block " loading />
      </div>
      {
        !!title && (
          <h5 className="mb-2">
            {title}
          </h5>
        )
      }
      {
        !!subtitle && (
          <p className="text-center">
            {subtitle}
          </p>
        )
      }
    </div>
  );
};
