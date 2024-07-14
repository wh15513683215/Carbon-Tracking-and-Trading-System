// src/components/Header.js

import React from 'react';
import { useEthereum } from '../context/EthereumContext';
import useCertification from './Public_Logic/useCertification';

const Header = () => {
  const { account, isOwner } = useEthereum();
  const isCertified = useCertification();

  const handleMetaMaskClick = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        console.log('Requesting MetaMask connection...');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected accounts:', accounts);
        alert('MetaMask is installed and connected');
      } catch (error) {
        console.error('User rejected the request:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  };

  const headerStyle = {
    width: '100%',
    height: '66px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: isOwner ? '#EDF9FC' : '#F7FCED',
  };

  const containerStyle = {
    width: '1800px',
    height: '66px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  };

  const imageContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '25px',
  };

  const searchBarContainerStyle = {
    width: '450px',
    height: '45px',
    position: 'relative',
  };

  const searchBarBackgroundStyle = {
    width: '450px',
    height: '45px',
    position: 'absolute',
    background: 'white',
    borderRadius: '30px',
  };

  const searchBarTextStyle = {
    width: '200px',
    height: '26px',
    position: 'absolute',
    left: '14px',
    top: '10px',
    color: 'rgba(0, 0, 0, 0.50)',
    fontSize: '24px',
    fontFamily: 'Roboto',
    fontWeight: '400',
  };

  const footerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const footerTextStyle = {
    color: 'black',
    fontSize: '25px',
    fontFamily: 'Seaweed Script',
    fontWeight: '600',
  };

  return (
    <div style={headerStyle}>
      <div style={containerStyle}>
        <div style={footerStyle}>
          <img width={50} height={44} src="/Header/Trademark.svg" alt="Logo" />
          <div style={footerTextStyle}>CarbonTracing</div>
        </div>
        <div style={searchBarContainerStyle}>
          <div style={searchBarBackgroundStyle} />
          <div style={searchBarTextStyle}>Search Address</div>
        </div>
        <div style={imageContainerStyle}>
          <img style={{ width: '60px', height: '60px' }} src={isCertified ? "/Header/AuthoT.png" : "/Header/AuthoF.png"} alt={isCertified ? "AuthoT" : "AuthoF"} />
          <img 
            style={{ width: '50px', height: '50px', borderRadius: '9999px' }} 
            src={account ? "/Header/ConnectStatusT.png" : "/Header/ConnectStatusF.png"} 
            alt={account ? "Connected" : "Disconnected"} 
          />
          <img style={{ width: '52.5px', height: '60px' }} src="/Header/reminder.png" alt="reminder" />
          <img 
            style={{ width: '64px', height: '66px', mixBlendMode: 'darken', cursor: 'pointer' }} 
            src="/Header/MetaMask.png" 
            alt="MetaMask.png" 
            onClick={handleMetaMaskClick} // 添加点击事件处理函数
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
