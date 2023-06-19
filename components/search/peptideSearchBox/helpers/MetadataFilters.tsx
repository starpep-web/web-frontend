import React, { useState } from 'react';
import { Box, Form } from 'react-bulma-components';
import { DebouncedInfiniteSearchInput } from '@components/form/debouncedInfiniteSearchInput';
import { MetadataLabel, TextQueryMetadataFilters } from '@lib/models/peptide';
import { metadataFilterIcons } from '@lib/icons/metadataFilterIcons';
import {
  getCrossRefSuggestions,
  getCTerminusSuggestions,
  getDatabaseSuggestions,
  getFunctionSuggestions, getNTerminusSuggestions,
  getOriginSuggestions, getTargetSuggestions, getUnusualAASuggestions
} from '@lib/services/localApi/searchService';
import styles from '../PeptideSearchBox.module.scss';

interface Props {
  onChange?: (metadataFilters: Partial<TextQueryMetadataFilters>) => void
}

const MetadataFilters: React.FC<Props> = ({ onChange }) => {
  const [metadataFilters, setMetadataFilters] = useState<Partial<TextQueryMetadataFilters>>({});

  const handleMetadataFilterChange = (nodeLabel: MetadataLabel) => (value: string) => {
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
              icon={metadataFilterIcons.Database}
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
              icon={metadataFilterIcons.Function}
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
              icon={metadataFilterIcons.Origin}
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
              icon={metadataFilterIcons.Target}
            />
          </Form.Field>

          <Form.Field>
            <Form.Label>
              Modified By
            </Form.Label>

            <Form.Field kind="group" className={styles.multiColumnMetadataFilter}>
              <DebouncedInfiniteSearchInput
                dataFetch={getCTerminusSuggestions}
                onChange={handleMetadataFilterChange('Cterminus')}
                label="CTerminus"
                placeholder="Search by CTerminus"
                icon={metadataFilterIcons.Cterminus}
              />
              <DebouncedInfiniteSearchInput
                dataFetch={getNTerminusSuggestions}
                onChange={handleMetadataFilterChange('Nterminus')}
                label="NTerminus"
                placeholder="Search by NTerminus"
                icon={metadataFilterIcons.Nterminus}
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
              icon={metadataFilterIcons.UnusualAA}
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
              icon={metadataFilterIcons.CrossRef}
            />
          </Form.Field>
        </div>
      </details>
    </Box>
  );
};

export default MetadataFilters;
