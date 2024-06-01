const hre = require("hardhat");

async function main() {
  // Get the deployer's account (which should be the owner of the contract)
  const [owner] = await hre.ethers.getSigners();

  // Ensure the owner is connected
  console.log("Using account:", owner.address);

  // Get the contract factory
  const GreenEnergyToken = await hre.ethers.getContractFactory("GreenEnergyToken");

  // Connect to the deployed contract instance
  const contractAddress = "0x937A225eF4EC739F774F389C2Aa4E3eb00737EA5";
  const greenEnergyToken = GreenEnergyToken.attach(contractAddress);

  // Call the withdraw function
  const tx = await greenEnergyToken.connect(owner).withdraw();
  await tx.wait();

  console.log("Withdraw transaction hash:", tx.hash);
  console.log("Ether withdrawn to owner's address:", owner.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
