import React from 'react';
import GenericPeptideSearchResult from '../GenericPeptideSearchResult';
import MultiAlignedPeptideSearchResultItemRow from '../rows/MultiAlignedPeptideSearchResultItemRow';
import { MultiAlignedPeptide } from '@lib/models/search';
import { Pagination } from '@lib/utils/pagination';

interface Props extends Pagination {
  peptides: MultiAlignedPeptide[]
  onPageChange: (page: number) => void
}

const MultiAlignedPeptideSearchResult: React.FC<Props> = ({ onPageChange, peptides, ...pagination }) => {
  return (
    <GenericPeptideSearchResult
      peptides={peptides}
      onPageChange={onPageChange}
      headers={[
        '#',
        'ID',
        'Score',
        'Avg. Score',
        'Max. Score',
        'Min. Score',
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
      rowComponent={MultiAlignedPeptideSearchResultItemRow}
      {...pagination}
    />
  );
};

export default MultiAlignedPeptideSearchResult;
