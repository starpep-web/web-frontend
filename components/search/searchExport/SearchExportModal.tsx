import React from 'react';
import { Modal, Button } from 'react-bulma-components';
import SearchExportForm from './SearchExportForm';
import { SearchExportFormData } from '@lib/models/export';

interface Props {
  show?: boolean
  onClose?: () => void
}

const SearchExportModal: React.FC<Props> = ({ show, onClose }) => {
  const handleFormChange = (data: SearchExportFormData) => {
    console.log(data);
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
          <SearchExportForm onChange={handleFormChange} />
        </Modal.Card.Body>

        <Modal.Card.Footer>
          <Button.Group align="right" className="is-flex-grow-1">
            <Button color="primary">
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
