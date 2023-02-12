export interface DatabaseStatistics {
  count: number,
  lengthDistribution: Record<number, number>,
  functionDistribution: Record<string, number>
}
