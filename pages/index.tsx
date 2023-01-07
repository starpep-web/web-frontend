import React, { Fragment } from 'react';
import { PageMetadata } from '@components/common/pageMetadata';

const Home = () => {
  return (
    <Fragment>
      <PageMetadata title="Home" />

      <main>
        Main Page
      </main>
    </Fragment>
  );
};

export default Home;
