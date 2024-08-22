import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { SearchResultPeptide } from '@lib/models/peptide';
import { RowProps } from './types';
import { formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS } from '@lib/constants/site';
import { ORDERED_ATTRIBUTE_NAMES } from '../shared';

const PeptideSearchResultItemRow: React.FC<RowProps<SearchResultPeptide>> = ({ index, id, sequence, length, attributes }) => {
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

export default PeptideSearchResultItemRow;