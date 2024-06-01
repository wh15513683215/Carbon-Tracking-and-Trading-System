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
  const [totalSupply, setTotalSupply] = useState(null);
  const [certifiedCompanies, setCertifiedCompanies] = useState([]);
  const [certifiedIotDevices, setCertifiedIotDevices] = useState([]);
  const [carbonFootprintRecords, setCarbonFootprintRecords] = useState([]);

  useEffect(() => {
    const initEthereum = async () => {
      if (window.ethereum) {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);

        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
          const ethSigner = ethProvider.getSigner();
          setSigner(ethSigner);

          const balance = await ethProvider.getBalance(accounts[0]);
          setBalance(ethers.utils.formatEther(balance));

          const contract = new ethers.Contract(contractAddress, contractABI, ethSigner);
          const owner = await contract.owner();
          setOwnerAddress(owner);
          setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());

          const supply = await contract.totalSupply();
          setTotalSupply(ethers.utils.formatEther(supply));

          const companies = await contract.getCertifiedAddresses();
          const devices = await Promise.all(companies.map(async (company) => await contract.getIOT(company)));
          setCertifiedCompanies(companies);
          setCertifiedIotDevices(devices);

          const records = await contract.getFootprintRecords();
          const formattedRecords = records.map(record => ({
            timestamp: new Date(record.timestamp.toNumber() * 1000).toLocaleString(),
            company: record.company,
            footprint: record.footprint.toString()
          }));
          setCarbonFootprintRecords(formattedRecords);
        } catch (error) {
          console.error('Error connecting to Ethereum:', error);
        }
      } else {
        console.log('Ethereum wallet not detected');
      }
    };

    initEthereum();
  }, []);

  const addCarbonFootprintRecord = (company, footprint) => {
    setCarbonFootprintRecords(records => [
      ...records,
      {
        timestamp: new Date().toLocaleString(),
        company,
        footprint
      }
    ]);
  };

  return (
    <EthereumContext.Provider value={{ 
      provider, signer, account, balance, isOwner, ownerAddress, 
      totalSupply, certifiedCompanies, certifiedIotDevices, 
      carbonFootprintRecords, setTotalSupply, setCertifiedCompanies, setCertifiedIotDevices, 
      addCarbonFootprintRecord
    }}>
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = () => useContext(EthereumContext);
