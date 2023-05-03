import React from 'react';
import { Container, Footer as BulmaFooter, Icon, Level } from 'react-bulma-components';
import styles from './Footer.module.scss';
import Link from 'next/link';
import { ROUTES } from '@lib/constants/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <BulmaFooter className={styles.footer} backgroundColor="primary-light">
      <Container>
        <Level className={styles['footer-content']}>
          <Level.Side align="left" className={styles.brand}>
            <img src="/static/logo/full-logo.svg" alt="app-logo" />
            <span>Copyright © 2023</span>
          </Level.Side>
          <Level.Side align="right" className={styles.links}>
            <Link href={ROUTES.home}>Home</Link>
            <Link href={ROUTES.contact}>Contact</Link>
            <Link href={ROUTES.downloads}>Downloads</Link>
            <Link href={ROUTES.search}>Search</Link>
            <Link href={ROUTES.statistics}>Statistics</Link>
            <Link href={ROUTES.help}>Help</Link>
            <Link href={ROUTES.about}>About</Link>
            <Link href={ROUTES.tools}>Tools</Link>
          </Level.Side>
        </Level>
        <div className={styles.socials}>
          <Icon mr={6}>
            <FontAwesomeIcon icon={['fab', 'facebook']} />
          </Icon>

          <Icon mr={6}>
            <FontAwesomeIcon icon={['fab', 'instagram']} />
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={['fab', 'linkedin']} />
          </Icon>
        </div>
      </Container>
    </BulmaFooter>
  );
};

export default Footer;
