import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MetadataLabel } from '@lib/models/peptide';

export const metadataFilterIcons: Record<MetadataLabel, IconProp> = {
  Database: 'database',
  Function: 'atom',
  Origin: 'star-of-life',
  Target: 'bullseye',
  Cterminus: 'c',
  Nterminus: 'n',
  CrossRef: 'link-slash',
  UnusualAA: 'file-lines'
};
