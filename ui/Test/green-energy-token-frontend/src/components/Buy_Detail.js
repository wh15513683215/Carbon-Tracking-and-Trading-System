import React, { useState } from 'react';
import { useEthereum } from '../context/EthereumContext';
import useBuyTokens from './Sub_Buy_Detail/useBuyTokens';
import ErrorModal from './Public_Logic/ErrorModal';
import WaitingAnimation from './Public_Logic/WaitingAnimation';
import {
  containerStyle,
  upperContentStyle,
  imgStyle,
  rateTextStyle,
  rateContainerStyle,
  rateInnerContainerStyle,
  ratePartStyle,
  rateImageStyle,
  rateValueStyle,
  equalSignStyle,
  lowerRatePartStyle,
  lowerRateValueStyle,
  lowerRateImageContainerStyle,
  lowerRateImageStyle,
  lowerContainerStyle,
  lowerImgStyle,
  lowerContentContainerStyle,
  balanceStyle,
  balanceTextStyle,
  tokenIconStyle,
  lowerTextBoxStyle,
  lowerTextInputStyle,
  lowerButtonStyle,
  lowerButtonHoverStyle,
  lowerButtonTextStyle,
} from './Sub_Buy_Detail/BuyDetailStyles';

const BuyDetail = () => {
  const { signer, account, balance } = useEthereum();
  const [buyAmount, setBuyAmount] = useState('');
  const {
    estimatedGas,
    tokenBalance,
    isWaiting,
    setIsWaiting,
    transactionStatus,
    errorMessage,
    buyTokens,
  } = useBuyTokens(signer, account, balance);
  const [buttonHover, setButtonHover] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleBuyTokens = async () => {
    try {
      await buyTokens(buyAmount);
      setIsErrorModalOpen(false);
    } catch (error) {
      setIsErrorModalOpen(true);
    }
  };

  const closeWaitingAnimation = () => {
    setIsWaiting(false);
  };

  return (
    <div style={containerStyle}>
      <div style={upperContentStyle}>
        <img style={imgStyle} src="/Buy_Detail/Top.png" alt="Placeholder" />
        <div style={rateTextStyle}>BUY RATE :</div>
        <div style={rateContainerStyle}>
          <div style={rateInnerContainerStyle}>
            <div style={ratePartStyle}>
              <img style={rateImageStyle} src="/Buy_Detail/ETH.png" alt="Placeholder" />
              <div style={rateValueStyle}>1</div>
            </div>
            <div style={equalSignStyle}>=</div>
            <div style={lowerRatePartStyle}>
              <div style={lowerRateValueStyle}>1</div>
              <div style={lowerRateImageContainerStyle}>
                <img style={rateImageStyle} src="/Buy_Detail/Get.png" alt="Placeholder" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={lowerContainerStyle}>
        <img style={lowerImgStyle} src="/Buy_Detail/Bottom.png" alt="Placeholder" />
        <div style={lowerContentContainerStyle}>
          <div style={balanceStyle}>
            <div style={balanceTextStyle}>{parseFloat(tokenBalance).toFixed(4)}</div>
            <img style={tokenIconStyle} src="/Buy_Detail/Get.png" alt="Token Icon" />
          </div>
          <div style={lowerTextBoxStyle}>
            <input
              type="text"
              style={lowerTextInputStyle}
              placeholder="Enter amount of ETH to buy"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
            />
          </div>
          <div
            style={{ ...lowerButtonStyle, ...(buttonHover ? lowerButtonHoverStyle : {}) }}
            onClick={handleBuyTokens}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            <div style={lowerButtonTextStyle}>Buy</div>
          </div>
        </div>
      </div>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onRequestClose={() => setIsErrorModalOpen(false)}
        errorMessage={errorMessage}
      />
      <WaitingAnimation 
        isActive={isWaiting} 
        onRequestClose={closeWaitingAnimation} 
        transactionStatus={transactionStatus} 
      />
    </div>
  );
};

export default BuyDetail;
