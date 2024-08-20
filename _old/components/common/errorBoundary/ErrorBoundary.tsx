/* eslint-disable react/jsx-no-useless-fragment */
import React, { Fragment } from 'react';
import { ErrorMessage } from '@components/common/errorMessage';

interface Props {
  children: React.ReactNode

  warning?: boolean
  header?: string
  error?: Error | string
}

const ErrorBoundary: React.FC<Props> = ({ children, header, warning, error }) => {
  if (!error) {
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }

  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <ErrorMessage header={header} warning={warning} error={errorMessage} />
  );
};

export default ErrorBoundary;
