import React from 'react';
import { Dropdown } from '@components/form/dropdown';
import { getFriendlyNameForRawAttribute } from '@lib/services/api/helpers/peptide';
import { RawAttributeName } from '@lib/services/api/models/peptide';

const rawAttributeOptions: RawAttributeName[] = [
  'hydropathicity',
  'charge',
  'isoelectric_point',
  'boman_index',
  'gaac_alphatic',
  'gaac_aromatic',
  'gaac_positive_charge',
  'gaac_negative_charge',
  'gaac_uncharge',
  'hydrophobicity',
  'solvation',
  'amphiphilicity',
  'hydrophilicity'
];

const attributeToFriendlyNameMap = rawAttributeOptions.sort().reduce((obj, attribute) => {
  obj[attribute] = getFriendlyNameForRawAttribute(attribute);
  return obj;
}, {} as Record<RawAttributeName, string>);
const friendlyNameToAttributeMap = Object.entries(attributeToFriendlyNameMap).reduce((obj, [k, v]) => {
  obj[v] = k as RawAttributeName;
  return obj;
}, {} as Record<string, RawAttributeName>);

interface Props {
  onChange?: (attribute: RawAttributeName) => void
  value: RawAttributeName
}

export const AttributePicker: React.FC<Props> = ({ onChange, value }) => {
  const handleDropdownChange = (value: string) => {
    onChange?.(friendlyNameToAttributeMap[value]);
  };

  return (
    <div className="mt-4">
      <h4 className="text-center mb-3">
        Pick a Feature for this Graph
      </h4>

      <Dropdown
        options={Object.keys(friendlyNameToAttributeMap)}
        value={attributeToFriendlyNameMap[value]}
        onChange={handleDropdownChange}
      />
    </div>
  );
};
