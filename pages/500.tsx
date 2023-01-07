import React, { Fragment } from 'react';
import { PageMetadata } from '@components/common/pageMetadata';

const ServerSideErrorPage = () => {
  return (
    <Fragment>
      <PageMetadata title="Server Side Error" />

      <main>
        Server Side Error
      </main>
    </Fragment>
  );
};

export default ServerSideErrorPage;
