
const hre = require("hardhat");

async function main() {
  // Get the deployer's account
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the balance of the deployer's account
  const balance = await deployer.getBalance();
  console.log("Account balance:", hre.ethers.utils.formatEther(balance), "ETH");

  // Get the contract factory for GreenEnergyToken
  const GreenEnergyToken = await hre.ethers.getContractFactory("GreenEnergyToken");

  // Deploy the contract
  const token = await GreenEnergyToken.deploy();

  // Wait for the deployment to complete
  await token.deployed();

  // Log the address of the deployed contract
  console.log("Token deployed to:", token.address);
}

// Run the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
