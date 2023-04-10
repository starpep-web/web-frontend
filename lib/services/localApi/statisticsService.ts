import axios from 'axios';
import { FrequencyFilterType } from '@lib/services/graphDb/statisticsService';

export const getFilteredAAFrequency = async (type?: FrequencyFilterType, value?: string): Promise<Record<string, number>> => {
  const params: Record<string, string> = {};
  if (type) {
    params.type = type;
  }
  if (value) {
    params.value = value;
  }

  try {
    const response = await axios.get('/api/statistics/amino-acids/frequency', { params });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};
