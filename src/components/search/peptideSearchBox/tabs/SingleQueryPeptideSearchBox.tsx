'use client';
import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@components/common/errorMessage';
import { SingleQueryAlignmentOptionsForm } from '../helpers/form/SingleQueryAlignmentOptionsForm';
import { TextSearchInput } from '../helpers/input/TextSearchInput';
import { postSingleQuerySearchAction } from '@actions/search/alignment/single-query';
import MagnifyingGlassIcon from '@assets/svg/icons/magnifying-glass-solid.svg';
import { RouteDefs } from '@lib/constants/routes';
import { DEFAULT_SINGLE_ALIGNMENT_OPTIONS } from '@lib/services/bioApi/helpers/search';
import { SingleQueryAlignmentOptions } from '@lib/services/bioApi/models/search';

export const SingleQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [options, setOptions] = useState<SingleQueryAlignmentOptions>(DEFAULT_SINGLE_ALIGNMENT_OPTIONS);
  const [error, setError] = useState<string>('');

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    try {
      const { id } = await postSingleQuerySearchAction(`>Query\n${query}`, options);
      return router.push(RouteDefs.singleQuery(id));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }

    return null;
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleOptionsChange = (options: SingleQueryAlignmentOptions) => {
    setOptions(options);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <ErrorMessage
        error={`Server responded with: ${error}`}
        show={!!error}
        header="Could not send your single query alignment request"
        description="Please make sure you have specified only one sequence to align and that the options are correct."
      />

      <Form.Group className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label className="fw-semibold" column={false}>
            Single Query
          </Form.Label>

          <TextSearchInput onChange={handleQueryChange} value={query} regexEnabled={false} />
        </Form.Group>
      </Form.Group>

      <hr />

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold mb-3" column={false}>
          Alignment Options
        </Form.Label>

        <SingleQueryAlignmentOptionsForm onChange={handleOptionsChange} />
      </Form.Group>

      <div className="pt-2 w-100 d-flex flex-row align-items-center justify-content-center">
        <Button variant="primary" className="w-100-sm d-inline-flex align-items-center justify-content-center" disabled={loading || query.length < 1} type="submit">
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
