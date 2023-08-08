import { SearchResultPeptide, MetadataLabel, NODE_LABELS, PeptideAttributes } from '@lib/models/peptide';
import { FILTER_SEPARATOR } from '@lib/constants/search';

// Text Query (Filter)
export const SUPPORTED_OPERATORS = ['AND', 'OR', 'XOR'] as const;
export type FilterOperator = typeof SUPPORTED_OPERATORS[number];

export const SUPPORTED_METADATA_COMPARATORS = ['EQUALS', 'NOT_EQUALS'] as const;
export type MetadataFilterComparator = typeof SUPPORTED_METADATA_COMPARATORS[number];

export const SUPPORTED_ATTRIBUTE_COMPARATORS = ['<', '<=', '>', '>='] as const;
export type AttributeFilterComparator = typeof SUPPORTED_ATTRIBUTE_COMPARATORS[number];

export type TextQueryMetadataFilter = [FilterOperator, MetadataLabel, MetadataFilterComparator, string];
export type TextQueryAttributeFilter = [FilterOperator, PeptideAttributes.RawPropertyName, AttributeFilterComparator, number];
export type SequenceLengthFilter = [number, number];

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

export type FiltersObject = {
  metadata?: TextQueryMetadataFilter[]
  attributes?: TextQueryAttributeFilter[]
  length?: SequenceLengthFilter
};

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

export const convertAttributeFilterToParam = (filter: TextQueryAttributeFilter): string => {
  return filter.join(FILTER_SEPARATOR);
};

export const parseParamToAttributeFilter = (filterParam: string): TextQueryAttributeFilter | null => {
  const arr = filterParam.split(FILTER_SEPARATOR);

  if (arr.length !== 4) {
    return null;
  }

  const filterValue = parseFloat(arr[3]);

  if (
    !SUPPORTED_OPERATORS.includes(arr[0] as FilterOperator) ||
    !PeptideAttributes.isRawPropertyValid(arr[1]) ||
    !SUPPORTED_ATTRIBUTE_COMPARATORS.includes(arr[2] as AttributeFilterComparator) ||
    Number.isNaN(filterValue)
  ) {
    return null;
  }

  return [arr[0], arr[1], arr[2], filterValue] as TextQueryAttributeFilter;
};

export const convertSequenceLengthFilterToParam = (filter: SequenceLengthFilter): string => {
  return filter.join(FILTER_SEPARATOR);
};

export const parseParamToSequenceLengthFilter = (filterParam: string): SequenceLengthFilter | null => {
  const arr = filterParam.split(FILTER_SEPARATOR);

  if (arr.length !== 2) {
    return null;
  }

  const min = parseInt(arr[0], 10);
  const max = parseInt(arr[1], 10);

  if (Number.isNaN(min) || Number.isNaN(max)) {
    return null;
  }

  return [min, max];
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
