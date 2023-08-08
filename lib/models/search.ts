import { SearchResultPeptide, MetadataLabel, NODE_LABELS } from '@lib/models/peptide';
import { FILTER_SEPARATOR } from '@lib/constants/search';

// Text Query (Filter)
export const SUPPORTED_OPERATORS = ['AND', 'OR', 'XOR'] as const;
export type FilterOperator = typeof SUPPORTED_OPERATORS[number];

export const SUPPORTED_METADATA_COMPARATORS = ['EQUALS', 'NOT_EQUALS'] as const;
export type MetadataFilterComparator = typeof SUPPORTED_METADATA_COMPARATORS[number];

export type TextQueryMetadataFilter = [FilterOperator, MetadataLabel, MetadataFilterComparator, string];

export const convertMetadataFilterToParam = (filter: TextQueryMetadataFilter): string => {
  return filter.join(FILTER_SEPARATOR);
};

export const parseParamToMetadataFilter = (filterParam: string): TextQueryMetadataFilter | null => {
  const arr = filterParam.split(FILTER_SEPARATOR);
  if (
    arr.length !== 4 ||
    !SUPPORTED_OPERATORS.includes(arr[0] as FilterOperator) ||
    (!NODE_LABELS.includes(arr[1] as MetadataLabel) && arr[1] !== 'Peptide') ||
    !SUPPORTED_METADATA_COMPARATORS.includes(arr[2] as MetadataFilterComparator)
  ) {
    return null;
  }

  return arr as TextQueryMetadataFilter;
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
