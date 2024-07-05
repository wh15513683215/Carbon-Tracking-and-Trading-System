// src/Public_Logic/ConfirmModal.js

import React from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';
import './ConfirmModal.css';

Modal.setAppElement('#root');

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, contentLabel, confirmMessage }) => {
  const fade = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `translateY(0)` : `translateY(-20px)`,
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2000,
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '12px',
          padding: '20px',
          border: 'none',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <animated.div style={fade} className="confirm-modal-content">
        <h2 className="confirm-modal-title">Confirmation</h2>
        <p className="confirm-modal-message">{confirmMessage}</p>
        <div className="confirm-modal-buttons">
          <button className="confirm-modal-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="confirm-modal-button cancel" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </animated.div>
    </Modal>
  );
};

export default ConfirmModal;
