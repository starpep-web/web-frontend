import React from 'react';
import { Block, Heading } from 'react-bulma-components';
import { Dropdown } from '@components/form/dropdown';
import { PeptideAttributes } from '@lib/models/peptide';
import { Axis2D } from '@lib/models/statistics';
import styles from './AttributesPicker.module.scss';

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
  onChange?: (axis: Axis2D, attribute: PeptideAttributes.RawPropertyName) => void
  xValue: PeptideAttributes.RawPropertyName
  yValue: PeptideAttributes.RawPropertyName
}

const AttributePicker: React.FC<Props> = ({ onChange, xValue, yValue }) => {
  const handleDropdownChange = (axis: Axis2D) => (value: string) => {
    onChange?.(axis, friendlyNameToAttributeMap[value]);
  };

  return (
    <Block mt={6}>
      <Heading className="align-center" size={5}>
        Pick Some Features for this Scatter
      </Heading>

      <Block className={styles.responsiveFlex}>
        <Dropdown
          className={styles.flexExpand}
          label="Feature for X axis"
          options={Object.keys(friendlyNameToAttributeMap)}
          value={attributeToFriendlyNameMap[xValue]}
          onChange={handleDropdownChange('x')}
        />

        <Dropdown
          className={styles.flexExpand}
          label="Feature for Y axis"
          options={Object.keys(friendlyNameToAttributeMap)}
          value={attributeToFriendlyNameMap[yValue]}
          onChange={handleDropdownChange('y')}
        />
      </Block>
    </Block>
  );
};

export default AttributePicker;
