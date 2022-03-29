import React from 'react';
import { Modal, Button } from '@ahaui/react';
import reactDom from 'react-dom';

const ConfirmModal = ({ turnOff, onConfirm, message, content, onHide }) => {
  const handleCancel = () => turnOff();

  const handleConfirm = () => {
    onConfirm();
    turnOff();
  };

  return reactDom.createPortal(
    <Modal
      style={{ width: '80%', margin: 'auto' }}
      show
      size="small"
      onHide={onHide}
    >
      <Modal.Header id="dsfs">
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel} width="full">
          Cancel
        </Button>
        <Button variant="negative" onClick={handleConfirm} width="full">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById('portal'),
  );
};

export default ConfirmModal;
