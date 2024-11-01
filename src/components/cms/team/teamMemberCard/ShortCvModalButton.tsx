'use client';
import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import { Markdown } from '@components/cms/utils/markdown';
import { Maybe } from '@lib/utils/types';

interface Props {
  content?: Maybe<string>
}

export const ShortCvModalButton: React.FC<Props> = ({ content }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  if (!content) {
    return null;
  }

  return (
    <Fragment>
      <Button variant="primary" onClick={handleOpen}>
        Short CV
      </Button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton />
        <ModalBody>
          <Markdown>
            {content}
          </Markdown>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};
