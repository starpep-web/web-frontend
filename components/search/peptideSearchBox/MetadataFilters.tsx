import React, { useState } from 'react';
import { Box, Form } from 'react-bulma-components';
import { DebouncedInfiniteSearchInput } from '@components/form/debouncedInfiniteSearchInput';
import { NodeLabel, TextQueryMetadataFilters } from '@lib/models/peptide';
import {
  getCrossRefSuggestions,
  getCTerminusSuggestions,
  getDatabaseSuggestions,
  getFunctionSuggestions, getNTerminusSuggestions,
  getOriginSuggestions, getTargetSuggestions, getUnusualAASuggestions
} from '@lib/services/localApi/searchService';

interface Props {
  onChange?: (metadataFilters: TextQueryMetadataFilters) => void
}

const MetadataFilters: React.FC<Props> = ({ onChange }) => {
  const [metadataFilters, setMetadataFilters] = useState<TextQueryMetadataFilters>({});

  const handleMetadataFilterChange = (nodeLabel: NodeLabel) => (value: string) => {
    const newMetadataFilters = {
      ...metadataFilters,
      [nodeLabel]: value
    };

    setMetadataFilters(newMetadataFilters);
    onChange?.(newMetadataFilters);
  };

  return (
    <Box>
      <details>
        <summary>
          <strong>
            Filter By Metadata
          </strong>
        </summary>
        <div>
          <hr />

          <Form.Field>
            <Form.Label>
              Compiled In
            </Form.Label>

            <DebouncedInfiniteSearchInput
              dataFetch={getDatabaseSuggestions}
              onChange={handleMetadataFilterChange('Database')}
              label="Database"
              placeholder="Search by Database"
              icon="database"
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Related To
            </Form.Label>

            <DebouncedInfiniteSearchInput
              dataFetch={getFunctionSuggestions}
              onChange={handleMetadataFilterChange('Function')}
              label="Function"
              placeholder="Search by Function"
              icon="atom"
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Produced By
            </Form.Label>

            <DebouncedInfiniteSearchInput
              dataFetch={getOriginSuggestions}
              onChange={handleMetadataFilterChange('Origin')}
              label="Origin"
              placeholder="Search by Origin"
              icon="star-of-life"
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Assessed Against
            </Form.Label>

            <DebouncedInfiniteSearchInput
              dataFetch={getTargetSuggestions}
              onChange={handleMetadataFilterChange('Target')}
              label="Target"
              placeholder="Search by Target"
              icon="bullseye"
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Modified By
            </Form.Label>

            <Form.Field kind="group" style={{ gap: '3rem' }}>
              <DebouncedInfiniteSearchInput
                dataFetch={getCTerminusSuggestions}
                onChange={handleMetadataFilterChange('Cterminus')}
                label="CTerminus"
                placeholder="Search by CTerminus"
                icon="c"
              />
              <DebouncedInfiniteSearchInput
                dataFetch={getNTerminusSuggestions}
                onChange={handleMetadataFilterChange('Nterminus')}
                label="NTerminus"
                placeholder="Search by NTerminus"
                icon="n"
              />
            </Form.Field>
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Constituted By
            </Form.Label>

            <DebouncedInfiniteSearchInput
              dataFetch={getUnusualAASuggestions}
              onChange={handleMetadataFilterChange('UnusualAA')}
              label="UnusualAA"
              placeholder="Search by UnusualAA"
              icon="link-slash"
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Linked To
            </Form.Label>

            <DebouncedInfiniteSearchInput
              dataFetch={getCrossRefSuggestions}
              onChange={handleMetadataFilterChange('CrossRef')}
              label="CrossRef"
              placeholder="Search by CrossRef"
              icon="file-lines"
            />
          </Form.Field>
        </div>
      </details>
    </Box>
  );
};

export default MetadataFilters;
