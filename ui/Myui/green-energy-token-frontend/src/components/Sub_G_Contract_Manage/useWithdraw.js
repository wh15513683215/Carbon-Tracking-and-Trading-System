// src/hooks/useWithdraw.js

import { useState } from 'react';
import { ethers } from 'ethers';
import { useEthereum } from '../../context/EthereumContext';
import { contractAddress, contractABI } from '../../constants';

const useWithdraw = () => {
  const { signer, isOwner } = useEthereum();
  const [errorMessage, setErrorMessage] = useState('');

  const withdrawEther = async () => {
    if (!signer || !isOwner) {
      setErrorMessage('Only the owner can withdraw Ether');
      return;
    }

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      alert('Ether withdrawn successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error withdrawing Ether:', error);
      setErrorMessage(error.message || 'An error occurred while withdrawing Ether.');
    }
  };

  return {
    errorMessage,
    setErrorMessage,
    withdrawEther,
  };
};

export default useWithdraw;
