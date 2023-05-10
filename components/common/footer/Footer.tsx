import React from 'react';
import Link from 'next/link';
import { Container, Footer as BulmaFooter, Icon, Level } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ROUTES } from '@lib/constants/routes';
import styles from './Footer.module.scss';

const footerLinks = [
  { text: 'Home', href: ROUTES.home },
  { text: 'Contact', href: ROUTES.contact },
  { text: 'Downloads', href: ROUTES.downloads },
  { text: 'Search', href: ROUTES.search },
  { text: 'Statistics', href: ROUTES.statistics },
  { text: 'Help', href: ROUTES.help },
  { text: 'About', href: ROUTES.about },
  { text: 'Tools', href: ROUTES.tools }
];

const socialLinks: { icon: IconProp, href: string }[] = [
  { icon: ['fab', 'facebook'], href: '#' },
  { icon: ['fab', 'instagram'], href: '#' },
  { icon: ['fab', 'linkedin'], href: '#' }
];

const Footer = () => {
  return (
    <BulmaFooter className={styles.footer} backgroundColor="primary-light">
      <Container>
        <Level className={styles['footer-content']}>
          <Level.Side align="left" className={styles.brand}>
            <img src="/static/logo/full-logo.svg" alt="app-logo" />
            <span>Copyright © {new Date().getFullYear()}</span>
          </Level.Side>

          <Level.Side align="right" className={styles.links}>
            {
              footerLinks.map(({ text, href }, idx) => (
                <Link key={idx} href={href}>
                  {text}
                </Link>
              ))
            }
          </Level.Side>
        </Level>

        <div className={styles.socials}>
          {
            socialLinks.map(({ icon, href }, idx) => (
              <Link key={idx} href={href}>
                <Icon>
                  <FontAwesomeIcon icon={icon} />
                </Icon>
              </Link>
            ))
          }
        </div>
      </Container>
    </BulmaFooter>
  );
};

export default Footer;
