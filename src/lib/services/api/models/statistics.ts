export type StatisticsCount = {
  count: number
};

export type StatisticsDistribution = {
  distribution: Record<string, number>
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
