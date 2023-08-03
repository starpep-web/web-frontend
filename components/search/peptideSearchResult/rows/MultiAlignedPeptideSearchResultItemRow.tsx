import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { MultiAlignedPeptide } from '@lib/models/search';
import { RowProps } from './types';
import { formatNumberDecimals } from '@lib/utils/number';

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
        {formatNumberDecimals(score, 2)}
      </td>
      <td>
        {formatNumberDecimals(avg_score, 2)}
      </td>
      <td>
        {formatNumberDecimals(max_score, 2)}
      </td>
      <td>
        {formatNumberDecimals(min_score, 2)}
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
