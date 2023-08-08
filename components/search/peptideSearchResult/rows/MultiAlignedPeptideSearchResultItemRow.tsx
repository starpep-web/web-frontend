import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { MultiAlignedPeptide } from '@lib/models/search';
import { RowProps } from './types';
import { formatNumberDecimals, formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS, PEPTIDE_SCORE_DECIMALS } from '@lib/constants/site';
import { ORDERED_ATTRIBUTE_NAMES } from '../shared';

const MultiAlignedPeptideSearchResultItemRow: React.FC<RowProps<MultiAlignedPeptide>> = ({
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
        <Link href={DYNAMIC_ROUTES.peptide(id)}>
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

export default MultiAlignedPeptideSearchResultItemRow;
