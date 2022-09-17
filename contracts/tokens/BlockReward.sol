// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockReward is ERC20, Ownable {
    address[] private minters;

    constructor() ERC20("Block Reward", "BRW") {
        minters.push(msg.sender);
    }

    function mint(address to, uint256 amount) public onlyMinters {
        _mint(to, amount);
    }

    function addAMinter(address minter) public onlyOwner {
        minters.push(minter);
    }

    modifier onlyMinters() {
        bool allowed;
        for (uint256 i = 0; i < minters.length; i++) {
            if (minters[i] == msg.sender) {
                allowed = true;
                break;
            }
        }
        require(allowed, "not a minter");
        _;
    }
}
