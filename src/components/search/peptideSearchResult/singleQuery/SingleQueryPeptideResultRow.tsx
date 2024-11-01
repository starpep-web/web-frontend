import React from 'react';
import Link from 'next/link';
import { RouteDefs } from '@lib/constants/routes';
import { SingleAlignedPeptide } from '@lib/services/bioApi/models/peptide';
import { formatNumberDecimals, formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS, PEPTIDE_SCORE_DECIMALS } from '@lib/constants/app';
import { RowProps } from '../shared/types';
import { ORDERED_ATTRIBUTE_NAMES } from '../shared/helpers';

export const SingleQueryPeptideResultRow: React.FC<RowProps<SingleAlignedPeptide>> = ({ index, id, sequence, length, score, attributes }) => {
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
