import { Peptide, MetadataLabel } from '@lib/models/peptide';

// Text Query (Filter)
export const SUPPORTED_OPERATORS = ['AND', 'OR'] as const;
export type FilterOperator = typeof SUPPORTED_OPERATORS[number];

export const SUPPORTED_COMPARATORS = ['EQUALS', 'NOT_EQUALS', 'STARTS_WITH', 'NOT_STARTS_WITH', 'ENDS_WITH', 'NOT_ENDS_WITH', 'CONTAINS', 'NOT_CONTAINS'] as const;
export type FilterComparator = typeof SUPPORTED_COMPARATORS[number];

export type TextQueryFilter = [FilterOperator, MetadataLabel, FilterComparator, string];

// Single Query
export interface SingleQueryAlignmentOptions {
  matrix: string
  alg: string
  threshold: number
  max_quantity: number | null
}

export type SingleAlignedPeptide = Peptide & {
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
