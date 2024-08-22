import React from 'react';
import { PageMetadata } from '@components/common/pageMetadata';
import { PageWrapper } from '@components/common/pageWrapper';
import { AppErrorMessage } from '@components/common/appErrorMessage';

const NotFoundPage = () => {
  return (
    <PageWrapper isErrorPage>
      <AppErrorMessage
        icon="question-circle"
        iconColor="primary"
        title="Page Not Found"
        message="The page you were looking for was not found. Please check that the URL you inserted is correct."
      />
    </PageWrapper>
  );
};

export default NotFoundPage;
