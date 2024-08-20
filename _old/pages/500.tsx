import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { AppErrorMessage } from '@components/common/appErrorMessage';

const ServerSideErrorPage = () => {
  return (
    <PageWrapper isErrorPage>
      <PageMetadata title="Server Side Error" />

      <AppErrorMessage
        icon="triangle-exclamation"
        iconColor="danger"
        title="Server Side Error"
        message="The server has failed to fulfill your request because of an unknown error. Please try again later."
      />
    </PageWrapper>
  );
};

export default ServerSideErrorPage;
