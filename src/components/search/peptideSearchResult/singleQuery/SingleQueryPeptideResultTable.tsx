import React from 'react';
import { SingleAlignedPeptide } from '@lib/services/bioApi/models/peptide';
import { GenericPeptideSearchResult } from '../shared/GenericPeptideSearchResult';
import { SingleQueryPeptideResultRow } from './SingleQueryPeptideResultRow';
import { ORDERED_ATTRIBUTE_HEADERS } from '../shared/helpers';

interface Props {
  peptides: SingleAlignedPeptide[]
  firstIndex: number
}

export const SingleQueryPeptideResultTable: React.FC<Props> = ({ peptides, firstIndex }) => {
  return (
    <GenericPeptideSearchResult
      peptides={peptides}
      headers={[
        '#',
        'ID',
        'Score',
        'Sequence',
        'Length',
        ...ORDERED_ATTRIBUTE_HEADERS
      ]}
      rowComponent={SingleQueryPeptideResultRow}
      firstIndex={firstIndex}
    />
  );
};
