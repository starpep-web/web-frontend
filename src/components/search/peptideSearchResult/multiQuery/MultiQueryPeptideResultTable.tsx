import React from 'react';
import { MultiAlignedPeptide } from '@lib/services/bioApi/models/peptide';
import { GenericPeptideSearchResult } from '../shared/GenericPeptideSearchResult';
import { MultiQueryPeptideResultRow } from './MultiQueryPeptideResultRow';
import { ORDERED_ATTRIBUTE_HEADERS } from '../shared/helpers';

interface Props {
  peptides: MultiAlignedPeptide[]
  firstIndex: number
}

const MultiQueryPeptideResultTable: React.FC<Props> = ({ peptides, firstIndex }) => {
  return (
    <GenericPeptideSearchResult
      peptides={peptides}
      headers={[
        '#',
        'ID',
        'Score',
        'Avg. Score',
        'Max. Score',
        'Min. Score',
        'Sequence',
        'Length',
        ...ORDERED_ATTRIBUTE_HEADERS
      ]}
      rowComponent={MultiQueryPeptideResultRow}
      firstIndex={firstIndex}
    />
  );
};

export default MultiQueryPeptideResultTable;
