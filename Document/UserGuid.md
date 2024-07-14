# User Guide for Running Hardhat Configuration

This guide will help you set up and run your own Hardhat environment using the provided `hardhat.config.js` configuration. The configuration file uses several plugins and environment variables to connect to the Holesky network and interact with Etherscan.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 16.14.0 is recommended, as higher versions may not be compatible)
- npm or yarn
- Hardhat

## Step-by-Step Setup

### Step 1: Install Required Dependencies

Run the following command in your project directory to install the necessary Hardhat plugins:

```bash
npm install --save-dev @nomiclabs/hardhat-waffle @nomiclabs/hardhat-etherscan dotenv
```

### Step 2: Create the Configuration File

Create a file named `hardhat.config.js` in your project root and copy the provided configuration into it:

```javascript
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
```

### Step 3: Set Up Environment Variables

Create a `.env` file in your project root directory and add your environment variables. Here is an example:

```dotenv
HOLESKY_RPC_URL=https://holesky.example.com  # Replace with your actual RPC URL
PRIVATE_KEY=your_private_key  # Replace with your actual private key
ETHERSCAN_API_KEY=your_etherscan_api_key  # Replace with your actual Etherscan API key
```

### Step 4: Run Hardhat Commands

With the configuration and environment variables in place, you can now run Hardhat commands. Here are a few common commands:

- Compile your smart contracts:
  ```bash
  npx hardhat compile
  ```

- Deploy your smart contracts:
  ```bash
  npx hardhat run scripts/deploy.js --network holesky
  ```

- Verify your smart contracts on Etherscan:
  ```bash
  npx hardhat verify --network holesky <DEPLOYED_CONTRACT_ADDRESS> <CONSTRUCTOR_ARGUMENTS>
  ```

### Additional Tips

- Ensure your private key is kept secure and never exposed in public repositories.
- Replace placeholder URLs with the actual Holesky Etherscan API and browser URLs if available.
- Refer to the Hardhat [documentation](https://hardhat.org/getting-started/) for more details and advanced configurations.
- Use Node.js version 16.14.0 for best compatibility with Hardhat. Higher versions may cause issues.

## Conclusion

By following these steps, you should be able to set up and run your Hardhat environment with the provided configuration. This setup allows you to connect to the Holesky network, compile, deploy, and verify your smart contracts seamlessly.