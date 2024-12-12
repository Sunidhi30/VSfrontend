import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-body">
        <button className="modal-close" onClick={onRequestClose}>X</button>
        <h2>Confirmation</h2>
        <p>Are you sure you want to cast your vote? Once submitted, it cannot be changed.</p>
        <div className="modal-footer">
        <button onClick={onRequestClose} className="btn-cancel">Cancel</button>

          <button onClick={onConfirm} className="btn-confirm">Confirm</button>
          {/* <button onClick={onRequestClose} className="btn-cancel">Cancel</button> */}
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
