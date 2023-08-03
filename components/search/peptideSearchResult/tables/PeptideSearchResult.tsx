import React from 'react';
import GenericPeptideSearchResult from '../GenericPeptideSearchResult';
import PeptideSearchResultItemRow from '../rows/PeptideSearchResultItemRow';
import { SearchResultPeptide } from '@lib/models/peptide';
import { Pagination } from '@lib/utils/pagination';

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
        'Hydropathicity',
        'Charge',
        'Isoelectric Point',
        'Boman Index',
        'GAAC - Alphatic',
        'GAAC - Aromatic',
        'GAAC - Positive Charge',
        'GAAC - Negative Charge',
        'GAAC - Uncharge'
      ]}
      rowComponent={PeptideSearchResultItemRow}
      {...pagination}
    />
  );
};

export default PeptideSearchResult;
