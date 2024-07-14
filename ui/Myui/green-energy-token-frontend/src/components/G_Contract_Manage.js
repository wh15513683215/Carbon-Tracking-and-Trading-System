// src/components/G_Contract_Manage.js

import React, { useState } from 'react';
import {
  containerStyle,
  bannerImageStyle,
  overlayStyle,
  textContainerStyle,
  smallTextStyle,
  largeTextStyle,
  imagesContainerStyle,
  smallImageStyle,
  buttonStyle,
  closeButtonStyle,
  inputStyle, // Ensure inputStyle is imported
  modalTitleStyle,
  errorMessageStyle,
} from './Sub_G_Contract_Manage/G_Contract_ManageStyles';
import useMintTokens from './Sub_G_Contract_Manage/useMintTokens';
import useWithdraw from './Sub_G_Contract_Manage/useWithdraw';
import AnimatedModal from './Public_Logic/AnimatedModal';
import WaitingAnimation from './Public_Logic/WaitingAnimation'; // Import the waiting animation

const G_Contract_Manage = () => {
  const {
    tokenAmount,
    setTokenAmount,
    errorMessage: mintErrorMessage,
    setErrorMessage: setMintErrorMessage,
    mintTokens,
  } = useMintTokens();

  const {
    errorMessage: withdrawErrorMessage,
    setErrorMessage: setWithdrawErrorMessage,
    withdrawEther,
  } = useWithdraw();

  const [mintModalIsOpen, setMintModalIsOpen] = useState(false);
  const [withdrawModalIsOpen, setWithdrawModalIsOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false); // State for waiting animation

  const openMintModal = () => setMintModalIsOpen(true);
  const closeMintModal = () => {
    setMintModalIsOpen(false);
    setMintErrorMessage('');
  };

  const openWithdrawModal = () => setWithdrawModalIsOpen(true);
  const closeWithdrawModal = () => {
    setWithdrawModalIsOpen(false);
    setWithdrawErrorMessage('');
  };

  const handleMintTokens = async () => {
    setIsWaiting(true);
    try {
      await mintTokens();
      setIsWaiting(false);
      closeMintModal();
    } catch (error) {
      setIsWaiting(false);
    }
  };

  const handleWithdrawEther = async () => {
    setIsWaiting(true);
    try {
      await withdrawEther();
      setIsWaiting(false);
      closeWithdrawModal();
    } catch (error) {
      setIsWaiting(false);
    }
  };

  return (
    <div style={containerStyle}>
      <img
        style={bannerImageStyle}
        src="/G_Contract_Manage/Background.png"
        alt="Banner"
      />
      <div style={overlayStyle}>
        <div style={textContainerStyle}>
          <div style={smallTextStyle}>Welcome to</div>
          <div style={largeTextStyle}>Contract Management</div>
        </div>
        <div style={imagesContainerStyle}>
          <img
            style={smallImageStyle}
            src="/G_Contract_Manage/Mining.png"
            alt="Mining"
            onClick={openMintModal}
          />
          <img
            style={smallImageStyle}
            src="/G_Contract_Manage/Withdraw.png"
            alt="Withdraw"
            onClick={openWithdrawModal}
          />
        </div>
      </div>

      <AnimatedModal
        isOpen={mintModalIsOpen}
        onRequestClose={closeMintModal}
        contentLabel="Mint Tokens"
      >
        <h2 style={modalTitleStyle}>Mint Tokens</h2>
        <input
          type="text"
          placeholder="Token Amount"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleMintTokens} style={buttonStyle}>Mint</button>
        {mintErrorMessage && <div style={errorMessageStyle}>{mintErrorMessage}</div>}
        <button onClick={closeMintModal} style={closeButtonStyle}>Close</button>
      </AnimatedModal>

      <AnimatedModal
        isOpen={withdrawModalIsOpen}
        onRequestClose={closeWithdrawModal}
        contentLabel="Withdraw Ether"
      >
        <h2 style={modalTitleStyle}>Withdraw Ether</h2>
        <button onClick={handleWithdrawEther} style={buttonStyle}>Withdraw</button>
        {withdrawErrorMessage && <div style={errorMessageStyle}>{withdrawErrorMessage}</div>}
        <button onClick={closeWithdrawModal} style={closeButtonStyle}>Close</button>
      </AnimatedModal>

      <WaitingAnimation isActive={isWaiting} /> {/* Add the waiting animation */}
    </div>
  );
};

export default G_Contract_Manage;
