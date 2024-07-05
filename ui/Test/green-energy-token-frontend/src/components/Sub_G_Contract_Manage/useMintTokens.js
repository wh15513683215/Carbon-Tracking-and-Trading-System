// src/hooks/useMintTokens.js

import { useState } from 'react';
import { ethers } from 'ethers';
import { useEthereum } from '../../context/EthereumContext';
import { contractAddress, contractABI } from '../../constants';

const useMintTokens = () => {
  const { signer, setTotalSupply } = useEthereum();
  const [tokenAmount, setTokenAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const mintTokens = async () => {
    if (!signer) {
      setErrorMessage('No signer available');
      return;
    }

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const tx = await contract.mint(ethers.utils.parseEther(tokenAmount));
      await tx.wait();
      alert('Token supply added successfully');
      const newTotalSupply = await contract.totalSupply();
      setTotalSupply(ethers.utils.formatEther(newTotalSupply));
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding token supply:', error);
      setErrorMessage(error.message || 'An error occurred while adding token supply.');
    }
  };

  return {
    tokenAmount,
    setTokenAmount,
    errorMessage,
    setErrorMessage,
    mintTokens,
  };
};

export default useMintTokens;
