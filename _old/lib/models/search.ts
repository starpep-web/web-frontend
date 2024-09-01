import { SearchResultPeptide, MetadataLabel, NODE_LABELS, PeptideAttributes } from '@lib/models/peptide';
import { FILTER_SEPARATOR } from '@lib/constants/search';

// Single Query
export interface SingleQueryAlignmentOptions {
  matrix: string
  alg: string
  threshold: number
  max_quantity: number | null
}

export type SingleAlignedPeptide = SearchResultPeptide & {
  score: number
}

// Multi Query
export interface MultiQueryAlignmentOptions extends SingleQueryAlignmentOptions {
  criterion: string
}

export type MultiAlignedPeptide = SingleAlignedPeptide & {
  avg_score: number
  max_score: number
  min_score: number
}
