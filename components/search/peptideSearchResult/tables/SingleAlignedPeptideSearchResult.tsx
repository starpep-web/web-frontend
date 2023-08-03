import React from 'react';
import GenericPeptideSearchResult from '../GenericPeptideSearchResult';
import SingleAlignedPeptideSearchResultItemRow from '../rows/SingleAlignedPeptideSearchResultItemRow';
import { SingleAlignedPeptide } from '@lib/models/search';
import { Pagination } from '@lib/utils/pagination';

interface Props extends Pagination {
  peptides: SingleAlignedPeptide[]
  onPageChange: (page: number) => void
}

const SingleAlignedPeptideSearchResult: React.FC<Props> = ({ onPageChange, peptides, ...pagination }) => {
  return (
    <GenericPeptideSearchResult
      peptides={peptides}
      onPageChange={onPageChange}
      headers={[
        '#',
        'ID',
        'Score',
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
      rowComponent={SingleAlignedPeptideSearchResultItemRow}
      {...pagination}
    />
  );
};

export default SingleAlignedPeptideSearchResult;
