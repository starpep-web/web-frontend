import { RawAttributeName } from '@lib/services/api/models/peptide';

const RAW_ATTRIBUTE_TO_FRIENDLY_NAME_MAP: Record<RawAttributeName, string> = {
  hydropathicity: 'Hydropathicity',
  charge: 'Charge',
  isoelectric_point: 'Isoelectric Point',
  boman_index: 'Boman Index',
  gaac_alphatic: 'GAAC - Alphatic',
  gaac_aromatic: 'GAAC - Aromatic',
  gaac_positive_charge: 'GAAC - Positive Charge',
  gaac_negative_charge: 'GAAC - Negative Charge',
  gaac_uncharge: 'GAAC - Uncharge',
  hydrophobicity: 'Hydrophobicity',
  solvation: 'Solvation',
  amphiphilicity: 'Amphiphilicity',
  hydrophilicity: 'Hydrophilicity',
  hemolytic_prob_score: 'Hemolytic Prob Score',
  steric_hindrance: 'Steric Hindrance',
  net_hydrogen: 'Net Hydrogen',
  mol_wt: 'Molar Weight',
  aliphatic_index: 'Aliphatic Index'
};

export const getFriendlyNameForRawAttribute = (attribute: RawAttributeName): string => {
  return RAW_ATTRIBUTE_TO_FRIENDLY_NAME_MAP[attribute];
};
