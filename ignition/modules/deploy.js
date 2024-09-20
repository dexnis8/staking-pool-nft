// const { buildModule } = require("@nomicfoundation/hardhat-ignition");

// module.exports = buildModule("DeployStakingPools", (m) => {
//   // Deploy the StakingToken contract
//   const stakingToken = m.contract("StakingToken", [1000000]); // Pass the token supply as a parameter

//   // Deploy the RewardNFT contract
//   const rewardNFT = m.contract("RewardNFT");

//   // Deploy the Staking Pool 1 with StakingToken address
//   const stakingPool1 = m.contract("StakingPool1", [stakingToken]);

//   // Deploy the Staking Pool 2 with StakingToken address
//   const stakingPool2 = m.contract("StakingPool2", [stakingToken]);

//   return { stakingToken, rewardNFT, stakingPool1, stakingPool2 };
// });
