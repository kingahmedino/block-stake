<a name="readme-top"></a>

<div align="center">
  <h2 align="center">Block Stake</h2>

  <p align="center">
    Block Stake are a set of contracts that facilitate staking following the MasterChef staking algorithm.
    <br />
    <br />
    <a href="https://github.com/kingahmedino/block-stake-ui.git" target="_blank" rel="noopener noreferrer">Try dApp</a>
    |
    <a href="#" target="_blank" rel="noopener noreferrer">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Block Stake is a staking contract following a modified version of Sushiswap's MasterChef algorithm that takes in an upgradeable token as stake asset and issues rewards in a different token.

The users who hold the BlockStake (BST) token can earn rewards for their investments by sharing part of the rewards that are distributed per block based on their invested BST.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

#### Back
* Solidity
* Ethereum
* Hardhat
* Openzeppelin Contracts
* Ethers.js
#### Front
* NextJS
* ReactJS
#### Testing
* Chai
* Mocha

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kingahmedino/block-stake.git && cd block-stake
   ```
2. Install dependencies
   ```sh
   yarn install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Try running some hardhat tests:

```sh
npx hardhat test
```

Try to deploy contract to testnet, Gõerli is the default:

```sh
npx hardhat run scripts/deploy.js
```
or

Edit `hardhat.config.js` to add more networks to deploy to:

```javascript
networks: {
    goerli: {
      url: process.env.NETWORK,
      accounts: [process.env.PRIVATE_KEY],
    },
  }
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>
