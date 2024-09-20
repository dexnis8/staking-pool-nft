async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the token
  const StakingToken = await ethers.getContractFactory("StakingToken");
  const stakingToken = await StakingToken.deploy(1000000); // 1 million tokens
  console.log("staking token", stakingToken);
  //   No need to call stakingToken;

  console.log("StakingToken deployed to:", stakingToken.address);

  // Deploy the NFT
  const RewardNFT = await ethers.getContractFactory("RewardNFT");
  const rewardNFT = await RewardNFT.deploy();
  console.log("Reward NFT", rewardNFT);

  // No need to call rewardNFT;

  console.log("RewardNFT deployed to:", rewardNFT.address);

  // Deploy Staking Pool 1
  const StakingPool1 = await ethers.getContractFactory("StakingPool1");
  const pool1 = await StakingPool1.deploy(
    stakingToken.target,
    rewardNFT.target
  );
  console.log("STaking Pool 1 deployed:", pool1);
  // No need to call pool1;

  console.log("Staking Pool 1 deployed to:", pool1.address);

  // Deploy Staking Pool 2
  const StakingPool2 = await ethers.getContractFactory("StakingPool2");
  const pool2 = await StakingPool2.deploy(
    stakingToken.target,
    rewardNFT.target
  );
  console.log("STaking Pool 2 deployed:", pool2);
  // No need to call pool2;

  console.log("Staking Pool 2 deployed to:", pool2.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
