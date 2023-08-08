import React, { useState, useEffect } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import TextSearchInput from '../helpers/TextSearchInput';
import RegexHelpMessage from '../helpers/RegexHelpMessage';
import FiltersHelpMessage from '../helpers/FiltersHelpMessage';
import MetadataFiltersForm from '../helpers/MetadataFiltersForm';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { TextQueryFilter, convertFilterToParam } from '@lib/models/search';

const TextQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [regexEnabled, setRegexEnabled] = useState<boolean>(false);
  const [filters, setFilters] = useState<TextQueryFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setQuery('');
  }, [regexEnabled]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    return router.push(DYNAMIC_ROUTES.textQuery(query, regexEnabled, filters.map(convertFilterToParam)));
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleRegexCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexEnabled(event.target.checked);
  };

  const handleFiltersChange = (filters: TextQueryFilter[]) => {
    setFilters(filters);
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

      <hr />

      <FiltersHelpMessage />

      <Form.Label>
        Metadata Filters
      </Form.Label>
      <MetadataFiltersForm onChange={handleFiltersChange} />

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
