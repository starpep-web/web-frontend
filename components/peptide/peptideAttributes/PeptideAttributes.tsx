import React from 'react';
import { Block, Notification, Heading } from 'react-bulma-components';
import { FullPeptideAttributes } from '@lib/models/peptide';

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
            <strong>Hemolytic PROB Score: </strong> {hemolyticProbScore}
          </p>
          <p>
            <strong>Hydrophobicity: </strong> {hydrophobicity}
          </p>
          <p>
            <strong>Steric Hindrance: </strong> {stericHindrance}
          </p>
          <p>
            <strong>Solvation: </strong> {solvation}
          </p>
          <p>
            <strong>Hydropathicity: </strong> {hydropathicity}
          </p>
          <p>
            <strong>Amphilicity: </strong> {amphiphilicity}
          </p>
          <p>
            <strong>Hydrophilicity: </strong> {hydrophilicity}
          </p>
          <p>
            <strong>Net Hydrogen: </strong> {netHydrogen}
          </p>
          <p>
            <strong>Charge: </strong> {charge}
          </p>
          <p>
            <strong>Isoelectric Point: </strong> {isoelectricPoint}
          </p>
          <p>
            <strong>Molar Weight: </strong> {molWt}
          </p>
          <p>
            <strong>Aliphatic Index: </strong> {aliphaticIndex}
          </p>
          <p>
            <strong>Boman Index: </strong> {bomanIndex}
          </p>
          <p>
            <strong>GAAC - Alphatic: </strong> {gaacAlphatic}
          </p>
          <p>
            <strong>GAAC - Aromatic: </strong> {gaacAromatic}
          </p>
          <p>
            <strong>GAAC - Positive Charge: </strong> {gaacPostiveCharge}
          </p>
          <p>
            <strong>GAAC - Negative Charge: </strong> {gaacNegativeCharge}
          </p>
          <p>
            <strong>GAAC - Uncharge: </strong> {gaacUncharge}
          </p>
        </Block>
      </Notification>
    </Block>
  );
};

export default PeptideAttributes;
