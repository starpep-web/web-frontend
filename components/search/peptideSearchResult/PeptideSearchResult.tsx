import React from 'react';
import { Box, Pagination as BulmaPagination } from 'react-bulma-components';
import PeptideSearchResultItemRow from './PeptideSearchResultItemRow';
import { Table } from '@components/common/table';
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
      <Table
        headers={['#', 'ID', 'Sequence', 'Length']}
      >
        {
          peptides.map((peptide, idx) => (
            <PeptideSearchResultItemRow key={peptide.id} index={currentIndex + idx + 1} {...peptide} />
          ))
        }
      </Table>

      <BulmaPagination current={currentPage} showFirstLast total={totalPages} onChange={handlePaginationChange} />
    </Box>
  );
};

export default PeptideSearchResult;
