import React from 'react';
import GenericPeptideSearchResult from '../GenericPeptideSearchResult';
import PeptideSearchResultItemRow from '../rows/PeptideSearchResultItemRow';
import { SearchResultPeptide } from '@lib/models/peptide';
import { Pagination } from '@lib/utils/pagination';
import { ORDERED_ATTRIBUTE_HEADERS } from '../shared';

interface Props extends Pagination {
  peptides: SearchResultPeptide[]
  onPageChange: (page: number) => void
}

const PeptideSearchResult: React.FC<Props> = ({ onPageChange, peptides, ...pagination }) => {
  return (
    <GenericPeptideSearchResult
      peptides={peptides}
      onPageChange={onPageChange}
      headers={[
        '#',
        'ID',
        'Sequence',
        'Length',
        ...ORDERED_ATTRIBUTE_HEADERS
      ]}
      rowComponent={PeptideSearchResultItemRow}
      {...pagination}
    />
  );
};

export default PeptideSearchResult;
