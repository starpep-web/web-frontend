import React, { useState } from 'react';
import { Navbar as BulmaNavbar } from 'react-bulma-components';
import Link from 'next/link';
import clsx from 'clsx';
import { ROUTES } from '@lib/constants/routes';

const navbarItems = [
  { text: 'Home', href: ROUTES.home },
  { text: 'Search', href: ROUTES.search },
  { text: 'Statistics', href: ROUTES.statistics },
  { text: 'Tools', href: ROUTES.tools },
  { text: 'FAQ', href: ROUTES.faq },
  { text: 'Help', href: ROUTES.help },
  { text: 'About', href: ROUTES.about },
  { text: 'Contact', href: ROUTES.contact }
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleBurgerClick = () => {
    setOpen(!open);
  };

  return (
    <BulmaNavbar>
      <BulmaNavbar.Brand>
        <BulmaNavbar.Item renderAs={Link} href={ROUTES.home}>
          <img
            alt="app logo"
            src="/android-chrome-192x192.png"
          />
        </BulmaNavbar.Item>

        <BulmaNavbar.Burger onClick={handleBurgerClick} />
      </BulmaNavbar.Brand>

      <BulmaNavbar.Menu className={clsx({ 'is-active': open })}>
        <BulmaNavbar.Container>
          {
            navbarItems.map(({ text, href }) => (
              <BulmaNavbar.Item key={href} renderAs={Link} href={href}>
                {text}
              </BulmaNavbar.Item>
            ))
          }
        </BulmaNavbar.Container>
      </BulmaNavbar.Menu>
    </BulmaNavbar>
  );
};

export default Navbar;
