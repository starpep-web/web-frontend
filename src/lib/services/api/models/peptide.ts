export type PeptideMetadata = {
  assessedAgainst?: string[],
  compiledIn?: string[],
  constitutedBy?: string[],
  isA?: string[],
  linkedTo?: string[],
  modifiedBy?: string[],
  producedBy?: string[],
  relatedTo?: string[]
};

export type RawMetadataLabel = 'Origin' | 'Target' | 'CrossRef' | 'Database' | 'Function' | 'Cterminus' | 'Nterminus' | 'UnusualAA';

export type PeptideSearchAttributes = {
  hydropathicity: number
  charge: number
  isoelectricPoint: number
  bomanIndex: number
  gaacAlphatic: number
  gaacAromatic: number
  gaacPositiveCharge: number
  gaacNegativeCharge: number
  gaacUncharge: number
};

export type PeptideStatisticalAttributes = PeptideSearchAttributes & {
  hydrophobicity: number
  solvation: number
  amphiphilicity: number
  hydrophilicity: number
};

export type PeptideOtherAttributes = {
  hemolyticProbScore: number
  stericHindrance: number
  netHydrogen: number
  molWt: number
  aliphaticIndex: number
};

export type PeptideFullAttributes = PeptideStatisticalAttributes & PeptideOtherAttributes;
export type AttributeName = keyof PeptideFullAttributes;

export type RawAttributeName = 'hydropathicity' | 'charge' | 'isoelectric_point' | 'boman_index' | 'gaac_alphatic' | 'gaac_aromatic' | 'gaac_positive_charge' |
  'gaac_negative_charge' | 'gaac_uncharge' | 'hydrophobicity' | 'solvation' | 'amphiphilicity' | 'hydrophilicity' | 'hemolytic_prob_score' | 'steric_hindrance' |
  'net_hydrogen' | 'mol_wt' | 'aliphatic_index';

export type BasePeptide = {
  id: string
  sequence: string
  length: number
};

export type SearchPeptide = BasePeptide & {
  attributes: PeptideSearchAttributes
};

export type Peptide = BasePeptide & {
  metadata: PeptideMetadata
  attributes: PeptideFullAttributes
};
