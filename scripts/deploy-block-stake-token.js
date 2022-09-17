const { ethers, upgrades } = require("hardhat");

async function main() {
  const BlockStake = await ethers.getContractFactory("BlockStake");
  const blockStake = await upgrades.deployProxy(BlockStake);

  await blockStake.deployed();

  console.log(`Deployed to ${blockStake.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
