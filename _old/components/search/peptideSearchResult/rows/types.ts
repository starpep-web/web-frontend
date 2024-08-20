import { Peptide } from '@lib/models/peptide';

export type RowProps<T extends Peptide> = T & {
  index: number
};
