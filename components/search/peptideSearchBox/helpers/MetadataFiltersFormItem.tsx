import React from 'react';
import { Box, Columns, Button, Block } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from '@components/form/dropdown';
import { DebouncedInfiniteSearchInput } from '@components/form/debouncedInfiniteSearchInput';
import { MetadataLabel } from '@lib/models/peptide';
import { TextQueryFilter, SUPPORTED_OPERATORS, FilterOperator, SUPPORTED_COMPARATORS, FilterComparator } from '@lib/models/search';
import {
  getDatabaseSuggestions,
  getFunctionSuggestions,
  getOriginSuggestions,
  getTargetSuggestions,
  getCTerminusSuggestions,
  getNTerminusSuggestions,
  getUnusualAASuggestions,
  getCrossRefSuggestions
} from '@lib/services/localApi/searchService';
import { metadataFilterIcons } from '@lib/icons/metadataFilterIcons';

type DebouncedInfiniteSearchInputProps = Parameters<typeof DebouncedInfiniteSearchInput>[0];

const filterValueProps: Record<MetadataLabel, Partial<DebouncedInfiniteSearchInputProps>> = {
  Database: {
    label: 'Compiled In',
    placeholder: 'Search by Database',
    dataFetch: getDatabaseSuggestions,
    icon: metadataFilterIcons.Database
  },
  Function: {
    label: 'Related To',
    placeholder: 'Search by Function',
    dataFetch: getFunctionSuggestions,
    icon: metadataFilterIcons.Function
  },
  Origin: {
    label: 'Produced By',
    placeholder: 'Search by Origin',
    dataFetch: getOriginSuggestions,
    icon: metadataFilterIcons.Origin
  },
  Target: {
    label: 'Assessed Against',
    placeholder: 'Search by Target',
    dataFetch: getTargetSuggestions,
    icon: metadataFilterIcons.Target
  },
  Cterminus: {
    label: 'Modified By',
    placeholder: 'Search by CTerminus',
    dataFetch: getCTerminusSuggestions,
    icon: metadataFilterIcons.Cterminus
  },
  Nterminus: {
    label: 'Modified By',
    placeholder: 'Search by Nterminus',
    dataFetch: getNTerminusSuggestions,
    icon: metadataFilterIcons.Nterminus
  },
  UnusualAA: {
    label: 'Constituted By',
    placeholder: 'Search by UnusualAA',
    dataFetch: getUnusualAASuggestions,
    icon: metadataFilterIcons.UnusualAA
  },
  CrossRef: {
    label: 'Linked To',
    placeholder: 'Search by CrossRef',
    dataFetch: getCrossRefSuggestions,
    icon: metadataFilterIcons.CrossRef
  }
};

interface Props {
  value: TextQueryFilter
  onChange?: (value: TextQueryFilter) => void
  onDelete?: () => void
}

const MetadataFiltersFormItem: React.FC<Props> = ({ value, onChange, onDelete }) => {
  const [operator, metadataLabel, comparator, filterValue] = value;
  const propsForFilterValue = filterValueProps[metadataLabel] as DebouncedInfiniteSearchInputProps;

  const handleOperatorChange = (operator: string) => {
    onChange?.([operator as FilterOperator, metadataLabel, comparator, filterValue]);
  };

  const handleMetadataLabelChange = (metadataLabel: string) => {
    onChange?.([operator, metadataLabel as MetadataLabel, comparator, '']);
  };

  const handleComparatorChange = (comparator: string) => {
    onChange?.([operator, metadataLabel, comparator as FilterComparator, filterValue]);
  };

  const handleFilterValueChange = (value: string) => {
    onChange?.([operator, metadataLabel, comparator, value]);
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
            label="Metadata Type"
            options={Object.keys(filterValueProps)}
            value={metadataLabel}
            onChange={handleMetadataLabelChange}
          />
        </Columns.Column>

        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 3 }} widescreen={{ size: 3 }} fullhd={{ size: 3 }}>
          <Dropdown
            label="Comparator"
            options={[...SUPPORTED_COMPARATORS]}
            value={comparator}
            onChange={handleComparatorChange}
          />
        </Columns.Column>

        <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 4 }} widescreen={{ size: 4 }} fullhd={{ size: 4 }}>
          <DebouncedInfiniteSearchInput
            key={metadataLabel}
            onChange={handleFilterValueChange}
            initialValue={filterValue}
            {...propsForFilterValue}
          />
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

export default MetadataFiltersFormItem;
