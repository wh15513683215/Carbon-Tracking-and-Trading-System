// src/components/G_Company_Manage.js

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
  inputStyle,
  modalTitleStyle,
  errorMessageStyle,
} from './Sub_G_Company_Manage/G_Company_ManageStyles';
import useCompanyManagement from './Sub_G_Company_Manage/useCompanyManagement';
import AnimatedModal from './Public_Logic/AnimatedModal';
import WaitingAnimation from './Public_Logic/WaitingAnimation'; // Correct import

const G_Company_Manage = () => {
  const {
    companyAddress,
    setCompanyAddress,
    iotDeviceAddress,
    setIotDeviceAddress,
    carbonFootprint,
    setCarbonFootprint,
    errorMessage,
    setErrorMessage,
    authorizeCompany,
    addCarbonFootprint,
  } = useCompanyManagement();

  const [authorizeModalIsOpen, setAuthorizeModalIsOpen] = useState(false);
  const [carbonModalIsOpen, setCarbonModalIsOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const openAuthorizeModal = () => setAuthorizeModalIsOpen(true);
  const closeAuthorizeModal = () => {
    setAuthorizeModalIsOpen(false);
    setErrorMessage('');
  };

  const openCarbonModal = () => setCarbonModalIsOpen(true);
  const closeCarbonModal = () => {
    setCarbonModalIsOpen(false);
    setErrorMessage('');
  };

  const handleAuthorizeCompany = async () => {
    setIsWaiting(true);
    try {
      await authorizeCompany();
      setIsWaiting(false);
      closeAuthorizeModal();
    } catch (error) {
      setIsWaiting(false);
    }
  };

  const handleAddCarbonFootprint = async () => {
    setIsWaiting(true);
    try {
      await addCarbonFootprint();
      setIsWaiting(false);
      closeCarbonModal();
    } catch (error) {
      setIsWaiting(false);
    }
  };

  return (
    <div style={containerStyle}>
      <img
        style={bannerImageStyle}
        src="/G_Company_Manage/Background.png"
        alt="Banner"
      />
      <div style={overlayStyle}>
        <div style={textContainerStyle}>
          <div style={smallTextStyle}>Welcome to</div>
          <div style={largeTextStyle}>Company Management</div>
        </div>
        <div style={imagesContainerStyle}>
          <img
            style={smallImageStyle}
            src="/G_Company_Manage/Authority.png"
            alt="Authority"
            onClick={openAuthorizeModal}
          />
          <img
            style={smallImageStyle}
            src="/G_Company_Manage/CarbonAdd.png"
            alt="Carbon Add"
            onClick={openCarbonModal}
          />
        </div>
      </div>

      <AnimatedModal
        isOpen={authorizeModalIsOpen}
        onRequestClose={closeAuthorizeModal}
        contentLabel="Authorize Company"
      >
        <h2 style={modalTitleStyle}>Authorize Company</h2>
        <input
          type="text"
          placeholder="Company Address"
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="IoT Device Address"
          value={iotDeviceAddress}
          onChange={(e) => setIotDeviceAddress(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAuthorizeCompany} style={buttonStyle}>Authorize</button>
        {errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
        <button onClick={closeAuthorizeModal} style={closeButtonStyle}>Close</button>
      </AnimatedModal>

      <AnimatedModal
        isOpen={carbonModalIsOpen}
        onRequestClose={closeCarbonModal}
        contentLabel="Add Carbon Footprint"
      >
        <h2 style={modalTitleStyle}>Add Carbon Footprint</h2>
        <input
          type="text"
          placeholder="Company Address"
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Carbon Footprint Amount"
          value={carbonFootprint}
          onChange={(e) => setCarbonFootprint(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAddCarbonFootprint} style={buttonStyle}>Add Carbon Footprint</button>
        {errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
        <button onClick={closeCarbonModal} style={closeButtonStyle}>Close</button>
      </AnimatedModal>

      <WaitingAnimation isActive={isWaiting} />
    </div>
  );
};

export default G_Company_Manage;
