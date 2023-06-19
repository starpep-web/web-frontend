import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { Peptide } from '@lib/models/peptide';
import { RowProps } from './types';

const PeptideSearchResultItemRow: React.FC<RowProps<Peptide>> = ({ index, id, sequence, length }) => {
  return (
    <tr>
      <th>
        {index}
      </th>
      <td>
        <Link href={DYNAMIC_ROUTES.peptide(id)}>
          {id}
        </Link>
      </td>
      <td>
        {sequence}
      </td>
      <td>
        {length}
      </td>
    </tr>
  );
};

export default PeptideSearchResultItemRow;
