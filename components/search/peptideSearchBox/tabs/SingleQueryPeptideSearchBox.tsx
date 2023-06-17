import React, { useState } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import SingleQueryAlignmentOptionsForm from '../helpers/SingleQueryAlignmentOptionsForm';
import { postSingleQuerySearch } from '@lib/services/localApi/searchService';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { DEFAULT_SINGLE_ALIGNMENT_OPTIONS } from '@lib/constants/search';
import { SingleQueryAlignmentOptions } from '@lib/models/search';

const queryPlaceholder = '>Query\nGIGAVLKVLTTGLPALISWIKRKRQQ';

const SingleQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [options, setOptions] = useState<SingleQueryAlignmentOptions>(DEFAULT_SINGLE_ALIGNMENT_OPTIONS);
  const [_, setError] = useState<Error | null>(null);

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    try {
      const { id } = await postSingleQuerySearch(query, options);
      return router.push(DYNAMIC_ROUTES.singleQuery(id));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }

    return null;
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleOptionsChange = (options: SingleQueryAlignmentOptions) => {
    setOptions(options);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Form.Field>
        <Form.Label>
          Single Query in FASTA Format
        </Form.Label>

        <Form.Control>
          <Form.Textarea
            fixedSize
            placeholder={queryPlaceholder}
            value={query}
            onChange={handleQueryChange}
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
