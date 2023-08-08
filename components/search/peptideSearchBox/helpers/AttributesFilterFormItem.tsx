import React, { useState } from 'react';
import { Block, Box, Button, Columns, Form } from 'react-bulma-components';
import { Dropdown } from '@components/form/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextQueryAttributeFilter, FilterOperator, AttributeFilterComparator, SUPPORTED_OPERATORS, SUPPORTED_ATTRIBUTE_COMPARATORS } from '@lib/models/search';
import { PeptideAttributes } from '@lib/models/peptide';
import { DEFAULT_ATTRIBUTE_FILTER } from '@lib/constants/search';

const FLOAT_REGEX = /^-$|^-?\d+(?:\.\d*)?$/;

const searchAttributes: PeptideAttributes.RawPropertyName[] = [
  'hydropathicity',
  'charge',
  'isoelectric_point',
  'boman_index',
  'gaac_alphatic',
  'gaac_aromatic',
  'gaac_positive_charge',
  'gaac_negative_charge',
  'gaac_uncharge'
];

interface Props {
  value: TextQueryAttributeFilter
  onChange?: (value: TextQueryAttributeFilter) => void
  onDelete?: () => void
}

const AttributesFilterFormItem: React.FC<Props> = ({ value, onChange, onDelete }) => {
  const [rawFilterValue, setRawFilterValue] = useState<string>(DEFAULT_ATTRIBUTE_FILTER[3].toString());
  const [operator, attributeName, comparator, filterValue] = value;

  const handleOperatorChange = (operator: string) => {
    onChange?.([operator as FilterOperator, attributeName, comparator, filterValue]);
  };

  const handleFeatureNameChange = (attributeName: string) => {
    onChange?.([operator, attributeName as PeptideAttributes.RawPropertyName, comparator, 0]);
  };

  const handleComparatorChange = (comparator: string) => {
    onChange?.([operator, attributeName, comparator as AttributeFilterComparator, filterValue]);
  };

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const isNewInputValid = value === '' || FLOAT_REGEX.test(value);
    const newFilterValue = isNewInputValid ? value : rawFilterValue;

    setRawFilterValue(newFilterValue);
  };

  const handleFilterValueBlur = () => {
    const valueAsNumber = parseFloat(rawFilterValue);
    const newFilterValue = isNaN(valueAsNumber) ? 0 : valueAsNumber;

    setRawFilterValue(newFilterValue.toString());
    onChange?.([operator, attributeName, comparator, newFilterValue]);
  };

  return (
    <Box>
      <Columns>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 2 }} widescreen={{ size: 2 }} fullhd={{ size: 2 }}>
          <Dropdown
            label="Operator"
            options={[...SUPPORTED_OPERATORS]}
            value={operator}
            onChange={handleOperatorChange}
          />
        </Columns.Column>

        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 2 }} widescreen={{ size: 2 }} fullhd={{ size: 2 }}>
          <Dropdown
            label="Feature"
            options={searchAttributes}
            value={attributeName}
            onChange={handleFeatureNameChange}
          />
        </Columns.Column>

        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 3 }} widescreen={{ size: 3 }} fullhd={{ size: 3 }}>
          <Dropdown
            label="Comparator"
            options={[...SUPPORTED_ATTRIBUTE_COMPARATORS]}
            value={comparator}
            onChange={handleComparatorChange}
          />
        </Columns.Column>

        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 4 }} widescreen={{ size: 4 }} fullhd={{ size: 4 }}>
          <Form.Field>
            <Form.Label>
              Value
            </Form.Label>

            <Form.Input
              key={attributeName}
              type="text"
              inputMode="numeric"
              onChange={handleFilterValueChange}
              onBlur={handleFilterValueBlur}
              value={rawFilterValue}
              placeholder="Insert a number"
            />
          </Form.Field>
        </Columns.Column>

        <Columns.Column style={{ alignSelf: 'end' }} mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 1 }} widescreen={{ size: 1 }} fullhd={{ size: 1 }}>
          <Button onClick={onDelete} type="button" color="danger" className="w-100-until-tablet">
            <FontAwesomeIcon icon="x" />

            <Block ml={3} desktop={{ display: 'hidden' }}>
              Remove
            </Block>
          </Button>
        </Columns.Column>
      </Columns>
    </Box>
  );
};

export default AttributesFilterFormItem;
