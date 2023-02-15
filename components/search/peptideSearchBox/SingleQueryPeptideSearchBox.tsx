import React, { useState } from 'react';
import { Form, Button, Box, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { DebouncedSearchInput } from '@components/form/debouncedSearchInput';
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
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { SingleQueryMetadataFilters, NodeLabel } from '@lib/models/peptide';

const SingleQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [metadataFilters, setMetadataFilters] = useState<SingleQueryMetadataFilters>({});

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return router.push(DYNAMIC_ROUTES.singleQuery(query, metadataFilters));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toUpperCase());
  };

  const handleMetadataFilterChange = (nodeLabel: NodeLabel) => (value: string) => {
    setMetadataFilters({
      ...metadataFilters,
      [nodeLabel]: value
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Form.Field>
        <Form.Label>
          Search
        </Form.Label>

        <Form.Control>
          <Form.Input
            type="text"
            placeholder="Insert a sequence to search"
            onChange={handleInputChange}
            value={query}
          />

          <Icon align="left">
            <FontAwesomeIcon icon="search" />
          </Icon>
        </Form.Control>
      </Form.Field>

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

              <DebouncedSearchInput
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

              <DebouncedSearchInput
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

              <DebouncedSearchInput
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

              <DebouncedSearchInput
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
                <DebouncedSearchInput
                  dataFetch={getCTerminusSuggestions}
                  onChange={handleMetadataFilterChange('Cterminus')}
                  label="CTerminus"
                  placeholder="Search by CTerminus"
                  icon="c"
                />
                <DebouncedSearchInput
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

              <DebouncedSearchInput
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

              <DebouncedSearchInput
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

      <Button.Group align="center">
        <Button color="primary">
          <Icon align="left">
            <FontAwesomeIcon icon="search" />
          </Icon>

          <span>
            Search
          </span>
        </Button>
      </Button.Group>
    </form>
  );
};

export default SingleQueryPeptideSearchBox;
