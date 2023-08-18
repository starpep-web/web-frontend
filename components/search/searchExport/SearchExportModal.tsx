import React, { useState } from 'react';
import { Modal, Button, Message } from 'react-bulma-components';
import SearchExportForm from './SearchExportForm';
import { SearchExportFormData, isSearchExportFormDataValid, defaultExportFormData } from '@lib/models/export';

interface Props {
  show?: boolean
  onClose?: () => void
  onExport?: (data: SearchExportFormData) => void
}

const SearchExportModal: React.FC<Props> = ({ show, onClose, onExport }) => {
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
