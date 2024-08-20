import React, { useState } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { ErrorMessage } from '@components/common/errorMessage';
import SingleQueryAlignmentOptionsForm from '../helpers/SingleQueryAlignmentOptionsForm';
import TextSearchInput from '@components/search/peptideSearchBox/helpers/TextSearchInput';
import { postSingleQuerySearch } from '@lib/services/localApi/searchService';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { DEFAULT_SINGLE_ALIGNMENT_OPTIONS } from '@lib/constants/search';
import { SingleQueryAlignmentOptions } from '@lib/models/search';

const SingleQueryPeptideSearchBox = () => {
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
      const { id } = await postSingleQuerySearch(`>Query\n${query}`, options);
      return router.push(DYNAMIC_ROUTES.singleQuery(id));
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
    <form onSubmit={handleOnSubmit}>
      <ErrorMessage
        error={`Server responded with: ${error}`}
        show={!!error}
        header="Could not send your single query alignment request"
        description="Please make sure you have specified only one sequence to align and that the options are correct."
      />

      <Form.Field>
        <Form.Label>
          Single Query
        </Form.Label>

        <Form.Control>
          <TextSearchInput
            onChange={handleQueryChange}
            value={query}
            regexEnabled={false}
          />
        </Form.Control>
      </Form.Field>

      <hr />

      <Form.Label>
        Alignment Options
      </Form.Label>

      <SingleQueryAlignmentOptionsForm onChange={handleOptionsChange} />

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

export default SingleQueryPeptideSearchBox;
