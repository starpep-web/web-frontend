import React, { useState } from 'react';
import Link from 'next/link';
import { Modal, Button, Message, Content } from 'react-bulma-components';
import SearchExportForm from './SearchExportForm';
import ApproximateArchiveInformation from './ApproximateArchiveInformation';
import { ComingSoonPlaceholder } from '@components/common/comingSoon';
import {
  SearchExportFormData,
  isSearchExportFormDataValid,
  DEFAULT_EXPORT_FORM_DATA,
  SearchType,
  ExportRequestPayload
} from '@lib/models/export';
import { ROUTES } from '@lib/constants/routes';

interface Props {
  peptideTotalCount: number
  searchType: SearchType
  exportPayloadData: string

  show?: boolean
  onClose?: () => void
  onSuccess?: () => void
}

const SearchExportModal: React.FC<Props> = ({ peptideTotalCount, searchType, exportPayloadData, show, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<SearchExportFormData>(DEFAULT_EXPORT_FORM_DATA);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (data: SearchExportFormData) => {
    setError(null);
    setFormData(data);
  };

  const handleExportClick = () => {
    if (!isSearchExportFormDataValid(formData)) {
      setError('Please choose at least one item to include in your search export.');
      return;
    }

    const payload: ExportRequestPayload = {
      type: searchType,
      form: formData,
      data: exportPayloadData
    };
    console.log('Will send the following payload:');
    console.log(payload);

    onSuccess?.();
  };

  return (
    <Modal show={show} onClose={onClose} showClose={false} closeOnEsc>
      <Modal.Card>
        <Modal.Card.Header showClose={false}>
          <Modal.Card.Title>
            Export this Search
          </Modal.Card.Title>
        </Modal.Card.Header>

        <Modal.Card.Body>
          <ComingSoonPlaceholder />

          <Content>
            <p>
              Export this search by choosing what items you would like to include in the export archive.
              This archive will include all the files that you choose below for every peptide that was matched by your search.
              You should choose at least one item to include in your exports archive.
            </p>

            <p>
              Keep in mind that the server will need some time to generate the exports
              archive, <strong>this process can take quite some time</strong> depending on the number of peptides matched
              by your search and the items you decide to include.
              Each archive <strong>will be available to download for up to 24 hours</strong>, after that,
              the server will remove it, and you will have to re-export it in case you need it again.
            </p>

            <p>
              Also, if you prefer to download any item for the entire database,
              feel free to check the <Link href={ROUTES.downloads}>downloads page</Link> where you will find archives
              that include any assets for all peptides in the database.
            </p>
          </Content>

          {
            error && (
              <Message color="danger">
                <Message.Body>
                  <p>
                    {error}
                  </p>
                </Message.Body>
              </Message>
            )
          }

          <SearchExportForm
            initialData={formData}
            onChange={handleFormChange}
          />

          <ApproximateArchiveInformation peptideTotalCount={peptideTotalCount} exportedItems={formData} />
        </Modal.Card.Body>

        <Modal.Card.Footer>
          <Button.Group align="right" className="is-flex-grow-1">
            <Button color="primary" onClick={handleExportClick}>
              Export
            </Button>

            <Button onClick={onClose}>
              Cancel
            </Button>
          </Button.Group>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  );
};

export default SearchExportModal;
