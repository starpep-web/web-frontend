import { SearchPeptide } from '@lib/services/api/models/peptide';

export type SingleAlignedPeptide = SearchPeptide & {
  score: number
};

export type MultiAlignedPeptide = SingleAlignedPeptide & {
  avg_score: number
  max_score: number
  min_score: number
};
