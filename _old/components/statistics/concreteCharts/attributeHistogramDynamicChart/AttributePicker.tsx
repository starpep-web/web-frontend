import React from 'react';
import { Block, Heading } from 'react-bulma-components';
import { Dropdown } from '@components/form/dropdown';
import { PeptideAttributes } from '@lib/models/peptide';

const rawAttributeOptions: PeptideAttributes.RawPropertyName[] = [
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
  obj[attribute] = PeptideAttributes.getFriendlyNameForRawAttribute(attribute);
  return obj;
}, {} as Record<PeptideAttributes.RawPropertyName, string>);
const friendlyNameToAttributeMap = Object.entries(attributeToFriendlyNameMap).reduce((obj, [k, v]) => {
  obj[v] = k as PeptideAttributes.RawPropertyName;
  return obj;
}, {} as Record<string, PeptideAttributes.RawPropertyName>);

interface Props {
  onChange?: (attribute: PeptideAttributes.RawPropertyName) => void
  value: PeptideAttributes.RawPropertyName
}

const AttributePicker: React.FC<Props> = ({ onChange, value }) => {
  const handleDropdownChange = (value: string) => {
    onChange?.(friendlyNameToAttributeMap[value]);
  };

  return (
    <Block mt={6}>
      <Heading className="align-center" size={5}>
        Pick a Feature for this Graph
      </Heading>

      <Block>
        <Dropdown
          options={Object.keys(friendlyNameToAttributeMap)}
          value={attributeToFriendlyNameMap[value]}
          onChange={handleDropdownChange}
        />
      </Block>
    </Block>
  );
};

export default AttributePicker;
