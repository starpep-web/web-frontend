import React, { useState } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { ErrorMessage } from '@components/common/errorMessage';
import MultiQueryAlignmentOptionsForm from '../helpers/MultiQueryAlignmentOptionsForm';
import { postMultiQuerySearch } from '@lib/services/localApi/searchService';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { DEFAULT_MULTI_ALIGNMENT_OPTIONS } from '@lib/constants/search';
import { MultiQueryAlignmentOptions } from '@lib/models/search';

const queryPlaceholder = '>Query1\nGIGAVLKVLTTGLPALISWIKRKRQQ\n>Query2\nGIGKFLHSAKKFGKAFVGEIMNS';

const MultiQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [options, setOptions] = useState<MultiQueryAlignmentOptions>(DEFAULT_MULTI_ALIGNMENT_OPTIONS);
  const [error, setError] = useState<string>('');

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError('');
    try {
      const { id } = await postMultiQuerySearch(query, options);
      return router.push(DYNAMIC_ROUTES.multiQuery(id));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }

    return null;
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleOptionsChange = (options: MultiQueryAlignmentOptions) => {
    setOptions(options);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <ErrorMessage
        error={`Server responded with: ${error}`}
        show={!!error}
        header="Could not send your multi query alignment request"
        description="Please make sure you have specified more than one sequence to align and that the options are correct."
      />

      <Form.Field>
        <Form.Label>
          Multi Query in FASTA format
        </Form.Label>

        <Form.Control>
          <Form.Textarea
            onChange={handleQueryChange}
            value={query}
            placeholder={queryPlaceholder}
          />
        </Form.Control>
      </Form.Field>

      <hr />

      <Form.Label>
        Alignment Options
      </Form.Label>

      <MultiQueryAlignmentOptionsForm onChange={handleOptionsChange} />

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

export default MultiQueryPeptideSearchBox;
