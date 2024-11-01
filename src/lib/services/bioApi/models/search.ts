export type SingleQueryAlignmentOptions = {
  matrix: string
  alg: string
  threshold: number
  max_quantity: number | null
}

export type MultiQueryAlignmentOptions = SingleQueryAlignmentOptions & {
  criterion: string
}
