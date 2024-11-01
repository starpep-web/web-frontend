import { SearchPeptide } from '@lib/services/api/models/peptide';

export type RowProps<T extends SearchPeptide> = T & {
  index: number
};
