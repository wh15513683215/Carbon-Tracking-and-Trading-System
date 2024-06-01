import React, { useEffect } from 'react';
import { useEthereum } from '../context/EthereumContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { account } = useEthereum();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate('/dashboard');  // Redirect to dashboard if account is connected
    }
  }, [account, navigate]);

  return (
    <div>
      <h1>Welcome to Green Energy Token Platform</h1>
      {account ? (
        <p>Wallet connected successfully: {account}</p>
      ) : (
        <p>Please connect your wallet to proceed.</p>
      )}
    </div>
  );
};

export default HomePage;
