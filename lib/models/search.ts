import { Peptide } from '@lib/models/peptide';

export interface SingleQueryAlignmentOptions {
  matrix: string
  alg: string
  threshold: number
  max_quantity: number | null
}

export type SingleAlignedPeptide = Peptide & {
  score: number
}

export interface MultiQueryAlignmentOptions extends SingleQueryAlignmentOptions {
  criterion: string
}

export type MultiAlignedPeptide = SingleAlignedPeptide & {
  avg_score: number
  max_score: number
  min_score: number
}
