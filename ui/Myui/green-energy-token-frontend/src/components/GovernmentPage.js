import React, { useState, useEffect } from 'react';
import { useEthereum } from '../context/EthereumContext';
import { contractAddress, contractABI } from '../constants';
import { ethers } from 'ethers';

const GovernmentPage = () => {
  const { signer, certifiedCompanies, certifiedIotDevices, setCertifiedCompanies, setCertifiedIotDevices, setTotalSupply, carbonFootprintRecords, setCarbonFootprintRecords, addCarbonFootprintRecord, isOwner, fetchBalance } = useEthereum();
  const [companyAddress, setCompanyAddress] = useState('');
  const [iotDeviceAddress, setIotDeviceAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState('');
  const [companyForCarbon, setCompanyForCarbon] = useState('');

  useEffect(() => {
    fetchFootprintRecords();
  }, [signer]);

  const authorizeCompany = async () => {
    if (signer) {
      if (!ethers.utils.isAddress(companyAddress)) {
        alert('Invalid company address');
        return;
      }
      if (!ethers.utils.isAddress(iotDeviceAddress)) {
        alert('Invalid IoT device address');
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
        alert(`Error authorizing company: ${error.message}`);
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

  const addTokenSupply = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const tx = await contract.mint(ethers.utils.parseEther(tokenAmount));
        await tx.wait();
        alert('Token supply added successfully');
        const newTotalSupply = await contract.totalSupply();
        setTotalSupply(ethers.utils.formatEther(newTotalSupply));
      } catch (error) {
        console.error('Error adding token supply:', error);
        alert(`Error adding token supply: ${error.message}`);
      }
    }
  };

  const addCarbonFootprint = async () => {
    if (signer) {
      if (!ethers.utils.isAddress(companyForCarbon)) {
        alert('Invalid company address for carbon footprint');
        return;
      }
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const iotDeviceAddress = await contract.getIOT(companyForCarbon);
        if (iotDeviceAddress === ethers.constants.AddressZero) {
          alert('Company is not certified');
          return;
        }
        const tx = await contract.connect(signer).addFootprint(companyForCarbon, carbonFootprint);
        await tx.wait();
        alert('Carbon footprint added successfully');

        // Add record to context
        addCarbonFootprintRecord(companyForCarbon, carbonFootprint);
      } catch (error) {
        console.error('Error adding carbon footprint:', error);
        alert(`Error adding carbon footprint: ${error.message}`);
      }
    }
  };

  const fetchFootprintRecords = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const records = await contract.getFootprintRecords();
        const formattedRecords = records.map(record => ({
          timestamp: new Date(record.timestamp.toNumber() * 1000).toLocaleString(),
          company: record.company,
          footprint: record.footprint.toString()
        }));
        setCarbonFootprintRecords(formattedRecords);
      } catch (error) {
        console.error('Error fetching footprint records:', error);
      }
    }
  };

  const withdrawEther = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const tx = await contract.withdraw();
        await tx.wait();
        alert('Ether withdrawn successfully');
        if (isOwner) {
          fetchBalance();
        }
      } catch (error) {
        console.error('Error withdrawing Ether:', error);
        alert(`Error withdrawing Ether: ${error.message}`);
      }
    } else {
      alert('Only the owner can withdraw Ether');
    }
  };

  return (
    <div>
      <h1>Government Dashboard</h1>
      <div>
        <h2>Authorize Company</h2>
        <input
          type="text"
          placeholder="Company Address"
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="IoT Device Address"
          value={iotDeviceAddress}
          onChange={(e) => setIotDeviceAddress(e.target.value)}
        />
        <button onClick={authorizeCompany}>Authorize</button>
      </div>
      <div>
        <h2>Add Token Supply</h2>
        <input
          type="text"
          placeholder="Token Amount"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
        />
        <button onClick={addTokenSupply}>Add Tokens</button>
      </div>
      <div>
        <h2>Add Carbon Footprint</h2>
        <input
          type="text"
          placeholder="Company Address"
          value={companyForCarbon}
          onChange={(e) => setCompanyForCarbon(e.target.value)}
        />
        <input
          type="text"
          placeholder="Carbon Footprint Amount"
          value={carbonFootprint}
          onChange={(e) => setCarbonFootprint(e.target.value)}
        />
        <button onClick={addCarbonFootprint}>Add Carbon Footprint</button>
      </div>
      <div>
        <h2>Certified Companies and IoT Devices</h2>
        <table>
          <thead>
            <tr>
              <th>Company Address</th>
              <th>IoT Device Address</th>
            </tr>
          </thead>
          <tbody>
            {certifiedCompanies.map((company, index) => (
              <tr key={index}>
                <td>{company}</td>
                <td>{certifiedIotDevices[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Withdraw Ether</h2>
        <button onClick={withdrawEther}>Withdraw</button>
      </div>
      <div>
        <h2>Carbon Footprint Records</h2>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Company Address</th>
              <th>Carbon Footprint</th>
            </tr>
          </thead>
          <tbody>
            {carbonFootprintRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.timestamp}</td>
                <td>{record.company}</td>
                <td>{record.footprint}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GovernmentPage;
