// src/components/MainBoard.js

import React, { useEffect } from 'react';
import { useEthereum } from '../context/EthereumContext';
import useCertification from './Public_Logic/useCertification';

const MainBoard = () => {
  const { account, isOwner, balance } = useEthereum();
  const isCertified = useCertification();

  useEffect(() => {
    console.log('Account:', account);
    console.log('Is Owner:', isOwner);
    console.log('Balance:', balance);
  }, [account, isOwner, balance]);

  const containerStyle = {
    width: 'calc(100% - 262px)', 
    marginLeft: '262px', 
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: isOwner ? '#EDF9FC' : '#F7FCED',
  };

  const boardStyle = {
    width: '100%',
    height: 165,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: isOwner ? '#EDF9FC' : '#F7FCED',
  };

  const innerContainerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
  };

  const textContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const hiTextStyle = {
    color: 'black',
    fontSize: 50,
    fontFamily: 'Roboto Serif',
    fontWeight: '400',
    marginRight: '10px',
  };

  const ownerTextStyle = {
    color: 'black',
    fontSize: isOwner ? 40 : 25,
    fontFamily: 'Roboto Serif',
    fontWeight: '500',
  };

  const ethContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  };

  const ethBalanceStyle = {
    textAlign: 'right',
    color: 'black',
    fontSize: 30,
    fontFamily: 'Roboto Slab',
    fontWeight: '400',
  };

  const dividerStyle = {
    width: 3,
    height: 60,
    borderRight: '3px solid rgba(0, 0, 0, 0.44)',
  };

  const balanceContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  };

  const balanceTextStyle = {
    textAlign: 'right',
    color: 'black',
    fontSize: 40,
    fontFamily: 'Times New Roman',
    fontWeight: '400',
  };

  const imageStyle = {
    width: 50,
    height: 50,
  };

  return (
    <div style={containerStyle}>
      <div style={boardStyle}>
        <div style={innerContainerStyle}>
          <div style={textContainerStyle}>
            <span style={hiTextStyle}>Hi!</span>
            <span style={ownerTextStyle}>{isOwner ? 'Contract Owner' : `Address: ${account}`}</span>
          </div>
          <div style={ethContainerStyle}>
            <div style={ethBalanceStyle}>ETH Balance</div>
            <div style={dividerStyle}></div>
            <div style={balanceContainerStyle}>
              <div style={balanceTextStyle}>{parseFloat(balance).toFixed(4)}</div>
              <img style={imageStyle} src="Main_Board/ETH.png" alt="Balance Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBoard;
