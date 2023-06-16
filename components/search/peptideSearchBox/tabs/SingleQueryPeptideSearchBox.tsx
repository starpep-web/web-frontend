import React, { useState } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SingleQueryAlignmentOptions from '../helpers/SingleQueryAlignmentOptions';

const queryPlaceholder = '>Query\nGIGAVLKVLTTGLPALISWIKRKRQQ';

const SingleQueryPeptideSearchBox = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [options, setOptions] = useState<Record<string, any>>({});

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    console.log({ query, options });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleOptionsChange = (options: Record<string, any>) => {
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

      <SingleQueryAlignmentOptions onChange={handleOptionsChange} />

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
