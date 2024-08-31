import { SearchResultPeptide, MetadataLabel, NODE_LABELS, PeptideAttributes } from '@lib/models/peptide';
import { FILTER_SEPARATOR } from '@lib/constants/search';

// Text Query (Filter)
export type FiltersParams = {
  metadata: string[]
  attributes: string[]
  length: string
};

export const DEFAULT_FILTERS_PARAMS: FiltersParams = {
  metadata: [],
  attributes: [],
  length: ''
};


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
