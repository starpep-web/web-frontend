import { RawAttributeName, RawMetadataLabel } from '@lib/services/api/models/peptide';

const FILTER_SEPARATOR = ';';

const SUPPORTED_OPERATORS = ['AND', 'OR', 'XOR'] as const;
export type FilterOperator = typeof SUPPORTED_OPERATORS[number];

const SUPPORTED_METADATA_COMPARATORS = ['EQUALS', 'NOT_EQUALS'] as const;
export type MetadataFilterComparator = typeof SUPPORTED_METADATA_COMPARATORS[number];

const SUPPORTED_ATTRIBUTE_COMPARATORS = ['<', '<=', '>', '>='] as const;
export type AttributeFilterComparator = typeof SUPPORTED_ATTRIBUTE_COMPARATORS[number];

export type TextQueryMetadataFilter = [FilterOperator, RawMetadataLabel, MetadataFilterComparator, string];
export type TextQueryAttributeFilter = [FilterOperator, RawAttributeName, AttributeFilterComparator, number];
export type SequenceLengthFilter = [number, number];

export type TextQueryFilterParams = {
  metadata?: string[]
  attributes?: string[]
  length?: string
};

export type TextQueryRequestPayload = TextQueryFilterParams & {
  sequence?: string
  regex?: string
};

export const DEFAULT_FILTERS_PARAMS: TextQueryFilterParams = {
  metadata: [],
  attributes: [],
  length: ''
};

export const convertMetadataFilterToParam = (filter: TextQueryMetadataFilter): string => {
  return filter.join(FILTER_SEPARATOR);
};

export const convertAttributeFilterToParam = (filter: TextQueryAttributeFilter): string => {
  return filter.join(FILTER_SEPARATOR);
};

export const convertSequenceLengthFilterToParam = (filter: SequenceLengthFilter): string => {
  return filter.join(FILTER_SEPARATOR);
};
