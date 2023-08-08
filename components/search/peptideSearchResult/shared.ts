import { PeptideAttributes } from '@lib/models/peptide';

export const ORDERED_ATTRIBUTE_NAMES: (keyof PeptideAttributes.SearchAttributes)[] = [
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
  return PeptideAttributes.getFriendlyNameForAttribute(attributeName);
});
