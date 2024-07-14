import React from 'react';
import { useEthereum } from '../context/EthereumContext';

const StatusBar = () => {
  const { account, balance, isOwner, ownerAddress, totalSupply } = useEthereum();

  const statusStyle = {
    color: isOwner ? 'red' : 'green',
  };

  return (
    <div style={{ padding: '10px', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
      {account ? (
        <div>
          <span style={statusStyle}>Wallet Connected successfully: {account}</span>
          <span style={{ marginLeft: '20px' }}>Balance: {balance} ETH</span>
          {isOwner && <span style={{ marginLeft: '20px' }}>(Contract Owner)</span>}
          <div style={{ marginTop: '10px' }}>
            <span>Contract Owner: {ownerAddress}</span>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span>Total Supply: {totalSupply} GET</span>
          </div>
        </div>
      ) : (
        <span>No Wallet Connected</span>
      )}
    </div>
  );
};

export default StatusBar;
