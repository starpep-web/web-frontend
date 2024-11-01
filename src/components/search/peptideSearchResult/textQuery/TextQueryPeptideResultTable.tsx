import React from 'react';
import { SearchPeptide } from '@lib/services/api/models/peptide';
import { TextQueryPeptideResultRow } from './TextQueryPeptideResultRow';
import { GenericPeptideSearchResult } from '../shared/GenericPeptideSearchResult';
import { ORDERED_ATTRIBUTE_HEADERS } from '../shared/helpers';

interface Props {
  peptides: SearchPeptide[]
  firstIndex: number
}

export const TextQueryPeptideResultTable: React.FC<Props> = ({ peptides, firstIndex }) => {
  return (
    <GenericPeptideSearchResult
      peptides={peptides}
      headers={[
        '#',
        'ID',
        'Sequence',
        'Length',
        ...ORDERED_ATTRIBUTE_HEADERS
      ]}
      rowComponent={TextQueryPeptideResultRow}
      firstIndex={firstIndex}
    />
  );
};
