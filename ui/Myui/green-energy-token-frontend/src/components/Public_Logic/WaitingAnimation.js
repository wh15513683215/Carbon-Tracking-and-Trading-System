import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';
import './WaitingAnimation.css';

Modal.setAppElement('#root');

const WaitingAnimation = ({ isActive, onRequestClose, transactionStatus }) => {
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [message, setMessage] = useState('Please confirm the transaction in MetaMask.');

  const fade = useSpring({
    opacity: isActive ? 1 : 0,
    transform: isActive ? `translateY(0)` : `translateY(-20px)`,
  });

  useEffect(() => {
    let confirmMessageTimer;

    if (isActive) {
      if (transactionStatus === 'pending') {
        setMessage('Transaction is being confirmed...');
        setShowCloseButton(false);
        confirmMessageTimer = setTimeout(() => {
          setShowCloseButton(true);
        }, 5000); // Show close button after 5 seconds
      } else if (transactionStatus === 'metamask_closed') {
        setMessage('Please confirm the transaction in MetaMask.');
        setShowCloseButton(true);
      } else if (transactionStatus === 'failed') {
        setMessage('Transaction failed. Please try again.');
        setShowCloseButton(true);
      } else if (transactionStatus === 'success') {
        setMessage('Transaction successful!');
        setShowCloseButton(true);
      } else {
        setMessage('Please confirm the transaction in MetaMask.');
        confirmMessageTimer = setTimeout(() => {
          setShowCloseButton(true);
        }, 5000); // Show close button after 5 seconds if no interaction
      }
    } else {
      setShowCloseButton(false);
      setMessage('Please confirm the transaction in MetaMask.');
    }

    return () => {
      clearTimeout(confirmMessageTimer);
    };
  }, [isActive, transactionStatus]);

  return (
    <Modal
      isOpen={isActive}
      onRequestClose={onRequestClose}
      contentLabel="Waiting"
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
      <animated.div style={fade} className="waiting-animation-content">
        <p className="waiting-animation-message">{message}</p>
        <div className="spinner"></div>
        {showCloseButton && (
          <button className="waiting-animation-close-button" onClick={onRequestClose}>
            Close
          </button>
        )}
      </animated.div>
    </Modal>
  );
};

export default WaitingAnimation;
