import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../constants';

const EthereumContext = createContext();

export const EthereumProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [contractBalance, setContractBalance] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [certifiedCompanies, setCertifiedCompanies] = useState([]);
  const [certifiedIotDevices, setCertifiedIotDevices] = useState([]);
  const [carbonFootprintRecords, setCarbonFootprintRecords] = useState([]);

  const initEthereum = async (accounts = null) => {
    if (window.ethereum) {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(ethProvider);

      try {
        if (!accounts) {
          accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        }
        const lowerCaseAccount = accounts[0].toLowerCase();
        setAccount(lowerCaseAccount); // 存储为小写格式
        const ethSigner = ethProvider.getSigner();
        setSigner(ethSigner);

        const balance = await ethProvider.getBalance(lowerCaseAccount);
        setBalance(ethers.utils.formatEther(balance));

        const contract = new ethers.Contract(contractAddress, contractABI, ethSigner);
        const owner = await contract.owner();
        setOwnerAddress(owner);
        setIsOwner(owner.toLowerCase() === lowerCaseAccount);

        const contractBal = await ethProvider.getBalance(contractAddress);
        setContractBalance(ethers.utils.formatUnits(contractBal, 'ether')); // Convert balance to ether

        const supply = await contract.totalSupply();
        setTotalSupply(ethers.utils.formatUnits(supply, 'ether')); // Convert supply to ether

        const companies = await contract.getCertifiedAddresses();
        const devices = await Promise.all(companies.map(async (company) => await contract.getIOT(company)));
        setCertifiedCompanies(companies.map(addr => addr.toLowerCase())); // 存储为小写格式
        setCertifiedIotDevices(devices.map(addr => addr.toLowerCase())); // 存储为小写格式

      } catch (error) {
        console.error('Error connecting to Ethereum:', error);
      }
    } else {
      console.log('Ethereum wallet not detected');
    }
  };

  useEffect(() => {
    initEthereum();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        initEthereum(accounts); // Re-initialize to get new account information
      });
    }
  }, []);

  const addCarbonFootprintRecord = (company, footprint) => {
    setCarbonFootprintRecords(records => [
      ...records,
      {
        timestamp: new Date().toLocaleString(),
        company: company.toLowerCase(), // 存储为小写格式
        footprint
      }
    ]);
  };

  return (
    <EthereumContext.Provider value={{ 
      provider, signer, account, balance, isOwner, ownerAddress, 
      contractAddress, contractBalance, totalSupply, certifiedCompanies, certifiedIotDevices, 
      carbonFootprintRecords, setTotalSupply, setCertifiedCompanies, setCertifiedIotDevices, 
      addCarbonFootprintRecord
    }}>
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = () => useContext(EthereumContext);
