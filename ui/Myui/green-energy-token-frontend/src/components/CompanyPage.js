import React, { useState, useEffect } from 'react';
import { useEthereum } from '../context/EthereumContext';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../constants';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const CompanyPage = () => {
  const { signer, account, isOwner, setTotalSupply } = useEthereum();
  const [certified, setCertified] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [buyAmount, setBuyAmount] = useState('');
  const [compensateFootprint, setCompensateFootprint] = useState('');
  const [gasPrice, setGasPrice] = useState(20); // Default gas price in gwei
  const [estimatedGas, setEstimatedGas] = useState(0);

  const exchangeRate = 1000; // 1 Token = 1000 units of carbon footprint

  useEffect(() => {
    const fetchData = async () => {
      if (signer) {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        try {
          // If the user is the owner, they are certified
          if (isOwner) {
            setCertified(true);
          } else {
            const iotAddress = await contract.getIOT(account);
            setCertified(iotAddress !== ethers.constants.AddressZero);
          }

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
  }, [signer, account, isOwner]);

  useEffect(() => {
    const estimateGas = async () => {
      if (signer && buyAmount) {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        try {
          const gasEstimate = await contract.estimateGas.buy({
            value: ethers.utils.parseEther(buyAmount)
          });
          setEstimatedGas(gasEstimate.toNumber());
        } catch (error) {
          console.error('Error estimating gas:', error);
        }
      }
    };

    estimateGas();
  }, [signer, buyAmount]);

  const buyTokens = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const tx = await contract.buy({
          value: ethers.utils.parseEther(buyAmount),
          gasPrice: ethers.utils.parseUnits(gasPrice.toString(), 'gwei')
        });
        await tx.wait();
        alert('Tokens bought successfully');
        // Refresh token balance after buying tokens
        const balance = await contract.balanceOf(account);
        setTokenBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
      } catch (error) {
        console.error('Error buying tokens:', error);
      }
    }
  };

  const compensateCarbon = async () => {
    if (signer) {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      try {
        const footprintToCompensate = ethers.BigNumber.from(compensateFootprint);
        const requiredTokens = footprintToCompensate.div(exchangeRate);

        const currentBalance = ethers.utils.parseUnits(tokenBalance, 'ether');
        const currentFootprint = ethers.BigNumber.from(carbonFootprint);

        if (footprintToCompensate.gt(currentFootprint)) {
          alert('Insufficient carbon footprint to compensate');
          return;
        }

        if (requiredTokens.gt(currentBalance)) {
          alert('Insufficient token balance to compensate');
          return;
        }

        const tx = await contract.compensate(footprintToCompensate, {
          gasLimit: 1000000, // Set a high manual gas limit to avoid gas estimation errors
          gasPrice: ethers.utils.parseUnits(gasPrice.toString(), 'gwei')
        });
        await tx.wait();
        alert('Carbon compensated successfully');
        // Refresh carbon footprint, token balance, and total supply after compensating
        const footprint = await contract.getFootPrint(account);
        setCarbonFootprint(footprint.toString());
        const balance = await contract.balanceOf(account);
        setTokenBalance(parseFloat(ethers.utils.formatEther(balance)).toFixed(4));
        const supply = await contract.totalSupply();
        setTotalSupply(parseFloat(ethers.utils.formatEther(supply)).toFixed(4));
      } catch (error) {
        console.error('Error compensating carbon:', error);
      }
    }
  };

  return (
    <div>
      <h1>Company Dashboard</h1>
      <div>
        <h2>Certification Status</h2>
        <p>{certified ? 'Certified' : 'Not Certified'}</p>
      </div>
      <div>
        <h2>Carbon Footprint</h2>
        <p>{carbonFootprint} units</p>
      </div>
      <div>
        <h2>GET Token Balance</h2>
        <p>{tokenBalance} GET</p>
      </div>
      <div>
        <h2>Exchange Rate</h2>
        <p>1 Token = {exchangeRate} units of carbon footprint</p>
      </div>
      <div>
        <h2>Buy Tokens</h2>
        <input
          type="text"
          placeholder="Amount in ETH"
          value={buyAmount}
          onChange={(e) => setBuyAmount(e.target.value)}
        />
        <div>
          <label>Gas Price: {gasPrice} gwei</label>
          <Slider
            min={1}
            max={100}
            value={gasPrice}
            onChange={setGasPrice}
          />
          <p>Estimated Gas: {estimatedGas} units</p>
        </div>
        <button onClick={buyTokens}>Buy Tokens</button>
      </div>
      <div>
        <h2>Compensate Carbon</h2>
        <input
          type="text"
          placeholder="Amount of Carbon Footprint"
          value={compensateFootprint}
          onChange={(e) => setCompensateFootprint(e.target.value)}
        />
        <button onClick={compensateCarbon}>Compensate Carbon</button>
      </div>
    </div>
  );
};

export default CompanyPage;
