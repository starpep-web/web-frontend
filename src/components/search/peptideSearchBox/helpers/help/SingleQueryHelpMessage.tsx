import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const SingleQueryHelpMessage = () => {
  return (
    <Alert variant="info">
      The single query peptide search uses both Local (Smith-Waterman) and Global (Needleman-Wunsch) alignment algorithms.
      Users can input a single peptide sequence and define a similarity threshold to filter results.
      A higher threshold will yield fewer results, allowing for more stringent searches.
      The "Max Results" option provides further control by limiting the number of matches displayed,enabling users to focus on the most relevant hits.

      <hr />

      Search results can be exported and resulting peptides can be retrieved in a multiple <strong>FASTA</strong> file along with their
      associated features and metadata in <strong>CSV</strong> format.
    </Alert>
  );
};
