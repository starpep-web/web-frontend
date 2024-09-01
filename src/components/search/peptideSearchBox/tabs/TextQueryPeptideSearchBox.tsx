'use client';
import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/navigation';
import { TextSearchInput } from '../helpers/TextSearchInput';
import { RegexHelpMessage } from '../helpers/RegexHelpMessage';
import { FiltersHelpMessage } from '../helpers/FiltersHelpMessage';
import { SequenceLengthFilterForm } from '../helpers/SequenceLengthFilterForm';
import { MetadataFiltersForm } from '../helpers/MetadataFiltersForm';
import { AttributesFiltersForm } from '../helpers/AttributesFiltersForm';
import MagnifyingGlassIcon from '@assets/svg/icons/magnifying-glass-solid.svg';
import { RouteDefs } from '@lib/constants/routes';
import { TextQueryMetadataFilter, TextQueryAttributeFilter, SequenceLengthFilter, convertMetadataFilterToParam, convertAttributeFilterToParam, convertSequenceLengthFilterToParam } from '@lib/services/api/models/search';

export const TextQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [regexEnabled, setRegexEnabled] = useState<boolean>(false);
  const [sequenceLengthFilter, setSequenceLengthFilter] = useState<SequenceLengthFilter | null>(null);
  const [metadataFilters, setMetadataFilters] = useState<TextQueryMetadataFilter[]>([]);
  const [attributeFilters, setAttributeFilters] = useState<TextQueryAttributeFilter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setQuery('');
  }, [regexEnabled]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    return router.push(RouteDefs.textQuery(query, regexEnabled, {
      metadata: metadataFilters.map(convertMetadataFilterToParam),
      attributes: attributeFilters.map(convertAttributeFilterToParam),
      length: sequenceLengthFilter ? convertSequenceLengthFilterToParam(sequenceLengthFilter) : ''
    }));
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleRegexCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegexEnabled(event.target.checked);
  };

  const handleSequenceLengthFilterChange = (filter: SequenceLengthFilter) => {
    setSequenceLengthFilter(filter);
  };

  const handleMetadataFiltersChange = (filters: TextQueryMetadataFilter[]) => {
    setMetadataFilters(filters);
  };

  const handleAttributeFiltersChange = (filters: TextQueryAttributeFilter[]) => {
    setAttributeFilters(filters);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label className="fw-semibold" column={false}>
            Text Search
          </Form.Label>

          <TextSearchInput onChange={handleInputChange} value={query} regexEnabled={regexEnabled} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Check
            label="Search with Regex (Toggling clears query)"
            checked={regexEnabled}
            onChange={handleRegexCheckboxChange}
          />

          <RegexHelpMessage show={regexEnabled} />
        </Form.Group>
      </Form.Group>

      <hr />

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold" column={false}>
          Sequence Length
        </Form.Label>

        <SequenceLengthFilterForm onChange={handleSequenceLengthFilterChange} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold" column={false}>
          Feature Filters
        </Form.Label>

        <AttributesFiltersForm onChange={handleAttributeFiltersChange} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold" column={false}>
          Metadata Filters
        </Form.Label>

        <MetadataFiltersForm onChange={handleMetadataFiltersChange} />
      </Form.Group>

      <FiltersHelpMessage />

      <div className="pt-2 w-100 d-flex flex-row align-items-center justify-content-center">
        <Button variant="primary" className="w-100-sm d-inline-flex align-items-center justify-content-center" disabled={loading} type="submit">
          {
            loading ? (
              <div className="d-flex align-items-center justify-content-center" style={{ height: 20, width: 50 }}>
                <Spinner size="sm" animation="border" role="status" />
              </div>
            ) : (
              <Fragment>
                <MagnifyingGlassIcon
                  className="d-inline me-3"
                  height={20}
                  style={{ fill: '#fff' }}
                />

                Search
              </Fragment>
            )
          }
        </Button>
      </div>
    </Form>
  );
};
