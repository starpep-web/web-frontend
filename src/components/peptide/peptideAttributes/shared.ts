import { PeptideFullAttributes } from '@lib/services/api/models/peptide';

type AttributeName = keyof PeptideFullAttributes;

export const ORDERED_ATTRIBUTES: AttributeName[] = [
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

const ATTRIBUTE_FRIENDLY_NAME_MAP: Record<AttributeName, string> = {
  hydropathicity: 'Hydropathicity',
  charge: 'Charge',
  isoelectricPoint: 'Isoelectric Point',
  bomanIndex: 'Boman Index',
  gaacAlphatic: 'GAAC - Alphatic',
  gaacAromatic: 'GAAC - Aromatic',
  gaacPositiveCharge: 'GAAC - Positive Charge',
  gaacNegativeCharge: 'GAAC - Negative Charge',
  gaacUncharge: 'GAAC - Uncharge',
  hydrophobicity: 'Hydrophobicity',
  solvation: 'Solvation',
  amphiphilicity: 'Amphiphilicity',
  hydrophilicity: 'Hydrophilicity',
  hemolyticProbScore: 'Hemolytic Prob Score',
  stericHindrance: 'Steric Hindrance',
  netHydrogen: 'Net Hydrogen',
  molWt: 'Molar Weight',
  aliphaticIndex: 'Aliphatic Index'
};

export const getFriendlyNameForAttribute = (attributeName: AttributeName): string => {
  return ATTRIBUTE_FRIENDLY_NAME_MAP[attributeName];
};
