import React from 'react';
import { Dropdown } from '@components/form/dropdown';
import { getFriendlyNameForRawAttribute } from '@lib/services/api/helpers/peptide';
import { RawAttributeName } from '@lib/services/api/models/peptide';
import { Axis2D } from '@lib/services/api/models/statistics';

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
  onChange?: (axis: Axis2D, attribute: RawAttributeName) => void
  xValue: RawAttributeName
  yValue: RawAttributeName
}

const AttributePicker: React.FC<Props> = ({ onChange, xValue, yValue }) => {
  const handleDropdownChange = (axis: Axis2D) => (value: string) => {
    onChange?.(axis, friendlyNameToAttributeMap[value]);
  };

  return (
    <div className="mt-4 mb-2">
      <h4 className="text-center mb-3">
        Pick Some Features for this Scatter
      </h4>

      <div className="d-flex gap-3 flex-column flex-md-row">
        <Dropdown
          className="w-100"
          style={{ flexBasis: '1/2' }}
          label="Feature for X axis"
          options={Object.keys(friendlyNameToAttributeMap)}
          value={attributeToFriendlyNameMap[xValue]}
          onChange={handleDropdownChange('x')}
        />

        <Dropdown
          className="w-100"
          style={{ flexBasis: '1/2' }}
          label="Feature for Y axis"
          options={Object.keys(friendlyNameToAttributeMap)}
          value={attributeToFriendlyNameMap[yValue]}
          onChange={handleDropdownChange('y')}
        />
      </div>
    </div>
  );
};

export default AttributePicker;
