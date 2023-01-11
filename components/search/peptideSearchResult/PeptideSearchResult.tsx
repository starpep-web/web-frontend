import React from 'react';
import { Box } from 'react-bulma-components';
import PeptideSearchResultItem from './PeptideSearchResultItem';

interface Props {
  peptides: string[]
}

const PeptideSearchResult: React.FC<Props> = ({ peptides }) => {
  if (peptides.length < 1) {
    return (
      <Box>
        No results found for your query.
      </Box>
    );
  }

  return (
    <Box>
      {
        peptides.map((peptide) => (
          <PeptideSearchResultItem key={peptide} peptide={peptide} />
        ))
      }
    </Box>
  );
};

export default PeptideSearchResult;
