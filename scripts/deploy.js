// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const BlockRewardFactory = await hre.ethers.getContractFactory("BlockReward");
  blockRewardContract = await BlockRewardFactory.deploy();

  const BlockStakingFactory = await hre.ethers.getContractFactory(
    "BlockStaking"
  );
  blockStakingContract = await BlockStakingFactory.deploy(
    "0xD6f50C2d25ce920b5C952816bF10ddD80c33Fd5e",
    blockRewardContract.address,
    1
  );

  console.log(
    "BlockReward contract deployed successfully " + blockRewardContract.address
  );
  console.log(
    "BlockStaking contract deployed successfully " +
      blockStakingContract.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
