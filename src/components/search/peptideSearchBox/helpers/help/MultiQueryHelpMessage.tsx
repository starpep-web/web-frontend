import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const MultiQueryHelpMessage = () => {
  return (
    <Alert variant="info">
      The multi query search process involves calculating pairwise similarity scores between each peptide in the target dataset and every peptide in the query dataset.
      These similarities can be determined using either Local or Global alignment algorithms.
      Subsequently, for each target peptide, the maximum, minimum, or average similarity score across all query peptides is identified, representing the "group fusion" score.
      Target peptides are then ranked based on these group fusion scores, with the highest-scoring peptides ranked first.
      Finally, a similarity threshold value is established, and target peptides with group fusion scores exceeding this threshold are recovered as search results.
      This approach enables the identification of potential matches within the target dataset by considering the sequence diversity represented by a peptide
      set as queries or references for the search.

      <hr />

      Search results can be exported and resulting peptides can be retrieved in a multiple <strong>FASTA</strong> file along with their
      associated features and metadata in <strong>CSV</strong> format.
    </Alert>
  );
};
