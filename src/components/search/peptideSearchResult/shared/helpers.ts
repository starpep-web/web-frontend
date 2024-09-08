import { PeptideSearchAttributes } from '@lib/services/api/models/peptide';
import { getFriendlyNameForAttribute } from '@lib/services/api/helpers/peptide';

export const ORDERED_ATTRIBUTE_NAMES: (keyof PeptideSearchAttributes)[] = [
  'hydropathicity',
  'charge',
  'isoelectricPoint',
  'bomanIndex',
  'gaacAlphatic',
  'gaacAromatic',
  'gaacPositiveCharge',
  'gaacNegativeCharge',
  'gaacUncharge'
];

export const ORDERED_ATTRIBUTE_HEADERS: string[] = ORDERED_ATTRIBUTE_NAMES.map((attributeName) => {
  return getFriendlyNameForAttribute(attributeName);
});
