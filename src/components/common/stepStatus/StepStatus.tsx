import React from 'react';
import clsx from 'clsx';
import CheckIcon from '@assets/svg/icons/check-solid.svg';
import SpinnerIcon from '@assets/svg/icons/spinner-solid.svg';
import XIcon from '@assets/svg/icons/x-solid.svg';
import styles from './StepStatus.module.scss';

type Status = 'success' | 'in-progress' | 'error';
type StatusOptions = {
  IconComponent: React.JSXElementConstructor<React.SVGProps<SVGElement>>,
  background: string,
  color: string,
  spin: boolean
}

const statusOptions: Record<Status, StatusOptions> = {
  success: {
    IconComponent: CheckIcon,
    background: 'var(--bs-success)',
    color: 'white',
    spin: false
  },
  'in-progress': {
    IconComponent: SpinnerIcon,
    background: 'var(--bs-primary)',
    color: 'white',
    spin: true
  },
  error: {
    IconComponent: XIcon,
    background: 'var(--bs-danger)',
    color: 'white',
    spin: false
  }
};

interface Props {
  status: Status
  text: string
}

export const StepStatus: React.FC<Props> = ({ status, text }) => {
  const { IconComponent, background, color, spin } = statusOptions[status];

  return (
    <div className="d-flex align-items-center mb-0 gap-3">
      <div className={clsx('d-inline-flex align-items-center justify-content-center rounded-circle', styles.icon)} style={{ backgroundColor: background }}>
        <IconComponent className={clsx(spin && styles.spin)} style={{ fill: color }} />
      </div>

      <h6 className="flex-fill m-0">
        {text}
      </h6>
    </div>
  );
};
