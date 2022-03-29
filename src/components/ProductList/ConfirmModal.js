import React from 'react';
import { Modal, Button } from '@ahaui/react';
import styled from 'styled-components';

function ConfirmModal({ onConfirm, message, content, onHide }) {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <StyledModal show size="small" onHide={onHide}>
      <Modal.Header>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <ModalBody>{content}</ModalBody>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} width="full">
          Cancel
        </Button>
        <Button variant="negative" onClick={handleConfirm} width="full">
          Yes
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)`
  width: '80%';
  margin: 'auto';
`;

const ModalBody = styled(Modal.Body)`
  text-align: center;
`;

export default ConfirmModal;
