import React, { Fragment, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@components/common/errorMessage';
import MultiQueryAlignmentOptionsForm from '../helpers/MultiQueryAlignmentOptionsForm';
import { postMultiQuerySearchAction } from '@actions/search/alignment/multi-query';
import { RouteDefs } from '@lib/constants/routes';
import { DEFAULT_MULTI_ALIGNMENT_OPTIONS } from '@lib/services/bioApi/helpers/search';
import { MultiQueryAlignmentOptions } from '@lib/services/bioApi/models/search';
import MagnifyingGlassIcon from '@assets/svg/icons/magnifying-glass-solid.svg';

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
      const { id } = await postMultiQuerySearchAction(query, options);
      return router.push(RouteDefs.multiQuery(id));
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
    <Form onSubmit={handleOnSubmit}>
      <ErrorMessage
        error={`Server responded with: ${error}`}
        show={!!error}
        header="Could not send your multi query alignment request"
        description="Please make sure you have specified more than one sequence to align and that the options are correct."
      />

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold" column={false}>
          Multi Query in FASTA format
        </Form.Label>

        <Form.Control
          as="textarea"
          style={{ minHeight: '300px' }}
          onChange={handleQueryChange}
          value={query}
          placeholder={queryPlaceholder}
        />
      </Form.Group>

      <hr />

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold" column={false}>
          Alignment Options
        </Form.Label>

        <MultiQueryAlignmentOptionsForm onChange={handleOptionsChange} />
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

export default MultiQueryPeptideSearchBox;
