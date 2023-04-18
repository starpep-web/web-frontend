export interface PartialRelationStatistics {
  distribution: Record<string, number>,
  percentage: Record<string, number>,
  total: number,
  partialSize: number
}

export interface DatabaseGeneralInformationStatistics {
  count: number,
  unusualCount: number,
  functionDistribution: Record<string, number>,
  databaseDistribution: Record<string, number>
}

export interface DatabaseMetadataStatistics {
  lengthDistribution: Record<number, number>,
  functionDistribution: Record<string, number>,
  databaseDistribution: Record<string, number>,
  targetDistribution: PartialRelationStatistics,
  originDistribution: PartialRelationStatistics,
  cTerminusDistribution: PartialRelationStatistics,
  nTerminusDistribution: PartialRelationStatistics
}
