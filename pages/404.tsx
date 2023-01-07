import React, { Fragment } from 'react';
import { PageMetadata } from '@components/common/pageMetadata';

const NotFoundPage = () => {
  return (
    <Fragment>
      <PageMetadata title="Not Found" />

      <main>
        Not Found :(
      </main>
    </Fragment>
  );
};

export default NotFoundPage;
