// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./StakingToken.sol";
import "./RewardNFT.sol";

contract StakingPool1 {
    StakingToken public stakingToken;
    RewardNFT public rewardNFT;

    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakingTime;

    uint256 public rewardThreshold = 7 days;

    constructor(address _stakingToken, address _rewardNFT) {
        stakingToken = StakingToken(_stakingToken);
        rewardNFT = RewardNFT(_rewardNFT);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Cannot stake 0 tokens");
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Stake failed");
        stakedAmount[msg.sender] += amount;
        stakingTime[msg.sender] = block.timestamp;
    }

  function claimRewards() external {
    require(stakedAmount[msg.sender] > 0, "No staked tokens");
    require(block.timestamp - stakingTime[msg.sender] >= rewardThreshold, "Staking period not met");

    // Create a metadata URI (you might want to make this dynamic)
    string memory metadataURI = "https://gateway.lighthouse.storage/ipfs/metadata/1.json"; // Replace with actual metadata URI
    rewardNFT.mint(msg.sender, metadataURI);
    
    stakingTime[msg.sender] = block.timestamp; // reset the staking time after claiming rewards
}


    function unstake() external {
        uint256 amount = stakedAmount[msg.sender];
        require(amount > 0, "No staked tokens");
        require(stakingToken.transfer(msg.sender, amount), "Unstake failed");

        delete stakedAmount[msg.sender];
        delete stakingTime[msg.sender];
    }
}
