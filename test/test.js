const { expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

describe("BlockStaking", function () {
  let owner,
    staker1,
    staker2,
    blockStakingContract,
    blockStakeContract,
    blockRewardContract;
  let abi = [
    "function deposit(uint256 _amount) external",
    "function stakers(address) view public returns (uint256, uint256, uint256)",
  ];

  this.beforeAll(async () => {
    [owner, staker1, staker2] = await ethers.getSigners();

    const BlockStakeFactory = await hre.ethers.getContractFactory("BlockStake");
    blockStakeContract = await BlockStakeFactory.deploy();

    await blockStakeContract
      .connect(owner)
      .mint(staker1.address, parseEther("500"));
    await blockStakeContract
      .connect(owner)
      .mint(staker2.address, parseEther("500"));

    const BlockRewardFactory = await hre.ethers.getContractFactory(
      "BlockReward"
    );
    blockRewardContract = await BlockRewardFactory.deploy();

    const BlockStakingFactory = await hre.ethers.getContractFactory(
      "BlockStaking"
    );
    blockStakingContract = await BlockStakingFactory.deploy(
      blockStakeContract.address,
      blockRewardContract.address,
      1
    );
    await blockStakeContract
      .connect(staker1)
      .approve(blockStakingContract.address, parseEther("100"));
    await blockStakeContract
      .connect(staker2)
      .approve(blockStakingContract.address, parseEther("100"));
  });

  it("should deposit stakers' stake token", async () => {
    const tx = await blockStakingContract
      .connect(staker1)
      .deposit(parseEther("100"));
    const tx2 = await blockStakingContract
      .connect(staker2)
      .deposit(parseEther("100"));
    //get stakers' amount
    const staker1Amount = (
      await blockStakingContract.stakers(staker1.address)
    )[0];
    const staker2Amount = (
      await blockStakingContract.stakers(staker2.address)
    )[0];
    expect(staker2Amount).to.eql(parseEther("100"));
    expect(staker1Amount).to.eql(parseEther("100"));
  });
});
