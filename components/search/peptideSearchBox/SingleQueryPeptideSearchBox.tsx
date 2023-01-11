import React, { useState } from 'react';
import { Form, Button } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';

const SingleQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return router.push(DYNAMIC_ROUTES.singleQuery(query));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Form.Field>
        <Form.Label>
          Search
        </Form.Label>
        <Form.Control>
          <Form.Input
            type="text"
            placeholder="Insert a sequence to search"
            onChange={handleInputChange}
            value={query}
          />
        </Form.Control>
      </Form.Field>

      <Button.Group align="center">
        <Button color="primary">
          Search
        </Button>
      </Button.Group>
    </form>
  );
};

export default SingleQueryPeptideSearchBox;
