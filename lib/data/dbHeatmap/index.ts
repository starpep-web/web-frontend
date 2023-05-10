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

export const getDbHeatmap = async (): Promise<DatabaseHeatmap> => {
  return (await import('./heatmapData.json')).default;
};
