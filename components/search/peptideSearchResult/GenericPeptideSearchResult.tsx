import React from 'react';
import { Box, Pagination as BulmaPagination } from 'react-bulma-components';
import { Table } from '@components/common/table';
import { Peptide } from '@lib/models/peptide';
import { Pagination } from '@lib/utils/pagination';
import { RowProps } from './rows/types';

interface Props<T extends Peptide> extends Pagination {
  peptides: T[]
  onPageChange: (page: number) => void

  headers: string[]
  rowComponent: React.JSXElementConstructor<RowProps<T>>
}

const GenericPeptideSearchResult = <T extends Peptide>({
  onPageChange,
  peptides,
  headers,
  rowComponent,
  currentPage,
  totalPages,
  currentIndex
}: Props<T>) => {
  const RowComponent = rowComponent;

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
        headers={headers}
      >
        {
          peptides.map((peptide, idx) => (
            <RowComponent key={peptide.id} index={currentIndex + idx + 1} {...peptide} />
          ))
        }
      </Table>

      <BulmaPagination current={currentPage} showFirstLast total={totalPages} onChange={handlePaginationChange} />
    </Box>
  );
};

export default GenericPeptideSearchResult;
