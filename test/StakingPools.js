const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking Pools", function () {
  let stakingToken, pool1, pool2, owner, addr1, addr2;

  beforeEach(async function () {
    // Deploy StakingToken
    const StakingToken = await ethers.getContractFactory("StakingToken");
    stakingToken = await StakingToken.deploy(1000000); // 1 million tokens
    await stakingToken.deployed();

    // Deploy Pool1 and Pool2
    const StakingPool1 = await ethers.getContractFactory("StakingPool1");
    pool1 = await StakingPool1.deploy(stakingToken.address);
    await pool1.deployed();

    const StakingPool2 = await ethers.getContractFactory("StakingPool2");
    pool2 = await StakingPool2.deploy(stakingToken.address);
    await pool2.deployed();

    [owner, addr1, addr2, _] = await ethers.getSigners();
  });

  it("should allow users to stake tokens in Pool1", async function () {
    await stakingToken.transfer(addr1.address, 1000);
    await stakingToken.connect(addr1).approve(pool1.address, 1000);
    await pool1.connect(addr1).stake(500);

    expect(await stakingToken.balanceOf(pool1.address)).to.equal(500);
    expect(await pool1.stakedAmount(addr1.address)).to.equal(500);
  });

  it("should allow users to stake tokens in Pool2", async function () {
    await stakingToken.transfer(addr1.address, 1000);
    await stakingToken.connect(addr1).approve(pool2.address, 1000);
    await pool2.connect(addr1).stake(500);

    expect(await stakingToken.balanceOf(pool2.address)).to.equal(500);
    expect(await pool2.stakedAmount(addr1.address)).to.equal(500);
  });

  it("should allow users to unstake from Pool1", async function () {
    await stakingToken.transfer(addr1.address, 1000);
    await stakingToken.connect(addr1).approve(pool1.address, 1000);
    await pool1.connect(addr1).stake(500);

    await pool1.connect(addr1).unstake();
    expect(await stakingToken.balanceOf(addr1.address)).to.equal(1000);
    expect(await pool1.stakedAmount(addr1.address)).to.equal(0);
  });

  it("should allow users to unstake from Pool2", async function () {
    await stakingToken.transfer(addr1.address, 1000);
    await stakingToken.connect(addr1).approve(pool2.address, 1000);
    await pool2.connect(addr1).stake(500);

    await pool2.connect(addr1).unstake();
    expect(await stakingToken.balanceOf(addr1.address)).to.equal(1000);
    expect(await pool2.stakedAmount(addr1.address)).to.equal(0);
  });
  
  it("should mint an NFT as a reward in Pool1", async function () {
    await stakingToken.transfer(addr1.address, 1000);
    await stakingToken.connect(addr1).approve(pool1.address, 1000);
    await pool1.connect(addr1).stake(500);

    // Fast forward time by 7 days (simulate the reward threshold)
    await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
    await ethers.provider.send("evm_mine");

    await pool1.connect(addr1).claimRewards();

    const tokens = await rewardNFT.tokensOfOwner(addr1.address);
    expect(tokens.length).to.equal(1); // Ensure an NFT was minted
  });
});
