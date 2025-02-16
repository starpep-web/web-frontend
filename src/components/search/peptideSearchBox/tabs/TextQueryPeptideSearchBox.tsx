'use client';
import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/navigation';
import { TextSearchInput } from '../helpers/input/TextSearchInput';
import { RegexHelpMessage } from '../helpers/help/RegexHelpMessage';
import { TextQueryHelpMessage } from '../helpers/help/TextQueryHelpMessage';
import { SequenceLengthFilterForm } from '../helpers/form/SequenceLengthFilterForm';
import { MetadataFiltersForm } from '../helpers/form/MetadataFiltersForm';
import { AttributesFiltersForm } from '../helpers/form/AttributesFiltersForm';
import MagnifyingGlassIcon from '@assets/svg/icons/magnifying-glass-solid.svg';
import { RouteDefs } from '@lib/constants/routes';
import {
  TextQueryMetadataFilter,
  TextQueryAttributeFilter,
  SequenceLengthFilter,
  convertMetadataFilterToParam,
  convertAttributeFilterToParam,
  convertSequenceLengthFilterToParam,
  TextQueryResponseParams
} from '@lib/services/api/models/search';

interface Props {
  defaultValues?: TextQueryResponseParams
}

export const TextQueryPeptideSearchBox: React.FC<Props> = ({ defaultValues }) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>(defaultValues?.query ?? '');
  const [regexEnabled, setRegexEnabled] = useState<boolean>(defaultValues?.regexEnabled ?? false);
  const [sequenceLengthFilter, setSequenceLengthFilter] = useState<SequenceLengthFilter | null>(defaultValues?.length ?? null);
  const [metadataFilters, setMetadataFilters] = useState<TextQueryMetadataFilter[]>(defaultValues?.metadata ?? []);
  const [attributeFilters, setAttributeFilters] = useState<TextQueryAttributeFilter[]>(defaultValues?.attributes ?? []);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setQuery(defaultValues?.query ?? '');
  }, [regexEnabled]);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    router.push(RouteDefs.textQuery(query, regexEnabled, {
      metadata: metadataFilters.map(convertMetadataFilterToParam),
      attributes: attributeFilters.map(convertAttributeFilterToParam),
      length: sequenceLengthFilter ? convertSequenceLengthFilterToParam(sequenceLengthFilter) : ''
    }));

    setLoading(false);
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

        <SequenceLengthFilterForm initialValue={defaultValues?.length} onChange={handleSequenceLengthFilterChange} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold" column={false}>
          Feature Filters
        </Form.Label>

        <AttributesFiltersForm initialValue={defaultValues?.attributes} onChange={handleAttributeFiltersChange} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold" column={false}>
          Metadata Filters
        </Form.Label>

        <MetadataFiltersForm initialValue={defaultValues?.metadata} onChange={handleMetadataFiltersChange} />
      </Form.Group>

      <TextQueryHelpMessage />

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
