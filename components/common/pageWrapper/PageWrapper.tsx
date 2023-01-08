import React from 'react';
import { Container } from 'react-bulma-components';
import clsx from 'clsx';
import { Navbar } from '@components/common/navbar';
import { Footer } from '@components/common/footer';
import styles from './PageWrapper.module.scss';

interface Props {
  children: React.ReactNode
  className?: string
}

const PageWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Container className={clsx(styles.page, className)} renderAs="main">
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default PageWrapper;
