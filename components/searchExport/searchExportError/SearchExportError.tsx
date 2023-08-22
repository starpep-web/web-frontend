import React from 'react';
import { ErrorMessage } from '@components/common/errorMessage';

interface Props {
  error: string
}

const SearchExportError: React.FC<Props> = ({ error }) => {
  return (
    <ErrorMessage
      header="An error occurred when exporting your search"
      description="The server could not complete your search export. If you see this message, please try exporting your search again."
      error={error}
      show
    />
  );
};

export default SearchExportError;
