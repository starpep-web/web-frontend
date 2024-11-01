import React from 'react';
import Link from 'next/link';
import { RouteDefs } from '@lib/constants/routes';
import { SearchPeptide } from '@lib/services/api/models/peptide';
import { formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS } from '@lib/constants/app';
import { RowProps } from '../shared/types';
import { ORDERED_ATTRIBUTE_NAMES } from '../shared/helpers';

export const TextQueryPeptideResultRow: React.FC<RowProps<SearchPeptide>> = ({ index, id, sequence, length, attributes }) => {
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
