'use client';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Dropdown } from '@components/form/dropdown';
import { DebouncedInfiniteSearchInput } from '@components/form/debouncedInfiniteSearchInput';
import { RawMetadataLabel } from '@lib/services/api/models/peptide';
import { TextQueryMetadataFilter, FilterOperator, MetadataFilterComparator } from '@lib/services/api/models/search';
import XIcon from '@assets/svg/icons/x-solid.svg';
import DatabaseIcon from '@assets/svg/icons/database-solid.svg';
import StarOfLifeIcon from '@assets/svg/icons/star-of-life-solid.svg';
import AtomIcon from '@assets/svg/icons/atom-solid.svg';
import BullseyeIcon from '@assets/svg/icons/bullseye-solid.svg';
import CIcon from '@assets/svg/icons/c-solid.svg';
import NIcon from '@assets/svg/icons/n-solid.svg';
import FileLinesIcon from '@assets/svg/icons/file-lines-solid.svg';
import LinkSlashIcon from '@assets/svg/icons/link-slash-solid.svg';
import { getDatabaseSuggestionsAction } from '@actions/search/suggestions/database';
import { getFunctionSuggestionsAction } from '@actions/search/suggestions/function';
import { getOriginSuggestionsAction } from '@actions/search/suggestions/origin';
import { getTargetSuggestionsAction } from '@actions/search/suggestions/target';
import { getCTerminusSuggestionsAction } from '@actions/search/suggestions/c-terminus';
import { getNTerminusSuggestionsAction } from '@actions/search/suggestions/n-terminus';
import { getUnusualAASuggestionsAction } from '@actions/search/suggestions/unusual-aa';
import { getCrossRefSuggestionsAction } from '@actions/search/suggestions/cross-ref';

const SUPPORTED_OPERATORS = ['AND', 'OR', 'XOR'];
const SUPPORTED_METADATA_COMPARATORS = ['EQUALS', 'NOT_EQUALS'];

type DebouncedInfiniteSearchInputProps = any

const filterValueProps: Record<RawMetadataLabel, Partial<DebouncedInfiniteSearchInputProps>> = {
  Database: {
    label: 'Compiled In',
    placeholder: 'Search by Database',
    dataFetch: getDatabaseSuggestionsAction,
    icon: DatabaseIcon
  },
  Function: {
    label: 'Related To',
    placeholder: 'Search by Function',
    dataFetch: getFunctionSuggestionsAction,
    icon: StarOfLifeIcon
  },
  Origin: {
    label: 'Produced By',
    placeholder: 'Search by Origin',
    dataFetch: getOriginSuggestionsAction,
    icon: AtomIcon
  },
  Target: {
    label: 'Assessed Against',
    placeholder: 'Search by Target',
    dataFetch: getTargetSuggestionsAction,
    icon: BullseyeIcon
  },
  Cterminus: {
    label: 'Modified By',
    placeholder: 'Search by CTerminus',
    dataFetch: getCTerminusSuggestionsAction,
    icon: CIcon
  },
  Nterminus: {
    label: 'Modified By',
    placeholder: 'Search by Nterminus',
    dataFetch: getNTerminusSuggestionsAction,
    icon: NIcon
  },
  UnusualAA: {
    label: 'Constituted By',
    placeholder: 'Search by UnusualAA',
    dataFetch: getUnusualAASuggestionsAction,
    icon: FileLinesIcon
  },
  CrossRef: {
    label: 'Linked To',
    placeholder: 'Search by CrossRef',
    dataFetch: getCrossRefSuggestionsAction,
    icon: LinkSlashIcon
  }
};

interface Props {
  value: TextQueryMetadataFilter
  onChange?: (value: TextQueryMetadataFilter) => void
  onDelete?: () => void
}

export const MetadataFiltersFormItem: React.FC<Props> = ({ value, onChange, onDelete }) => {
  const [operator, metadataLabel, comparator, filterValue] = value;
  const propsForFilterValue = filterValueProps[metadataLabel] as DebouncedInfiniteSearchInputProps;

  const handleOperatorChange = (operator: string) => {
    onChange?.([operator as FilterOperator, metadataLabel, comparator, filterValue]);
  };

  const handleMetadataLabelChange = (metadataLabel: string) => {
    onChange?.([operator, metadataLabel as RawMetadataLabel, comparator, '']);
  };

  const handleComparatorChange = (comparator: string) => {
    onChange?.([operator, metadataLabel, comparator as MetadataFilterComparator, filterValue]);
  };

  const handleFilterValueChange = (value: string) => {
    onChange?.([operator, metadataLabel, comparator, value]);
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
              label="Metadata Type"
              options={Object.keys(filterValueProps)}
              value={metadataLabel}
              onChange={handleMetadataLabelChange}
            />
          </Col>

          <Col className="mb-2" md={{ span: 12 }} lg={{ span: 2 }}>
            <Dropdown
              label="Comparator"
              options={[...SUPPORTED_METADATA_COMPARATORS]}
              value={comparator}
              onChange={handleComparatorChange}
            />
          </Col>

          <Col className="mb-2" md={{ span: 12 }} lg={{ span: 4 }}>
            <DebouncedInfiniteSearchInput
              key={metadataLabel}
              onChange={handleFilterValueChange}
              initialValue={filterValue}
              {...propsForFilterValue}
            />
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
