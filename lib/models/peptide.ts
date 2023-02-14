/* eslint-disable no-unused-vars */
import assert from 'assert';

export const NODE_LABELS = ['Origin', 'Target', 'Peptide', 'CrossRef', 'Database', 'Function', 'Cterminus', 'Nterminus', 'UnusualAA'] as const;
export type NodeLabel = typeof NODE_LABELS[number];

export const RAW_RELATIONSHIP_LABELS = ['assessed_against', 'compiled_in', 'constituted_by', 'is_a', 'linked_to', 'modified_by', 'produced_by', 'related_to'] as const;
export type RawRelationshipLabel = typeof RAW_RELATIONSHIP_LABELS[number];

export const RELATIONSHIP_LABELS = ['assessedAgainst', 'compiledIn', 'constitutedBy', 'isA', 'linkedTo', 'modifiedBy', 'producedBy', 'relatedTo'] as const;
export type RelationshipLabel = typeof RELATIONSHIP_LABELS[number];

assert.strictEqual(RAW_RELATIONSHIP_LABELS.length, RELATIONSHIP_LABELS.length); // Ensure both RAW_RELATIONSHIP_LABELS and RELATIONSHIP_LABELS are same size.

export const RELATIONSHIP_LABEL_MAP = RAW_RELATIONSHIP_LABELS.reduce((acc, raw, idx) => {
  return {
    ...acc,
    [raw]: RELATIONSHIP_LABELS[idx]
  };
}, {} as Record<RawRelationshipLabel, RelationshipLabel>);
export const getRelationshipLabelFromRaw = (relationship: RawRelationshipLabel): RelationshipLabel => {
  return RELATIONSHIP_LABEL_MAP[relationship];
};

export type Peptide = {
  sequence: string
}

export type PeptideMetadata = {
  [K in RelationshipLabel]?: string[]
}

export type FullPeptide = Peptide & {
  metadata: PeptideMetadata
}
