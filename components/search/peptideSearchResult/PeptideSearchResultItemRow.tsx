import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { Peptide } from '@lib/models/peptide';

interface Props extends Peptide {
  index: number
}

const PeptideSearchResultItemRow: React.FC<Props> = ({ index, id, sequence, length }) => {
  return (
    <tr>
      <th>
        {index}
      </th>
      <td>
        {id}
      </td>
      <td>
        <Link href={DYNAMIC_ROUTES.peptide(sequence)}>
          {sequence}
        </Link>
      </td>
      <td>
        {length}
      </td>
    </tr>
  );
};

export default PeptideSearchResultItemRow;
