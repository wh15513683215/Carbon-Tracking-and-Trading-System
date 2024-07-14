// src/components/Sub_Compensate_Detail/useCompensateDetail.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useEthereum } from '../../context/EthereumContext';
import { contractAddress, contractABI } from '../../constants';
import useCertification from '../Public_Logic/useCertification';

const useCompensateDetail = () => {
  const { signer, account, setTotalSupply } = useEthereum();
  const isCertified = useCertification();
  
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [compensateFootprint, setCompensateFootprint] = useState('');
  const [gasPrice, setGasPrice] = useState(20);
  const [buttonHover, setButtonHover] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');

  const exchangeRate = 1000;

  useEffect(() => {
    const fetchData = async () => {
      if (signer) {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        try {
          const footprint = await contract.getFootPrint(account);
          setCarbonFootprint(footprint.toString());

          const balance = await contract.balanceOf(account);
          setTokenBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, [signer, account]);

  const handleInputChange = (e) => {
    setCompensateFootprint(e.target.value);
  };

  const validateAndConfirmCompensate = () => {
    if (!compensateFootprint || isNaN(compensateFootprint) || parseFloat(compensateFootprint) <= 0) {
      setErrorMessage('Please enter a valid amount of Carbon Footprint.');
      setIsErrorModalOpen(true);
      return;
    }

    const footprintToCompensate = ethers.BigNumber.from(compensateFootprint);
    const requiredTokens = footprintToCompensate.div(exchangeRate);
    const currentBalance = ethers.utils.parseUnits(tokenBalance, 'ether');

    if (requiredTokens.gt(currentBalance)) {
      setErrorMessage('Insufficient GET token balance. Please exchange.');
      setIsErrorModalOpen(true);
      return;
    }

    const currentFootprint = ethers.BigNumber.from(carbonFootprint);

    if (footprintToCompensate.gt(currentFootprint)) {
      const maxCompensateFootprint = currentFootprint.div(exchangeRate);
      const newFootprint = currentFootprint.sub(maxCompensateFootprint.mul(exchangeRate));
      setConfirmMessage(`Current Carbon Footprint: ${carbonFootprint} units. After compensation: ${newFootprint.toString()} units. Confirm to proceed?`);
    } else {
      setConfirmMessage(`Current Carbon Footprint: ${carbonFootprint} units. After compensation: ${currentFootprint.sub(footprintToCompensate).toString()} units. Confirm to proceed?`);
    }

    setIsConfirmModalOpen(true);
  };

  const confirmCompensate = async () => {
    setIsConfirmModalOpen(false);

    if (!signer) {
      setErrorMessage('No signer found. Please connect your wallet.');
      setIsErrorModalOpen(true);
      return;
    }

    if (!isCertified) {
      setErrorMessage('You are not certified to burn tokens.');
      setIsErrorModalOpen(true);
      return;
    }

    const footprintToCompensate = ethers.BigNumber.from(compensateFootprint);
    const requiredTokens = footprintToCompensate.div(exchangeRate);

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setIsWaiting(true);
      setTransactionStatus('pending');

      const tx = await contract.compensate(footprintToCompensate, {
        gasLimit: 1000000,
        gasPrice: ethers.utils.parseUnits(gasPrice.toString(), 'gwei'),
      });
      await tx.wait();

      setTransactionStatus('success');
      setIsWaiting(false);

      // Refresh carbon footprint, token balance, and total supply after compensating
      const newFootprint = await contract.getFootPrint(account);
      setCarbonFootprint(newFootprint.toString());

      const balance = await contract.balanceOf(account);
      setTokenBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));

      const supply = await contract.totalSupply();
      setTotalSupply(parseFloat(ethers.utils.formatEther(supply)).toFixed(4));
    } catch (error) {
      if (error.code === 4001) {
        setTransactionStatus('metamask_closed');
      } else if (error.code === 'INSUFFICIENT_FUNDS') {
        setErrorMessage('Insufficient funds for gas price and value.');
        setTransactionStatus('failed');
      } else {
        setErrorMessage(error.message || 'An error occurred while compensating carbon.');
        setTransactionStatus('failed');
      }
      setIsWaiting(false);
      setIsErrorModalOpen(true);
    }
  };

  return {
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
  };
};

export default useCompensateDetail;
