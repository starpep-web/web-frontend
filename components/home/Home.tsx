import React, { Fragment } from 'react';
import styles from './Home.module.scss';
import { Hero, Section, Heading } from 'react-bulma-components';
import { About } from '@components/home/about';

const Home = () => {
  return (
    <Fragment>
      <Hero className={styles.hero}>
        <Hero.Body>
          <img alt="db-sources" src="/background/db-background.jpeg" />
          <Section className={styles['hero-text']}>
            <Heading size={5} subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem arcu, ullamcorper at erat sit amet, imperdiet tristique ante. Donec
              iaculis placerat mi id gravida. Etiam cursus quis risus varius vestibulum. Fusce id ante mollis, porttitor tellus nec, iaculis orci. Proin
              scelerisque in metus eu volutpat.
            </Heading>
          </Section>
        </Hero.Body>
      </Hero>
      <About />
    </Fragment>
  );
};

export default Home;
