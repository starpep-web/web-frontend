import React, { useState } from 'react';
import Link from 'next/link';
import { Modal, Button, Message, Content } from 'react-bulma-components';
import SearchExportForm from './SearchExportForm';
import ApproximateArchiveInformation from './ApproximateArchiveInformation';
import { SearchExportFormData, isSearchExportFormDataValid, defaultExportFormData } from '@lib/models/export';
import { ROUTES } from '@lib/constants/routes';

interface Props {
  peptideTotalCount: number

  show?: boolean
  onClose?: () => void
  onExport?: (data: SearchExportFormData) => void
}

const SearchExportModal: React.FC<Props> = ({ peptideTotalCount, show, onClose, onExport }) => {
  const [formData, setFormData] = useState<SearchExportFormData>(defaultExportFormData);
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

    onExport?.(formData);
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
