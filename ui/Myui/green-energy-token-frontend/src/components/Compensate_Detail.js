import React from 'react';
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
  lowerTextBoxStyle,
  lowerTextInputStyle,
  lowerButtonStyle,
  lowerButtonHoverStyle,
  lowerButtonTextStyle,
} from './Sub_Compensate_Detail/CompensateDetailStyles';
import ErrorModal from './Public_Logic/ErrorModal';
import WaitingAnimation from './Public_Logic/WaitingAnimation';
import ConfirmModal from './Public_Logic/ConfirmModal';
import useCompensateDetail from './Sub_Compensate_Detail/useCompensateDetail';

const CompensateDetail = () => {
  const {
    carbonFootprint,
    tokenBalance,
    compensateFootprint,
    gasPrice,
    buttonHover,
    isWaiting,
    transactionStatus,
    errorMessage,
    isErrorModalOpen,
    isConfirmModalOpen,
    confirmMessage,
    setButtonHover,
    setIsErrorModalOpen,
    setIsWaiting,
    setTransactionStatus,
    handleInputChange,
    validateAndConfirmCompensate,
    confirmCompensate,
    setIsConfirmModalOpen,
  } = useCompensateDetail();

  return (
    <div style={containerStyle}>
      <div style={upperContentStyle}>
        <img style={imgStyle} src="/Compensate_Detail/Top.png" alt="Placeholder" />
        <div style={rateTextStyle}>COMPENSATE RATE :</div>
        <div style={rateContainerStyle}>
          <div style={rateInnerContainerStyle}>
            <div style={ratePartStyle}>
              <img style={rateImageStyle} src="/Compensate_Detail/Get.png" alt="Placeholder" />
              <div style={rateValueStyle}>1</div>
            </div>
            <div style={equalSignStyle}>=</div>
            <div style={lowerRatePartStyle}>
              <div style={lowerRateValueStyle}>1000</div>
              <div style={lowerRateImageContainerStyle}>
                <img style={lowerRateImageStyle} src="/Compensate_Detail/Carbon.png" alt="Placeholder" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={lowerContainerStyle}>
        <img style={lowerImgStyle} src="/Compensate_Detail/Bottom.png" alt="Placeholder" />
        <div style={lowerContentContainerStyle}>
          <div style={balanceStyle}>
            <div style={balanceTextStyle}>{carbonFootprint}</div>
            <img style={rateImageStyle} src="/Compensate_Detail/Carbon.png" alt="Balance Icon" />
          </div>
          <div style={lowerTextBoxStyle}>
            <input
              type="text"
              style={lowerTextInputStyle}
              placeholder="Enter amount of Carbon Footprint"
              value={compensateFootprint}
              onChange={handleInputChange}
            />
          </div>
          <div
            style={{ ...lowerButtonStyle, ...(buttonHover ? lowerButtonHoverStyle : {}) }}
            onClick={validateAndConfirmCompensate}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            <div style={lowerButtonTextStyle}>Burn</div>
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
        onRequestClose={() => setIsWaiting(false)} 
        transactionStatus={transactionStatus} 
      />
      <ConfirmModal 
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmCompensate}
        confirmMessage={confirmMessage}
      />
    </div>
  );
};

export default CompensateDetail;
