import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { PeptideFullAttributes } from '@lib/services/api/models/peptide';
import { formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS } from '@lib/constants/app';
import { ORDERED_ATTRIBUTES, getFriendlyNameForAttribute } from './shared';

interface Props {
  attributes: PeptideFullAttributes
}

export const PeptideAttributes: React.FC<Props> = ({ attributes }) => {
  return (
    <div>
      <Alert variant="secondary">
        <h2 className="mb-4">
          Peptide Attributes
        </h2>

        <div>
          {
            ORDERED_ATTRIBUTES.map((attributeName) => (
              <p key={attributeName} className="mb-0">
                <strong>{getFriendlyNameForAttribute(attributeName)}: </strong>
                {formatNumberMaxDecimals(attributes[attributeName], PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
              </p>
            ))
          }
        </div>
      </Alert>
    </div>
  );
};

export default PeptideAttributes;
