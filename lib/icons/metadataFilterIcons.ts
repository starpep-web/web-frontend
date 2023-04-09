import { FrequencyFilterType } from '@lib/services/graphDb/statisticsService';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const metadataFilterIcons: Record<FrequencyFilterType, IconProp> = {
  Database: 'database',
  Function: 'atom',
  Origin: 'star-of-life',
  Target: 'bullseye',
  Cterminus: 'c',
  Nterminus: 'n',
  CrossRef: 'link-slash',
  UnusualAA: 'file-lines'
};
