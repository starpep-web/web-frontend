import { SingleQueryAlignmentOptions, MultiQueryAlignmentOptions, TextQueryMetadataFilter, TextQueryAttributeFilter } from '@lib/models/search';

// Text Query (Filter)
export const DEFAULT_METADATA_FILTER: TextQueryMetadataFilter = ['AND', 'Database', 'EQUALS', ''];
export const DEFAULT_ATTRIBUTE_FILTER: TextQueryAttributeFilter = ['AND', 'hydrophilicity', '<', 0];

export const MIN_SEQUENCE_LENGTH = 2;
export const MAX_SEQUENCE_LENGTH = 100;

// Single and Multi Query
export const SUPPORTED_MATRIX_NAMES = ['BLOSUM45', 'BLOSUM50', 'BLOSUM62', 'BLOSUM80', 'BLOSUM90', 'PAM30', 'PAM70', 'PAM250'];
export const SUPPORTED_ALGORITHMS = {
  local: 'Local (Smith-Waterman)',
  global: 'Global (Needleman-Wunsch)'
};
export const SUPPORTED_CRITERIA = ['avg', 'max', 'min'];

export const DEFAULT_MATRIX_NAME = 'BLOSUM62';
export const DEFAULT_ALGORITHM = 'local';
export const DEFAULT_CRITERION = 'avg';

export const DEFAULT_SINGLE_ALIGNMENT_OPTIONS: SingleQueryAlignmentOptions = {
  matrix: DEFAULT_MATRIX_NAME,
  alg: DEFAULT_ALGORITHM,
  threshold: 1,
  max_quantity: null
};

export const DEFAULT_MULTI_ALIGNMENT_OPTIONS: MultiQueryAlignmentOptions = {
  ...DEFAULT_SINGLE_ALIGNMENT_OPTIONS,
  criterion: DEFAULT_CRITERION
};
