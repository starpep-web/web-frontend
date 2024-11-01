import { PeptideMetadata } from '@lib/services/api/models/peptide';

export type MetadataLabel = keyof PeptideMetadata;

const METADATA_FRIENDLY_NAME_MAP: Record<MetadataLabel, string> = {
  assessedAgainst: 'Assessed Against',
  compiledIn: 'Compiled In',
  constitutedBy: 'Constituted By',
  isA: 'Is A',
  linkedTo: 'Linked To',
  modifiedBy: 'Modified By',
  producedBy: 'Produced By',
  relatedTo: 'Related To'
};
export const getFriendlyMetadataName = (metadata: MetadataLabel): string => {
  return METADATA_FRIENDLY_NAME_MAP[metadata]!;
};
