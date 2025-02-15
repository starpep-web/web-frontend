'use client';
import React from 'react';
import Link from 'next/link';
import BSNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { usePathname } from 'next/navigation';
import { RouteDefs } from '@lib/constants/routes';
import { GITHUB_ORGANIZATION_URL } from '@lib/constants/external';
import FullLogo from '@assets/svg/logo/full-logo.svg';
import styles from './Navbar.module.scss';

const navbarItems = [
  { text: 'Search', href: RouteDefs.search },
  { text: 'About', href: RouteDefs.about },
  { text: 'Contact', href: RouteDefs.contact },
  { text: 'Statistics', href: RouteDefs.statistics,
    innerItems: [
      { text: 'General Information', href: RouteDefs.statisticsGeneralInformation },
      { text: 'Metadata', href: RouteDefs.statisticsMetadata },
      { text: 'Features', href: RouteDefs.statisticsFeatures }
    ]
  },
  { text: 'Downloads', href: RouteDefs.downloads },
  { text: 'Publications', href: RouteDefs.publications },
  { text: 'GitHub', href: GITHUB_ORGANIZATION_URL }
];

export const Navbar = () => {
  const pathname = usePathname();

  const isItemActive = (href: string): boolean => {
    return href === pathname || (href !== '/' && pathname.startsWith(href));
  };

  return (
    <BSNavbar expand="lg" bg="light" className="px-4 py-4">
      <BSNavbar.Brand>
        <Link href={RouteDefs.home}>
          <FullLogo className={styles.navbarLogo} />
        </Link>
      </BSNavbar.Brand>

      <BSNavbar.Toggle aria-controls="navbar" />

      <BSNavbar.Collapse id="navbar">
        <Nav className="me-auto">
          {
            navbarItems.map(({ text, href, innerItems }) => {
              if (innerItems) {
                return (
                  <Nav.Item key={href}>
                    <NavDropdown title={text} id="navbar-dropdown" active={isItemActive(href)}>
                      {
                        innerItems.map(({ text, href }) => (
                          <NavDropdown.Item key={href} as={Link as unknown as 'a'} href={href} active={isItemActive(href)}>
                            {text}
                          </NavDropdown.Item>
                        ))
                      }
                    </NavDropdown>
                  </Nav.Item>
                );
              }

              return (
                <Nav.Link key={href} as={Link as unknown as 'a'} href={href} active={isItemActive(href)}>
                  {text}
                </Nav.Link>
              );
            })
          }
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};
