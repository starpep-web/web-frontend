import React from 'react';
import { Footer as BulmaFooter, Container, Content } from 'react-bulma-components';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <BulmaFooter className={styles.footer}>
      <Container>
        <Content>
          WebPep - 2023
        </Content>
      </Container>
    </BulmaFooter>
  );
};

export default Footer;
