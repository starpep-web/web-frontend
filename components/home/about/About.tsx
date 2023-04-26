import React from 'react';
import { Columns, Content, Image as BulmaImage } from 'react-bulma-components';
import styles from './About.module.scss';

const About = () => {
  return (
    <Columns className={styles.about} vCentered breakpoint="tablet">
      <Columns.Column>
        <Content size="large" className={styles.content}>
          <h1>About StarPep Web</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec
            rutrum justo nibh eu lectus. Ut vulputate semper dui.
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec
            rutrum justo nibh eu lectus. Ut vulputate semper dui.
          </p>
        </Content>
      </Columns.Column>
      <Columns.Column>
        <BulmaImage src="/static/images/lab.png" />
      </Columns.Column>
    </Columns>
  );
};

export default About;
