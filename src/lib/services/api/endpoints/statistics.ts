import { client } from '@lib/services/api/client';
import { ApiResponse } from '@lib/services/api/models/api';
import { StatisticsCount, StatisticsDistribution, StatisticsHeatmap } from '@lib/services/api/models/statistics';

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
