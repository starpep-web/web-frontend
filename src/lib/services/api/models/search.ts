import { PeptideMetadata, RawAttributeName } from '@lib/services/api/models/peptide';

const SUPPORTED_OPERATORS = ['AND', 'OR', 'XOR'] as const;
export type FilterOperator = typeof SUPPORTED_OPERATORS[number];

const SUPPORTED_METADATA_COMPARATORS = ['EQUALS', 'NOT_EQUALS'] as const;
export type MetadataFilterComparator = typeof SUPPORTED_METADATA_COMPARATORS[number];

const SUPPORTED_ATTRIBUTE_COMPARATORS = ['<', '<=', '>', '>='] as const;
export type AttributeFilterComparator = typeof SUPPORTED_ATTRIBUTE_COMPARATORS[number];

export type TextQueryMetadataFilter = [FilterOperator, keyof PeptideMetadata, MetadataFilterComparator, string];
export type TextQueryAttributeFilter = [FilterOperator, RawAttributeName, AttributeFilterComparator, number];
export type SequenceLengthFilter = [number, number];

export type TextQueryFiltersObject = {
  metadata?: TextQueryMetadataFilter[]
  attributes?: TextQueryAttributeFilter[]
  length?: SequenceLengthFilter
};

export type TextQueryRequestPayload = {
  sequence?: string
  regex?: string
  metadata?: string[]
  attributes?: string[]
  length?: string
};
