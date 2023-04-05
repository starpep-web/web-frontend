import React, { useState, useEffect } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import TextSearchInput from './TextSearchInput';
import RegexHelpMessage from './RegexHelpMessage';
import MetadataFilters from './MetadataFilters';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { TextQueryMetadataFilters } from '@lib/models/peptide';

const TextQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [regexEnabled, setRegexEnabled] = useState<boolean>(false);
  const [metadataFilters, setMetadataFilters] = useState<TextQueryMetadataFilters>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setQuery('');
  }, [regexEnabled]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    return router.push(DYNAMIC_ROUTES.textQuery(query, regexEnabled, metadataFilters));
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleRegexCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexEnabled(event.target.checked);
  };

  const handleMetadataFiltersChange = (metadataFilters: TextQueryMetadataFilters) => {
    setMetadataFilters(metadataFilters);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Form.Field>
        <Form.Label>
          Text Search
        </Form.Label>

        <TextSearchInput onChange={handleInputChange} value={query} regexEnabled={regexEnabled} />
      </Form.Field>

      <Form.Field>
        <Form.Checkbox checked={regexEnabled} onChange={handleRegexCheckboxChange}>
          Search with Regex (Toggling clears query)
        </Form.Checkbox>
        <RegexHelpMessage show={regexEnabled} />
      </Form.Field>

      <MetadataFilters onChange={handleMetadataFiltersChange} />

      <Button.Group align="center">
        <Button color="primary" loading={loading} disabled={loading}>
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
