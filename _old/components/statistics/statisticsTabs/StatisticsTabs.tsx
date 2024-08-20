import React from 'react';
import Link from 'next/link';
import { Tabs } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { ROUTES } from '@lib/constants/routes';

const tabOptions = [
  { text: 'General Information', href: ROUTES.statisticsGeneralInformation },
  { text: 'Metadata', href: ROUTES.statisticsMetadata },
  { text: 'Features', href: ROUTES.statisticsFeatures }
];

const StatisticsTabs = () => {
  const router = useRouter();

  const isItemActive = (href: string): boolean => {
    if (href === router.asPath) {
      return true;
    }

    return href !== '/' && router.asPath.startsWith(href);
  };

  return (
    <Tabs>
      {
        tabOptions.map(({ text, href }) => (
          <Tabs.Tab key={href} renderAs={Link} href={href} active={isItemActive(href)}>
            {text}
          </Tabs.Tab>
        ))
      }
    </Tabs>
  );
};

export default StatisticsTabs;
