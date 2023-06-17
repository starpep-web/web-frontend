import React from 'react';
import GenericPeptideSearchResult from '../GenericPeptideSearchResult';
import PeptideSearchResultItemRow from '../rows/PeptideSearchResultItemRow';
import { Peptide } from '@lib/models/peptide';
import { Pagination } from '@lib/utils/pagination';

interface Props extends Pagination {
  peptides: Peptide[]
  onPageChange: (page: number) => void
}

const PeptideSearchResult: React.FC<Props> = ({ onPageChange, peptides, ...pagination }) => {
  return (
    <GenericPeptideSearchResult
      peptides={peptides}
      onPageChange={onPageChange}
      headers={['#', 'ID', 'Sequence', 'Length']}
      rowComponent={PeptideSearchResultItemRow}
      {...pagination}
    />
  );
};

export default PeptideSearchResult;
