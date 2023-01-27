import React from 'react';
import { Footer as BulmaFooter, Container, Content } from 'react-bulma-components';
import { SITE_TITLE } from '@lib/constants/site';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <BulmaFooter className={styles.footer}>
      <Container>
        <Content>
          {SITE_TITLE} - 2023
        </Content>
      </Container>
    </BulmaFooter>
  );
};

export default Footer;
