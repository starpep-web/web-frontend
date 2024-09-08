import { SearchResultPeptide, MetadataLabel, NODE_LABELS, PeptideAttributes } from '@lib/models/peptide';
import { FILTER_SEPARATOR } from '@lib/constants/search';

// Single Query
export interface SingleQueryAlignmentOptions {
  matrix: string
  alg: string
  threshold: number
  max_quantity: number | null
}


// Multi Query
export interface MultiQueryAlignmentOptions extends SingleQueryAlignmentOptions {
  criterion: string
}

