import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { MultiAlignedPeptide } from '@lib/models/search';
import { RowProps } from './types';

const MultiAlignedPeptideSearchResultItemRow: React.FC<RowProps<MultiAlignedPeptide>> = ({
  index,
  id,
  sequence,
  length,
  score,
  avg_score,
  min_score,
  max_score
}) => {
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
        {score.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}
      </td>
      <td>
        {avg_score.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}
      </td>
      <td>
        {max_score.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}
      </td>
      <td>
        {min_score.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}
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

export default MultiAlignedPeptideSearchResultItemRow;
