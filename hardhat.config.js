require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.15",
  networks: {
    localhost: {
      url: `HTTP://127.0.0.1:7545`,
      accounts: [process.env.GANACHE_PRIVATE_KEY],
    },
    goerli: {
      url: process.env.NETWORK,
      accounts: [process.env.PRIVATE_KEY],
    },
    etherscan: {
      // Your API key for Etherscan
      // Obtain one at https://etherscan.io/
      url: process.env.NETWORK,
      apiKey: process.env.API_KEY,
    },
  },
};
