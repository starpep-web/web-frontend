import React, { useState } from 'react';
import { Navbar as BulmaNavbar } from 'react-bulma-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { ROUTES } from '@lib/constants/routes';
import styles from './Navbar.module.scss';

const navbarItems = [
  { text: 'Search', href: ROUTES.search },
  { text: 'About', href: ROUTES.about },
  { text: 'Contact', href: ROUTES.contact },
  { text: 'Statistics', href: ROUTES.statistics,
    innerItems: [
      { text: 'General Information', href: ROUTES.statisticsGeneralInformation },
      { text: 'Metadata', href: ROUTES.statisticsMetadata },
      { text: 'Features', href: ROUTES.statisticsFeatures }
    ]
  },
  { text: 'Tools', href: ROUTES.tools },
  { text: 'Downloads', href: ROUTES.downloads },
  { text: 'FAQ', href: ROUTES.faq },
  { text: 'Help', href: ROUTES.help }
];

interface Props {
  isErrorPage: boolean
}

const Navbar: React.FC<Props> = ({ isErrorPage }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleBurgerClick = () => {
    setOpen(!open);
  };

  const isItemActive = (href: string): boolean => {
    if (href === router.asPath) {
      return true;
    }

    return href !== '/' && router.asPath.startsWith(href) && !isErrorPage;
  };

  return (
    <BulmaNavbar className={styles['app-navbar']} backgroundColor="primary-light">
      <BulmaNavbar.Brand>
        <BulmaNavbar.Item renderAs={Link} href={ROUTES.home} className={styles['full-app-logo']}>
          <img
            alt="app logo"
            src="/static/logo/full-logo.svg"
          />
        </BulmaNavbar.Item>

        <BulmaNavbar.Burger onClick={handleBurgerClick} />
      </BulmaNavbar.Brand>

      <BulmaNavbar.Menu className={clsx({ 'is-active': open })}>
        <BulmaNavbar.Container>
          {
            navbarItems.map(({ text, href, innerItems }) => (
              innerItems ? (
                <BulmaNavbar.Item key={href} hoverable>
                  <BulmaNavbar.Link renderAs={Link} href={href} className={clsx({ [styles.dropdownItemActive]: isItemActive(href) })}>
                    {text}
                  </BulmaNavbar.Link>
                  <BulmaNavbar.Dropdown>
                    {
                      innerItems.map(({ text, href }) => (
                        <BulmaNavbar.Item key={href} renderAs={Link} href={href} active={isItemActive(href)}>
                          {text}
                        </BulmaNavbar.Item>
                      ))
                    }
                  </BulmaNavbar.Dropdown>
                </BulmaNavbar.Item>
              ) : (
                <BulmaNavbar.Item key={href} renderAs={Link} href={href} active={isItemActive(href)}>
                  {text}
                </BulmaNavbar.Item>
              )
            ))
          }
        </BulmaNavbar.Container>
      </BulmaNavbar.Menu>
    </BulmaNavbar>
  );
};

export default Navbar;
