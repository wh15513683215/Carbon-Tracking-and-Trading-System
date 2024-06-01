require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

console.log('HOLESKY_RPC_URL:', process.env.HOLESKY_RPC_URL);
console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY ? 'Loaded' : 'Not loaded');
console.log('ETHERSCAN_API_KEY:', process.env.ETHERSCAN_API_KEY);

module.exports = {
  solidity: "0.8.6",
  networks: {
    holesky: {
      url: process.env.HOLESKY_RPC_URL,
      chainId: 17000,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "holesky",
        chainId: 17000,
        urls: {
          apiURL: "https://api-holesky.etherscan.io/api",  // Placeholder URL, replace with the actual Holesky Etherscan API URL if available
          browserURL: "https://holesky.etherscan.io"  // Placeholder URL, replace with the actual Holesky Etherscan browser URL if available
        }
      }
    ]
  }
};
