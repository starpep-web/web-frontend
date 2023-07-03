import React from 'react';
import Link from 'next/link';
import { Container, Footer as BulmaFooter, Level } from 'react-bulma-components';
import { ShareButtons } from '@components/common/shareButtons';
import { ROUTES } from '@lib/constants/routes';
import { WEBSITE_URL } from '@lib/config';
import styles from './Footer.module.scss';

const footerLinks = [
  { text: 'Home', href: ROUTES.home },
  { text: 'Contact', href: ROUTES.contact },
  { text: 'Downloads', href: ROUTES.downloads },
  { text: 'Search', href: ROUTES.search },
  { text: 'Statistics', href: ROUTES.statistics },
  { text: 'About', href: ROUTES.about }
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

        <ShareButtons
          className={styles.socials}
          url={WEBSITE_URL}
          withText={false}
          withCopyToClipboard={false}
          withStyle={false}
        />
      </Container>
    </BulmaFooter>
  );
};

export default Footer;
