import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { SingleAlignedPeptide } from '@lib/models/search';
import { RowProps } from './types';

const SingleAlignedPeptideSearchResultItemRow: React.FC<RowProps<SingleAlignedPeptide>> = ({ index, id, sequence, length, score }) => {
  return (
    <tr>
      <th>
        {index}
      </th>
      <td>
        {id}
      </td>
      <td>
        {score.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}
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

export default SingleAlignedPeptideSearchResultItemRow;
