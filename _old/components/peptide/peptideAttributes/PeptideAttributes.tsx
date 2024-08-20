import React from 'react';
import { Block, Notification, Heading } from 'react-bulma-components';
import { PeptideAttributes as PeptideAttributesNS } from '@lib/models/peptide';
import { formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS } from '@lib/constants/site';

const ORDERED_ATTRIBUTES: PeptideAttributesNS.AttributeName[] = [
  'hemolyticProbScore',
  'hydrophobicity',
  'stericHindrance',
  'solvation',
  'hydropathicity',
  'amphiphilicity',
  'hydrophilicity',
  'netHydrogen',
  'charge',
  'isoelectricPoint',
  'molWt',
  'aliphaticIndex',
  'bomanIndex',
  'gaacAlphatic',
  'gaacAromatic',
  'gaacPositiveCharge',
  'gaacNegativeCharge',
  'gaacUncharge'
];

interface Props {
  attributes: PeptideAttributesNS.FullAttributes
}

const PeptideAttributes: React.FC<Props> = ({ attributes }) => {
  return (
    <Block>
      <Notification color="gray">
        <Heading size={3}>
          Peptide Attributes
        </Heading>

        <Block>
          {
            ORDERED_ATTRIBUTES.map((attributeName) => (
              <p key={attributeName}>
                <strong>{PeptideAttributesNS.getFriendlyNameForAttribute(attributeName)}: </strong>
                {formatNumberMaxDecimals(attributes[attributeName], PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
              </p>
            ))
          }
        </Block>
      </Notification>
    </Block>
  );
};

export default PeptideAttributes;
