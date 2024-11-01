import React from 'react';
import Link from 'next/link';
import { RouteDefs } from '@lib/constants/routes';
import { MultiAlignedPeptide } from '@lib/services/bioApi/models/peptide';
import { formatNumberDecimals, formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS, PEPTIDE_SCORE_DECIMALS } from '@lib/constants/app';
import { RowProps } from '../shared/types';
import { ORDERED_ATTRIBUTE_NAMES } from '../shared/helpers';

export const MultiQueryPeptideResultRow: React.FC<RowProps<MultiAlignedPeptide>> = ({
  index,
  id,
  sequence,
  length,
  score,
  avg_score,
  min_score,
  max_score,
  attributes
}) => {
  return (
    <tr>
      <th>
        {index}
      </th>
      <td>
        <Link href={RouteDefs.peptide(id)}>
          {id}
        </Link>
      </td>
      <td>
        {formatNumberDecimals(score, PEPTIDE_SCORE_DECIMALS)}
      </td>
      <td>
        {formatNumberDecimals(avg_score, PEPTIDE_SCORE_DECIMALS)}
      </td>
      <td>
        {formatNumberDecimals(max_score, PEPTIDE_SCORE_DECIMALS)}
      </td>
      <td>
        {formatNumberDecimals(min_score, PEPTIDE_SCORE_DECIMALS)}
      </td>
      <td>
        {sequence}
      </td>
      <td>
        {length}
      </td>

      {
        ORDERED_ATTRIBUTE_NAMES.map((attributeName) => (
          <td key={attributeName}>
            {formatNumberMaxDecimals(attributes[attributeName], PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </td>
        ))
      }
    </tr>
  );
};
