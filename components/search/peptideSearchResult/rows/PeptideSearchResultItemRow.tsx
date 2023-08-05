import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { SearchResultPeptide } from '@lib/models/peptide';
import { RowProps } from './types';
import { formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS } from '@lib/constants/site';

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
      <td>
        {formatNumberMaxDecimals(attributes.hydropathicity, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
      <td>
        {formatNumberMaxDecimals(attributes.charge, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
      <td>
        {formatNumberMaxDecimals(attributes.isoelectricPoint, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
      <td>
        {formatNumberMaxDecimals(attributes.bomanIndex, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
      <td>
        {formatNumberMaxDecimals(attributes.gaacAlphatic, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
      <td>
        {formatNumberMaxDecimals(attributes.gaacAromatic, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
      <td>
        {formatNumberMaxDecimals(attributes.gaacPostiveCharge, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
      <td>
        {formatNumberMaxDecimals(attributes.gaacNegativeCharge, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
      <td>
        {formatNumberMaxDecimals(attributes.gaacUncharge, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
      </td>
    </tr>
  );
};

export default PeptideSearchResultItemRow;
