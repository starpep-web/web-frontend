'use client';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Dropdown } from '@components/form/dropdown';
import XIcon from '@assets/svg/icons/x-solid.svg';
import { TextQueryAttributeFilter, FilterOperator, AttributeFilterComparator } from '@lib/services/api/models/search';
import { RawAttributeName } from '@lib/services/api/models/peptide';

const FLOAT_REGEX = /^-$|^-?\d+(?:\.\d*)?$/;
const SUPPORTED_OPERATORS = ['AND', 'OR', 'XOR'];
const SUPPORTED_ATTRIBUTE_COMPARATORS = ['<', '<=', '>', '>='];

const searchAttributes: RawAttributeName[] = [
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

export const AttributesFilterFormItem: React.FC<Props> = ({ value, onChange, onDelete }) => {
  const [rawFilterValue, setRawFilterValue] = useState<string>('0');
  const [operator, attributeName, comparator, filterValue] = value;

  const handleOperatorChange = (operator: string) => {
    onChange?.([operator as FilterOperator, attributeName, comparator, filterValue]);
  };

  const handleFeatureNameChange = (attributeName: string) => {
    onChange?.([operator, attributeName as RawAttributeName, comparator, 0]);
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
    <Card>
      <Card.Body>
        <Row>
          <Col className="mb-2" md={{ span: 12 }} lg={{ span: 2 }}>
            <Dropdown
              label="Operator"
              options={[...SUPPORTED_OPERATORS]}
              value={operator}
              onChange={handleOperatorChange}
            />
          </Col>

          <Col className="mb-2" md={{ span: 12 }} lg={{ span: 3 }}>
            <Dropdown
              label="Feature"
              options={searchAttributes}
              value={attributeName}
              onChange={handleFeatureNameChange}
            />
          </Col>

          <Col className="mb-2" md={{ span: 12 }} lg={{ span: 2 }}>
            <Dropdown
              label="Comparator"
              options={[...SUPPORTED_ATTRIBUTE_COMPARATORS]}
              value={comparator}
              onChange={handleComparatorChange}
            />
          </Col>

          <Col className="mb-2" md={{ span: 12 }} lg={{ span: 4 }}>
            <Form.Group>
              <Form.Label className="fw-semibold" column={false}>
                Value
              </Form.Label>

              <Form.Control
                key={attributeName}
                type="text"
                inputMode="numeric"
                onChange={handleFilterValueChange}
                onBlur={handleFilterValueBlur}
                value={rawFilterValue}
                placeholder="Insert a number"
              />
            </Form.Group>
          </Col>

          <Col className="mt-2 mb-2 align-self-end" md={{ span: 12 }} lg={{ span: 1 }}>
            <Button onClick={onDelete} variant="danger" className="w-100-lg d-inline-flex align-items-center justify-content-center" style={{ height: 38 }}>
              <XIcon className="d-inline" height={20} style={{ fill: '#fff' }} />

              <div className="ms-3 d-lg-none">
                Remove
              </div>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
