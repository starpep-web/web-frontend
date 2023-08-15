import { http } from './apiService';
import { FrequencyFilterType } from '@lib/services/graphDb/statisticsService';
import { PeptideAttributes } from '@lib/models/peptide';
import { DataVector2D, HistogramWidthMethod } from '@lib/models/statistics';

export const getFilteredAAFrequency = async (type?: FrequencyFilterType, value?: string): Promise<Record<string, number>> => {
  const params: Record<string, string> = {};
  if (type) {
    params.type = type;
  }
  if (value) {
    params.value = value;
  }

  try {
    const response = await http.get('/api/statistics/amino-acids/frequency', { params });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getHistogramForAttribute = async (attribute: PeptideAttributes.RawPropertyName, method?: HistogramWidthMethod): Promise<Record<string, number>> => {
  const params: Record<string, string> = { attribute };
  if (method) {
    params.method = method;
  }

  try {
    const response = await http.get('/api/statistics/attributes/histogram', { params });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getScatterForAttributes = async (xAttribute: PeptideAttributes.RawPropertyName, yAttribute: PeptideAttributes.RawPropertyName): Promise<DataVector2D> => {
  const params: Record<string, string> = {
    x: xAttribute,
    y: yAttribute
  };

  try {
    const response = await http.get('/api/statistics/attributes/scatter', { params });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
