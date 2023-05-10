import heatmapJson from './heatmapData.json';

export interface DatabaseHeatmap {
  labels: {
    x: string[]
    y: string[]
  }
  data: {
    absolute: number[][]
    relative: number[][]
  }
}

export const dbHeatmap: DatabaseHeatmap = heatmapJson;
