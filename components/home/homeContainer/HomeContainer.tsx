import React, { Fragment } from 'react';
import styles from './HomeContainer.module.scss';
import { Heading, Hero, Section } from 'react-bulma-components';
import { About } from 'components/home/about';
import { Contact } from 'components/home/contact';
import { Carousel } from 'react-responsive-carousel';

const carouselImages = [
  { alt: 'db-sources', src: '/static/background/db-background.webp' },
  { alt: 'db-sources', src: '/static/background/db-background-1.webp' }
];

const HomeContainer = () => {
  return (
    <Fragment>
      <Hero className={styles.hero}>
        <Hero.Body>
          <Carousel autoPlay interval={3000} infiniteLoop>
            {
              carouselImages.map(({ alt, src }, idx) => (
                <img key={idx} alt={alt} src={src} />
              ))
            }
          </Carousel>

          <Section className={styles['hero-text']}>
            <Heading size={5} subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem arcu, ullamcorper at erat sit amet, imperdiet tristique ante. Donec
              iaculis placerat mi id gravida. Etiam cursus quis risus varius vestibulum. Fusce id ante mollis, porttitor tellus nec, iaculis orci.
              Proin scelerisque in metus eu volutpat.
            </Heading>
          </Section>
        </Hero.Body>
      </Hero>

      <About />
      <Contact />
    </Fragment>
  );
};

export default HomeContainer;
