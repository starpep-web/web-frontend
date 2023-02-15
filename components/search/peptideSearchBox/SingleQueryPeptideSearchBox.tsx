import React, { useState } from 'react';
import { Form, Button, Box } from 'react-bulma-components';
import { useRouter } from 'next/router';
import { DYNAMIC_ROUTES } from '@lib/constants/routes';
import { DebouncedSearchInput } from '@components/form/debouncedSearchInput';
import { getDatabaseSuggestions, getFunctionSuggestions } from '@lib/services/localApi/searchService';

const SingleQueryPeptideSearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    return router.push(DYNAMIC_ROUTES.singleQuery(query));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toUpperCase());
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

      <Box>
        <Form.Label>
          Filter By Metadata
        </Form.Label>

        <DebouncedSearchInput dataFetch={getDatabaseSuggestions} label="Database" placeholder="Search by Database" icon="d" />
        <DebouncedSearchInput dataFetch={getFunctionSuggestions} label="Function" placeholder="Search by Function" icon="f" />
      </Box>

      <Button.Group align="center">
        <Button color="primary">
          Search
        </Button>
      </Button.Group>
    </form>
  );
};

export default SingleQueryPeptideSearchBox;
