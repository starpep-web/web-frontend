import { FrequencyFilterType } from '@lib/services/api/models/statistics';

export type FrequencyData = Record<string, number>;
export type CompositeFrequencyData = Record<string, FrequencyData>;

export type GraphPosition = 'left' | 'right';
export type FilterPickerValue = {
  position: GraphPosition,
  type: FrequencyFilterType,
  value: string
};
export type FullFilterPickerValues = Record<GraphPosition, FilterPickerValue>;
