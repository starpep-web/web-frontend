import React from 'react';
import Link from 'next/link';
import { Block } from 'react-bulma-components';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { Peptide } from '@lib/models/peptide';

interface Props extends Peptide {
  index: number
}

const PeptideSearchResultItem: React.FC<Props> = ({ sequence, index }) => {
  return (
    <Block>
      <span style={{ marginRight: '0.5rem' }}>
        {index}.
      </span>

      <Link href={DYNAMIC_ROUTES.peptide(sequence)}>
        {sequence}
      </Link>
    </Block>
  );
};

export default PeptideSearchResultItem;
