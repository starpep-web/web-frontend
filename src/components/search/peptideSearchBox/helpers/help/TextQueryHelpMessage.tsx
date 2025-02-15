import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const TextQueryHelpMessage = () => {
  return (
    <Alert variant="info">
      Click on the plus icon and select the filters you wish to use in your search.
      You can choose from a variety of operators and comparators for both metadata and features.
      Each filter will be evaluated sequentially in the order that they're inserted, <span className="is-underlined">there is no precedence of <strong>AND</strong> over <strong>OR</strong> operators.</span>

      <hr />

      Search results can be exported and resulting peptides can be retrieved in a multiple <strong>FASTA</strong> file along with their
      associated features and metadata in <strong>CSV</strong> format.
    </Alert>
  );
};
