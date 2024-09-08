import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  href: string
  children?: React.ReactNode
  disabled?: boolean
  active?: boolean
}

export const PaginationItem: React.FC<Props> = ({ href, children, disabled, active }) => {
  return (
    <li className={clsx('page-item', disabled && 'disabled', active && 'active')} aria-current={active ? 'page' : undefined}>
      <Link
        href={href}
        className="page-link"
        style={{ pointerEvents: active || disabled ? 'none' : 'auto' }}
        tabIndex={active || disabled ? -1 : 0}
        aria-disabled={active || disabled ? 'true' : undefined}
      >
        {children}
      </Link>
    </li>
  );
};
