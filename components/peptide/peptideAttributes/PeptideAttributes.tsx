import React from 'react';
import { Block, Notification, Heading } from 'react-bulma-components';
import { FullPeptideAttributes } from '@lib/models/peptide';
import { formatNumberMaxDecimals } from '@lib/utils/number';
import { PEPTIDE_ATTRIBUTE_MAX_DECIMALS } from '@lib/constants/site';

interface Props extends FullPeptideAttributes {

}

const PeptideAttributes: React.FC<Props> = ({
  hemolyticProbScore,
  hydrophobicity,
  stericHindrance,
  solvation,
  hydropathicity,
  amphiphilicity,
  hydrophilicity,
  netHydrogen,
  charge,
  isoelectricPoint,
  molWt,
  aliphaticIndex,
  bomanIndex,
  gaacAlphatic,
  gaacAromatic,
  gaacPostiveCharge,
  gaacNegativeCharge,
  gaacUncharge
}) => {
  return (
    <Block>
      <Notification color="gray">
        <Heading size={3}>
          Peptide Attributes
        </Heading>

        <Block>
          <p>
            <strong>Hemolytic PROB Score: </strong> {formatNumberMaxDecimals(hemolyticProbScore, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Hydrophobicity: </strong> {formatNumberMaxDecimals(hydrophobicity, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Steric Hindrance: </strong> {formatNumberMaxDecimals(stericHindrance, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Solvation: </strong> {formatNumberMaxDecimals(solvation, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Hydropathicity: </strong> {formatNumberMaxDecimals(hydropathicity, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Amphilicity: </strong> {formatNumberMaxDecimals(amphiphilicity, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Hydrophilicity: </strong> {formatNumberMaxDecimals(hydrophilicity, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Net Hydrogen: </strong> {formatNumberMaxDecimals(netHydrogen, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Charge: </strong> {formatNumberMaxDecimals(charge, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Isoelectric Point: </strong> {formatNumberMaxDecimals(isoelectricPoint, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Molar Weight: </strong> {formatNumberMaxDecimals(molWt, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Aliphatic Index: </strong> {formatNumberMaxDecimals(aliphaticIndex, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>Boman Index: </strong> {formatNumberMaxDecimals(bomanIndex, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>GAAC - Alphatic: </strong> {formatNumberMaxDecimals(gaacAlphatic, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>GAAC - Aromatic: </strong> {formatNumberMaxDecimals(gaacAromatic, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>GAAC - Positive Charge: </strong> {formatNumberMaxDecimals(gaacPostiveCharge, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>GAAC - Negative Charge: </strong> {formatNumberMaxDecimals(gaacNegativeCharge, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
          <p>
            <strong>GAAC - Uncharge: </strong> {formatNumberMaxDecimals(gaacUncharge, PEPTIDE_ATTRIBUTE_MAX_DECIMALS)}
          </p>
        </Block>
      </Notification>
    </Block>
  );
};

export default PeptideAttributes;
