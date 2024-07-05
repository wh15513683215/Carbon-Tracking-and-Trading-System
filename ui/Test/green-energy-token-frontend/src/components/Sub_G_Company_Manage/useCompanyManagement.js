// src/hooks/useCompanyManagement.js

import { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../../constants'
import { useEthereum } from '../../context/EthereumContext';

const useCompanyManagement = () => {
  const { signer, setCertifiedCompanies, setCertifiedIotDevices, addCarbonFootprintRecord } = useEthereum();
  const [companyAddress, setCompanyAddress] = useState('');
  const [iotDeviceAddress, setIotDeviceAddress] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authorizeCompany = async () => {
    if (signer) {
      if (!ethers.utils.isAddress(companyAddress)) {
        setErrorMessage('Invalid company address');
        return;
      }
      if (!ethers.utils.isAddress(iotDeviceAddress)) {
        setErrorMessage('Invalid IoT device address');
        return;
      }
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const tx = await contract.approveIOT(companyAddress, iotDeviceAddress);
        await tx.wait();
        alert('Company authorized successfully');
        fetchCertifiedCompanies();
      } catch (error) {
        console.error('Error authorizing company:', error);
        setErrorMessage(`Error authorizing company: ${error.message}`);
      }
    }
  };

  const fetchCertifiedCompanies = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const companies = await contract.getCertifiedAddresses();
      const devices = await Promise.all(companies.map(async (company) => await contract.getIOT(company)));
      setCertifiedCompanies(companies);
      setCertifiedIotDevices(devices);
    }
  };

  const addCarbonFootprint = async () => {
    if (!ethers.utils.isAddress(companyAddress)) {
      setErrorMessage('Invalid company address');
      return;
    }
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const iotDeviceAddress = await contract.getIOT(companyAddress.toLowerCase());
      if (iotDeviceAddress === ethers.constants.AddressZero) {
        setErrorMessage('Company is not certified');
        return;
      }
      const tx = await contract.addFootprint(companyAddress.toLowerCase(), carbonFootprint);
      await tx.wait();
      alert('Carbon footprint added successfully');
      addCarbonFootprintRecord(companyAddress.toLowerCase(), carbonFootprint);
    } catch (error) {
      console.error('Error adding carbon footprint:', error);
      setErrorMessage(error.message || 'An error occurred while adding carbon footprint.');
    }
  };

  return {
    companyAddress,
    setCompanyAddress,
    iotDeviceAddress,
    setIotDeviceAddress,
    carbonFootprint,
    setCarbonFootprint,
    errorMessage,
    setErrorMessage,
    authorizeCompany,
    fetchCertifiedCompanies,
    addCarbonFootprint,
  };
};

export default useCompanyManagement;
