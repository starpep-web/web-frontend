import React from 'react';
import { Box, Pagination as BulmaPagination } from 'react-bulma-components';
import PeptideSearchResultItem from './PeptideSearchResultItem';
import { Peptide } from '@lib/models/peptide';
import { Pagination } from '@lib/utils/pagination';

interface Props extends Pagination {
  peptides: Peptide[]
  onPageChange: (page: number) => void
}

const PeptideSearchResult: React.FC<Props> = ({ onPageChange, peptides, currentPage, totalPages, currentIndex }) => {
  const handlePaginationChange = (page: number) => {
    onPageChange(page);
  };

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
        peptides.map((peptide, idx) => (
          <PeptideSearchResultItem key={peptide.sequence} index={currentIndex + idx + 1} {...peptide} />
        ))
      }

      <BulmaPagination current={currentPage} showFirstLast total={totalPages} onChange={handlePaginationChange} />
    </Box>
  );
};

export default PeptideSearchResult;
