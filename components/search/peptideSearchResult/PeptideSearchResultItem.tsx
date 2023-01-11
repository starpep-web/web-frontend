import React from 'react';
import Link from 'next/link';
import { Block } from 'react-bulma-components';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

interface Props {
  peptide: string
}

const PeptideSearchResultItem: React.FC<Props> = ({ peptide }) => {
  return (
    <Block>
      <Link href={DYNAMIC_ROUTES.peptide(peptide)}>
        {peptide}
      </Link>
    </Block>
  );
};

export default PeptideSearchResultItem;
