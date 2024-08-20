export interface PartialRelationStatistics {
  distribution: Record<string, number>
  percentage: Record<string, number>
  total: number
  partialSize: number
}

export interface DatabaseGeneralInformationStatistics {
  count: number
  unusualCount: number
  functionDistribution: Record<string, number>
  databaseDistribution: Record<string, number>
}

export interface DatabaseMetadataStatistics {
  lengthDistribution: Record<number, number>
  functionDistribution: Record<string, number>
  databaseDistribution: Record<string, number>
  targetDistribution: PartialRelationStatistics
  originDistribution: PartialRelationStatistics
  cTerminusDistribution: PartialRelationStatistics
  nTerminusDistribution: PartialRelationStatistics
}

export const histogramWidthMethods = ['scott', 'freedman-diaconis'] as const;
export type HistogramWidthMethod = typeof histogramWidthMethods[number];

export const isHistogramMethodValid = (method?: string): method is HistogramWidthMethod => {
  return histogramWidthMethods.includes(method as HistogramWidthMethod);
};

export interface HistogramData {
  min: number
  max: number
  width: number
  numOfBins: number
  bins: {
    classNum: number
    frequency: number
  }[]
}

export type Axis2D = 'x' | 'y';
export type DataVector2D = [number, number][];
