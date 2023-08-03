import React from 'react';
import Link from 'next/link';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { SearchResultPeptide } from '@lib/models/peptide';
import { RowProps } from './types';

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
        {attributes.hydropathicity}
      </td>
      <td>
        {attributes.charge}
      </td>
      <td>
        {attributes.isoelectricPoint}
      </td>
      <td>
        {attributes.bomanIndex}
      </td>
      <td>
        {attributes.gaacAlphatic}
      </td>
      <td>
        {attributes.gaacAromatic}
      </td>
      <td>
        {attributes.gaacPostiveCharge}
      </td>
      <td>
        {attributes.gaacNegativeCharge}
      </td>
      <td>
        {attributes.gaacUncharge}
      </td>
    </tr>
  );
};

export default PeptideSearchResultItemRow;
