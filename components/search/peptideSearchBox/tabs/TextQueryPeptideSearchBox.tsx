import React, { useState, useEffect } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import TextSearchInput from '../helpers/TextSearchInput';
import RegexHelpMessage from '../helpers/RegexHelpMessage';
import FiltersHelpMessage from '../helpers/FiltersHelpMessage';
import MetadataFiltersForm from '../helpers/MetadataFiltersForm';
import AttributesFiltersForm from '../helpers/AttributesFiltersForm';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { TextQueryMetadataFilter, convertMetadataFilterToParam, TextQueryAttributeFilter, convertAttributeFilterToParam } from '@lib/models/search';

const TextQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [regexEnabled, setRegexEnabled] = useState<boolean>(false);
  const [metadataFilters, setMetadataFilters] = useState<TextQueryMetadataFilter[]>([]);
  const [attributeFilters, setAttributeFilters] = useState<TextQueryAttributeFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setQuery('');
  }, [regexEnabled]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    console.log(attributeFilters, attributeFilters.map(convertAttributeFilterToParam));
    return router.push(DYNAMIC_ROUTES.textQuery(query, regexEnabled, metadataFilters.map(convertMetadataFilterToParam)));
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleRegexCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexEnabled(event.target.checked);
  };

  const handleMetadataFiltersChange = (filters: TextQueryMetadataFilter[]) => {
    setMetadataFilters(filters);
  };

  const handleAttributeFiltersChange = (filters: TextQueryAttributeFilter[]) => {
    setAttributeFilters(filters);
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
      <MetadataFiltersForm onChange={handleMetadataFiltersChange} />

      <Form.Label>
        Feature Filters
      </Form.Label>
      <AttributesFiltersForm onChange={handleAttributeFiltersChange} />

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
