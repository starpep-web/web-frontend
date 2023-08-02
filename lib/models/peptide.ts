/* eslint-disable no-unused-vars */
import assert from 'assert';
import { Integer } from 'neo4j-driver';

export const NODE_LABELS = ['Origin', 'Target', 'Peptide', 'CrossRef', 'Database', 'Function', 'Cterminus', 'Nterminus', 'UnusualAA', 'Attributes'] as const;
export type NodeLabel = typeof NODE_LABELS[number];

export const RAW_RELATIONSHIP_LABELS = ['assessed_against', 'compiled_in', 'constituted_by', 'is_a', 'linked_to', 'modified_by', 'produced_by', 'related_to', 'characterized_by'] as const;
export type RawRelationshipLabel = typeof RAW_RELATIONSHIP_LABELS[number];

export const RELATIONSHIP_LABELS = ['assessedAgainst', 'compiledIn', 'constitutedBy', 'isA', 'linkedTo', 'modifiedBy', 'producedBy', 'relatedTo', 'characterizedBy'] as const;
export type RelationshipLabel = typeof RELATIONSHIP_LABELS[number];

export const FRIENDLY_RELATIONSHIP_LABELS = ['Assessed Against', 'Compiled In', 'Constituted By', 'Is A', 'Linked To', 'Modified By', 'Produced By', 'Related To', 'Characterized By'] as const;
export type FriendlyRelationshipLabel = typeof FRIENDLY_RELATIONSHIP_LABELS[number];

assert.strictEqual(RAW_RELATIONSHIP_LABELS.length, RELATIONSHIP_LABELS.length); // Ensure both RAW_RELATIONSHIP_LABELS and RELATIONSHIP_LABELS are same size.
assert.strictEqual(RAW_RELATIONSHIP_LABELS.length, FRIENDLY_RELATIONSHIP_LABELS.length); // Ensure both RAW_RELATIONSHIP_LABELS and FRIENDLY_RELATIONSHIP_LABELS are same size.

export const RELATIONSHIP_LABEL_MAP = RAW_RELATIONSHIP_LABELS.reduce((acc, raw, idx) => {
  return {
    ...acc,
    [raw]: RELATIONSHIP_LABELS[idx]
  };
}, {} as Record<RawRelationshipLabel, RelationshipLabel>);
export const getRelationshipLabelFromRaw = (relationship: RawRelationshipLabel): RelationshipLabel => {
  return RELATIONSHIP_LABEL_MAP[relationship];
};

export const FRIENDLY_RELATIONSHIP_LABEL_MAP = RELATIONSHIP_LABELS.reduce((acc, raw, idx) => {
  return {
    ...acc,
    [raw]: FRIENDLY_RELATIONSHIP_LABELS[idx]
  };
}, {} as Record<RelationshipLabel, FriendlyRelationshipLabel>);
export const getFriendlyRelationshipLabel = (relationship: RelationshipLabel): FriendlyRelationshipLabel => {
  return FRIENDLY_RELATIONSHIP_LABEL_MAP[relationship];
};

export type MetadataLabel = Exclude<NodeLabel, 'Peptide' | 'Attributes'>;
export type MetadataRelationshipLabel = Exclude<RelationshipLabel, 'characterizedBy'>;

export type Peptide = {
  id: string
  sequence: string
  length: number
}

export type PeptideMetadata = {
  [K in MetadataRelationshipLabel]?: string[]
}

export type Neo4jPeptideAttributesProperties = {
  hydropathicity: number
  charge: Integer
  isoelectric_point: number
  boman_index: number
  gaac_alphatic: number
  gaac_aromatic: number
  gaac_postive_charge: number
  gaac_negative_charge: number
  gaac_uncharge: number
  hydrophobicity: number
  solvation: number
  amphiphilicity: number
  hydrophilicity: number
  hemolytic_prob_score: number
  steric_hindrance: number
  net_hydrogen: Integer
  mol_wt: number
  aliphatic_index: number
};

export type SearchPeptideAttributes = {
  hydropathicity: number
  charge: number
  isoelectricPoint: number
  bomanIndex: number
  gaacAlphatic: number
  gaacAromatic: number
  gaacPostiveCharge: number
  gaacNegativeCharge: number
  gaacUncharge: number
};

export type StatisticalPeptideAttributes = SearchPeptideAttributes & {
  hydrophobicity: number
  solvation: number
  amphiphilicity: number
  hydrophilicity: number
};

export type OtherPeptideAttributes = {
  hemolyticProbScore: number
  stericHindrance: number
  netHydrogen: number
  molWt: number
  aliphaticIndex: number
}

export type FullPeptideAttributes = StatisticalPeptideAttributes & OtherPeptideAttributes;

export type SearchResultPeptide = Peptide & {
  attributes: SearchPeptideAttributes
};

export type FullPeptide = Peptide & {
  metadata: PeptideMetadata
  attributes: FullPeptideAttributes
};

export const ID_PREFIX = 'starPep_';
export const ID_LENGTH = 5;

export const getPeptideId = (identifier: number) => {
  const formattedNumber = identifier.toLocaleString('en-US', {
    minimumIntegerDigits: ID_LENGTH,
    useGrouping: false
  });

  return `${ID_PREFIX}${formattedNumber}`;
};

export const extractIdentityFromId = (id: string): string | null => {
  const identity = id.slice(ID_PREFIX.length);
  return identity.match(/^\d{5}$/) ? identity : null;
};
