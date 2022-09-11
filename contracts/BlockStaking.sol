// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Math/SafeMath.sol";
import "./tokens/BlockReward.sol";

/** @title BlockStaking
 * @author @kingahmedino
 * @notice This contract follows MasterChef algorithm for sharing staking rewards among stakers
 * @dev All function calls are currently implemented without side effects
 */
contract BlockStaking is Ownable {
    using SafeMath for uint256;

    IERC20 private stakeToken;
    BlockReward private rewardToken;

    uint256 private rewardTokensPerBlock;
    uint256 private amountOfTokensStaked;

    uint256 private accRewardPerShare;
    uint256 private lastAccRewardPerShareBlock;

    struct Staker {
        uint256 amount;
        uint256 rewardDebt;
        uint256 pendingRewards;
    }

    mapping(address => Staker) public stakers;

    constructor(address _stakeToken, uint256 _rewardTokensPerBlock) {
        stakeToken = IERC20(_stakeToken);
        rewardTokensPerBlock = _rewardTokensPerBlock;
    }

    /**
     * @notice Allows anyone to deposit into the contract
     * @param _amount The amount to deposit to the contract
     */
    function deposit(uint256 _amount) external {
        require(_amount > 0, "amount cannot be zero");
        Staker storage staker = stakers[msg.sender];
        //1. Update accRewardPerShare
        updateAccRewardPerShare();
        //2. Update user rewards
        uint256 userRewards = accRewardPerShare.mul(staker.amount).sub(
            staker.rewardDebt
        );
        staker.pendingRewards += userRewards;
        //3. Update user balance
        staker.amount += _amount;
        //4. Update rewardDebt
        staker.rewardDebt = staker.amount.mul(accRewardPerShare);
        amountOfTokensStaked += _amount;
        stakeToken.transferFrom(msg.sender, address(this), _amount);
    }

    /**
     * @notice Allows anyone to withdraw their stake from the contract and harvest their rewards alongside
     * @param _amount The amount to withdraw from the contract
     */
    function withdraw(uint256 _amount) external {
        Staker storage staker = stakers[msg.sender];
        require(staker.amount > 0, "balance is zero");
        claimRewards();
        staker.amount -= _amount;
        amountOfTokensStaked -= _amount;
        stakeToken.transferFrom(address(this), msg.sender, _amount);
    }

    /**
     * @notice Allows anyone to harvest their staking rewards
     */
    function claimRewards() public {
        Staker storage staker = stakers[msg.sender];
        require(staker.amount > 0, "balance is zero");
        //1. Update accRewardPerShare
        updateAccRewardPerShare();
        //2. Calculate user rewards to harvest
        uint256 rewardsToHarvest = accRewardPerShare.mul(staker.amount).sub(
            staker.rewardDebt
        );
        //3. Update rewardDebt
        staker.rewardDebt = accRewardPerShare.mul(staker.amount);

        rewardToken.mint(msg.sender, rewardsToHarvest);
    }

    /**
     * @notice Used to update accRewardPerShare
     */
    function updateAccRewardPerShare() private {
        if (amountOfTokensStaked > 0) {
            uint256 blocksDiff = block.number - lastAccRewardPerShareBlock;
            uint256 rewardsPerShare = blocksDiff.mul(blocksDiff);
            accRewardPerShare = accRewardPerShare.add(
                rewardsPerShare.div(amountOfTokensStaked)
            );
        }
        lastAccRewardPerShareBlock = block.number;
    }
}
