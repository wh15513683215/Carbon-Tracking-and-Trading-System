import React from 'react';
import { useEthereum } from './EthereumContext';

const TokenInteractions = () => {
  const { account } = useEthereum();

  return (
    <div>
      <h1>Green Energy Token</h1>
      {account ? (
        <p>Connected account: {account}</p>
      ) : (
        <p>No account connected</p>
      )}
    </div>
  );
};

export default TokenInteractions;
