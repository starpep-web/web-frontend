export type SingleQueryAlignmentOptions = {
  matrix: string
  alg: string
  threshold: number
  max_quantity: number | null
};

export type SingleQueryAlignmentContext = SingleQueryAlignmentOptions & {
  query: string
};

export type MultiQueryAlignmentOptions = SingleQueryAlignmentOptions & {
  criterion: string
};

export type MultiQueryAlignmentContext = MultiQueryAlignmentOptions & {
  query: string
};
