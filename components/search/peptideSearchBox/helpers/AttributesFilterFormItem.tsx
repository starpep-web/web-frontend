import React from 'react';
import { Block, Box, Button, Columns, Form } from 'react-bulma-components';
import { Dropdown } from '@components/form/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Test = string[]

interface Props {
  value: Test
  onChange?: (value: Test) => void
  onDelete?: () => void
}

const AttributesFilterFormItem: React.FC<Props> = ({ value, onChange, onDelete }) => {
  const handleOperatorChange = (operator: string) => {
    // onChange?.([operator as FilterOperator, metadataLabel, comparator, filterValue]);
  };

  const handleFeatureNameChange = (featureName: string) => {
    // onChange?.([operator, metadataLabel as MetadataLabel, comparator, '']);
  };

  const handleComparatorChange = (comparator: string) => {
    // onChange?.([operator, metadataLabel, comparator as FilterComparator, filterValue]);
  };

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChange?.([operator, metadataLabel, comparator, value]);
  };

  return (
    <Box>
      <Columns>
        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 2 }} widescreen={{ size: 2 }} fullhd={{ size: 2 }}>
          <Dropdown
            label="Operator"
            options={[]}
            value={''}
            onChange={handleOperatorChange}
          />
        </Columns.Column>

        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 2 }} widescreen={{ size: 2 }} fullhd={{ size: 2 }}>
          <Dropdown
            label="Feature"
            options={[]}
            value={''}
            onChange={handleFeatureNameChange}
          />
        </Columns.Column>

        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 3 }} widescreen={{ size: 3 }} fullhd={{ size: 3 }}>
          <Dropdown
            label="Comparator"
            options={[]}
            value={''}
            onChange={handleComparatorChange}
          />
        </Columns.Column>

        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 4 }} widescreen={{ size: 4 }} fullhd={{ size: 4 }}>
          <Form.Field>
            <Form.Label>
              Value
            </Form.Label>

            <Form.Input type="number" onChange={handleFilterValueChange} />
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
