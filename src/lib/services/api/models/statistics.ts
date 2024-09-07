export type StatisticsCount = {
  count: number
};

export type StatisticsDistribution = {
  distribution: Record<string, number>
};

export type PartialRelationStatistics = {
  distribution: Record<string, number>
  percentage: Record<string, number>
  total: number
  partialSize: number
};

export type StatisticsHeatmap = {
  labels: {
    x: string[]
    y: string[]
  }
  data: {
    absolute: number[][]
    relative: number[][]
  }
};

export type Vector2<T = number> = [T, T];

export type FrequencyFilterType = 'Database' | 'Function' | 'Origin';

export type HistogramMethod = 'scott' | 'freedman-diaconis';
