import React, { useState } from 'react';
import { Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from '@components/form/dropdown';

const queryPlaceholder = '>Query\nGIGAVLKVLTTGLPALISWIKRKRQQ';

const SingleQueryPeptideSearchBox = () => {
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    console.log('submit');
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Form.Field>
        <Form.Label>
          Single Query in FASTA Format
        </Form.Label>

        <Form.Control>
          <Form.Textarea fixedSize placeholder={queryPlaceholder} />
        </Form.Control>
      </Form.Field>

      <hr />

      <Form.Label>
        Alignment Options
      </Form.Label>

      <Dropdown
        label="Substitution Matrix"
        options={['']}
        value=""
        onChange={() => null}
      />

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
