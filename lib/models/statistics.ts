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

export interface DatabaseFeaturesStatistics {
  hydropathicityHistogram: Record<string, number>
  chargeHistogram: Record<string, number>
  isoelectricPointHistogram: Record<string, number>
  bomanIndexHistogram: Record<string, number>
  gaacAlphaticHistogram: Record<string, number>
  gaacAromaticHistogram: Record<string, number>
  gaacPositiveChargeHistogram: Record<string, number>
  gaacNegativeChargeHistogram: Record<string, number>
  gaacUnchargeHistogram: Record<string, number>
  hydrophobicityHistogram: Record<string, number>
  solvationHistogram: Record<string, number>
  amphiphilicityHistogram: Record<string, number>
  hydrophilicityHistogram: Record<string, number>
}

export type HistogramWidthMethod = 'scott' | 'freedman-diaconis';
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
