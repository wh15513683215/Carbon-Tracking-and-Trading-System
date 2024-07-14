// src/Public_Logic/ErrorModal.js

import React from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';
import './ErrorModal.css';

Modal.setAppElement('#root');

const ErrorModal = ({ isOpen, onRequestClose, contentLabel, errorMessage }) => {
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
      <animated.div style={fade} className="error-modal-content">
        <h2 className="error-modal-title">Error</h2>
        <p className="error-modal-message">{errorMessage}</p>
        <button className="error-modal-button" onClick={onRequestClose}>
          OK
        </button>
      </animated.div>
    </Modal>
  );
};

export default ErrorModal;
