import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { RouteDefs } from '@lib/constants/routes';

const tabOptions = [
  { text: 'General Information', href: RouteDefs.statisticsGeneralInformation },
  { text: 'Metadata', href: RouteDefs.statisticsMetadata },
  { text: 'Features', href: RouteDefs.statisticsFeatures }
];

interface Props {
  currentHref: string
}

export const StatisticsTabs: React.FC<Props> = ({ currentHref }) => {
  return (
    <ul className="nav nav-tabs mb-4">
      {
        tabOptions.map(({ text, href }) => (
          <li key={href} className="nav-item">
            <Link className={clsx('nav-link', currentHref === href && 'active')} href={href}>
              {text}
            </Link>
          </li>
        ))
      }
    </ul>
  );
};
