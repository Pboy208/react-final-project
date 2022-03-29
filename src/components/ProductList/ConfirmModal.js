import React from 'react';
import { Modal, Button } from '@ahaui/react';

function ConfirmModal({ onConfirm, message, content, onHide }) {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Modal
      style={{ width: '80%', margin: 'auto' }}
      show
      size="small"
      onHide={onHide}
    >
      <Modal.Header>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} width="full">
          Cancel
        </Button>
        <Button variant="negative" onClick={handleConfirm} width="full">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
