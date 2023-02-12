export interface DatabaseStatistics {
  count: number,
  unusualCount: number,
  lengthDistribution: Record<number, number>,
  functionDistribution: Record<string, number>,
  databaseDistribution: Record<string, number>
}
