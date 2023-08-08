import React, { useState, useEffect } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import TextSearchInput from '../helpers/TextSearchInput';
import RegexHelpMessage from '../helpers/RegexHelpMessage';
import FiltersHelpMessage from '../helpers/FiltersHelpMessage';
import SequenceLengthFilterForm from '../helpers/SequenceLengthFilterForm';
import MetadataFiltersForm from '../helpers/MetadataFiltersForm';
import AttributesFiltersForm from '../helpers/AttributesFiltersForm';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import {
  TextQueryMetadataFilter,
  convertMetadataFilterToParam,
  TextQueryAttributeFilter,
  convertAttributeFilterToParam,
  SequenceLengthFilter
} from '@lib/models/search';

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

    return router.push(DYNAMIC_ROUTES.textQuery(query, regexEnabled, {
      metadata: metadataFilters.map(convertMetadataFilterToParam),
      attributes: attributeFilters.map(convertAttributeFilterToParam)
    }));
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleRegexCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexEnabled(event.target.checked);
  };

  const handleSequenceLengthFilterChange = (filter: SequenceLengthFilter) => {
    console.log(...filter);
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

      <Form.Label>
        Sequence Length
      </Form.Label>
      <SequenceLengthFilterForm onChange={handleSequenceLengthFilterChange} />

      <Form.Label>
        Feature Filters
      </Form.Label>
      <AttributesFiltersForm onChange={handleAttributeFiltersChange} />

      <Form.Label>
        Metadata Filters
      </Form.Label>
      <MetadataFiltersForm onChange={handleMetadataFiltersChange} />

      <FiltersHelpMessage />

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
