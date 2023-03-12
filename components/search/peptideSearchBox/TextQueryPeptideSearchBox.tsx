import React, { useState, useEffect } from 'react';
import { Form, Button, Box, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import TextSearchInput from './TextSearchInput';
import RegexHelpMessage from './RegexHelpMessage';
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
import { TextQueryMetadataFilters, NodeLabel } from '@lib/models/peptide';

const TextQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [regexEnabled, setRegexEnabled] = useState<boolean>(false);
  const [metadataFilters, setMetadataFilters] = useState<TextQueryMetadataFilters>({});

  useEffect(() => {
    setQuery('');
  }, [regexEnabled]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return router.push(DYNAMIC_ROUTES.textQuery(query, regexEnabled, metadataFilters));
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleRegexCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexEnabled(event.target.checked);
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

        <TextSearchInput onChange={handleInputChange} value={query} regexEnabled={regexEnabled} />
      </Form.Field>

      <Form.Field>
        <Form.Checkbox checked={regexEnabled} onChange={handleRegexCheckboxChange}>
          Search with Regex
        </Form.Checkbox>
        <RegexHelpMessage show={regexEnabled} />
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

export default TextQueryPeptideSearchBox;
