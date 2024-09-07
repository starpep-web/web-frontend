import { client } from '@lib/services/api/client';
import { ApiResponse } from '@lib/services/api/models/api';
import { FrequencyFilterType, PartialRelationStatistics, StatisticsCount, StatisticsDistribution, StatisticsHeatmap, Vector2 } from '@lib/services/api/models/statistics';

export const getPeptideCount = async (): Promise<number> => {
  const response = await client.get<ApiResponse<StatisticsCount>>('/statistics/count/peptides');
  return response.data.count;
};

export const getUnusualPeptideCount = async (): Promise<number> => {
  const response = await client.get<ApiResponse<StatisticsCount>>('/statistics/count/unusual-peptides');
  return response.data.count;
};

export const getDatabaseDistribution = async (): Promise<Record<string, number>> => {
  const response = await client.get<ApiResponse<StatisticsDistribution>>('/statistics/distribution/database');
  return response.data.distribution;
};

export const getFunctionDistribution = async (): Promise<Record<string, number>> => {
  const response = await client.get<ApiResponse<StatisticsDistribution>>('/statistics/distribution/function');
  return response.data.distribution;
};

export const getLengthDistribution = async (): Promise<Record<string, number>> => {
  const response = await client.get<ApiResponse<StatisticsDistribution>>('/statistics/distribution/length');
  return response.data.distribution;
};

export const getPartialCTerminusDistribution = async (limit?: number): Promise<PartialRelationStatistics> => {
  const response = await client.get<ApiResponse<PartialRelationStatistics>>('/statistics/distribution/partial/c-terminus', {
    query: { limit }
  });
  return response.data;
};

export const getPartialNTerminusDistribution = async (limit?: number): Promise<PartialRelationStatistics> => {
  const response = await client.get<ApiResponse<PartialRelationStatistics>>('/statistics/distribution/partial/n-terminus', {
    query: { limit }
  });
  return response.data;
};

export const getPartialOriginDistribution = async (limit?: number): Promise<PartialRelationStatistics> => {
  const response = await client.get<ApiResponse<PartialRelationStatistics>>('/statistics/distribution/partial/origin', {
    query: { limit }
  });
  return response.data;
};

export const getPartialTargetDistribution = async (limit?: number): Promise<PartialRelationStatistics> => {
  const response = await client.get<ApiResponse<PartialRelationStatistics>>('/statistics/distribution/partial/target', {
    query: { limit }
  });
  return response.data;
};

export const getAminoAcidFrequency = async (type?: FrequencyFilterType, filter?: string): Promise<Record<string, number>> => {
  const response = await client.get<ApiResponse<Record<string, number>>>('/statistics/frequency/amino-acids', {
    query: { type, filter }
  });
  return response.data;
};

export const getDatabaseHeatmap = async (): Promise<StatisticsHeatmap> => {
  const response = await client.get<ApiResponse<StatisticsHeatmap>>('/statistics/heatmap/database');
  return response.data;
};

export const getAttributeHistogram = async (attribute: string, method: string): Promise<Record<string, number>> => {
  const response = await client.get<ApiResponse<Record<string, number>>>('/statistics/histogram/attribute', {
    query: { attribute, method }
  });
  return response.data;
};

export const getAttributeScatter = async (xAttribute: string, yAttribute: string): Promise<Vector2[]> => {
  const response = await client.get<ApiResponse<Vector2[]>>('/statistics/scatter/attribute', {
    query: { x: xAttribute, y: yAttribute }
  });
  return response.data;
};
