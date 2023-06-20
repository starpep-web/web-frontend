import { Peptide, MetadataLabel, NODE_LABELS } from '@lib/models/peptide';
import { FILTER_SEPARATOR } from '@lib/constants/search';

// Text Query (Filter)
export const SUPPORTED_OPERATORS = ['AND', 'OR'] as const;
export type FilterOperator = typeof SUPPORTED_OPERATORS[number];

export const SUPPORTED_COMPARATORS = ['EQUALS', 'NOT_EQUALS', 'STARTS_WITH', 'NOT_STARTS_WITH', 'ENDS_WITH', 'NOT_ENDS_WITH', 'CONTAINS', 'NOT_CONTAINS'] as const;
export type FilterComparator = typeof SUPPORTED_COMPARATORS[number];

export type TextQueryFilter = [FilterOperator, MetadataLabel, FilterComparator, string];

export const convertFilterToParam = (filter: TextQueryFilter): string => {
  return filter.join(FILTER_SEPARATOR);
};

export const parseParamToFilter = (filterParam: string): TextQueryFilter | null => {
  const arr = filterParam.split(FILTER_SEPARATOR);
  if (
    arr.length !== 4 ||
    !SUPPORTED_OPERATORS.includes(arr[0] as FilterOperator) ||
    (!NODE_LABELS.includes(arr[1] as MetadataLabel) && arr[1] !== 'Peptide') ||
    !SUPPORTED_COMPARATORS.includes(arr[2] as FilterComparator)
  ) {
    return null;
  }

  return arr as TextQueryFilter;
};

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
