// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./StakingToken.sol";

contract StakingPool2 {
    StakingToken public stakingToken;
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakingTime;

    uint256 public rewardThreshold = 14 days; // Different reward threshold

    constructor(address _stakingToken) {
        stakingToken = StakingToken(_stakingToken);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0 tokens");
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Stake failed");
        stakedAmount[msg.sender] += amount;
        stakingTime[msg.sender] = block.timestamp;
    }

    function calculateRewards(address staker) public view returns (bool eligible) {
        return (block.timestamp - stakingTime[staker] >= rewardThreshold);
    }

    function unstake() external {
        uint256 amount = stakedAmount[msg.sender];
        require(amount > 0, "No staked tokens");
        require(stakingToken.transfer(msg.sender, amount), "Unstake failed");
        delete stakedAmount[msg.sender];
        delete stakingTime[msg.sender];
    }
}
