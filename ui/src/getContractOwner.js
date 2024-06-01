const Web3 = require("web3");
require("./contractAbis/greenEnergy");



async function getContractOwner() {
  //  const web3 = new Web3(Web3.givenProvider()); // Connect to Ethereum network
    const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546'); // Connect to Ethereum network
    const contractAddress = "0xB5bBE385A7596E1254E7a3395888Bf5Ab732d9f1"; // Replace with your contract address
  
    
    const contract = new web3.eth.Contract(contractABI, contractAddress); // Create contract instance
  
    const ownerAddress = await contract.methods.owner().call();
    console.log('Contract owner:', ownerAddress);
  }
  
  getContractOwner(); // Call the async function to execute
  