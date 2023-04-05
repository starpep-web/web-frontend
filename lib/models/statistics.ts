export interface PartialRelationStatistics {
  distribution: Record<string, number>,
  percentage: Record<string, number>,
  total: number,
  partialSize: number
}

export interface DatabaseStatistics {
  count: number,
  unusualCount: number,
  lengthDistribution: Record<number, number>,
  functionDistribution: Record<string, number>,
  databaseDistribution: Record<string, number>,
  targetDistribution: PartialRelationStatistics,
  cTerminusDistribution: PartialRelationStatistics,
  nTerminusDistribution: PartialRelationStatistics
}
