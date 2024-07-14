import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../../constants';
import useCertification from '../Public_Logic/useCertification';
const useBuyTokens = (signer, account, balance) => {
  const gasPrice = 20; // 固定Gas价格
  const [estimatedGas, setEstimatedGas] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isCertified = useCertification(); // 调用useCertification钩子

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (signer) {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        try {
          const balance = await contract.balanceOf(account);
          setTokenBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
        } catch (error) {
          console.error('Error fetching token balance:', error);
        }
      }
    };

    fetchTokenBalance();
  }, [signer, account]);

  const buyTokens = async (buyAmount) => {
   
    if (!isCertified) {
        setErrorMessage('You are not certified to buy tokens.');
        throw new Error('You are not certified to buy tokens.');
      }

    const buyAmountInEther = parseFloat(buyAmount);
    if (isNaN(buyAmountInEther) || buyAmountInEther <= 0) {
      setErrorMessage('Please enter a valid amount of ETH to buy.');
      throw new Error('Please enter a valid amount of ETH to buy.');
    }

    const balanceInEther = parseFloat(balance);
    if (buyAmountInEther > balanceInEther) {
      setErrorMessage('Insufficient balance.');
      throw new Error('Insufficient balance.');
    }

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      setIsWaiting(true);
      setTransactionStatus('pending');

      const tx = await contract.buy({
        value: ethers.utils.parseEther(buyAmount),
        gasPrice: ethers.utils.parseUnits(gasPrice.toString(), 'gwei'),
      });
      await tx.wait();
      setTransactionStatus('success');
      setIsWaiting(false);

      // 更新token余额
      const newBalance = await contract.balanceOf(account);
      setTokenBalance(parseFloat(ethers.utils.formatEther(newBalance)).toFixed(4));
    } catch (error) {
      if (error.code === 4001) { // User rejected the transaction
        setTransactionStatus('metamask_closed');
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        setErrorMessage('Insufficient funds for gas price and value.');
        setTransactionStatus('failed');
      } else {
        setErrorMessage(error.message || 'An error occurred while buying tokens.');
        setTransactionStatus('failed');
      }
      setIsWaiting(false);
      throw error; // 确保错误被捕获
    }
  };

  return {
    gasPrice,
    estimatedGas,
    tokenBalance,
    isWaiting,
    setIsWaiting,
    transactionStatus,
    errorMessage,
    buyTokens,
  };
};

export default useBuyTokens;
