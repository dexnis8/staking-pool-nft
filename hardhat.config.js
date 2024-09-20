require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/QvY3doXiNS-Ijr7URuIslr0Fkdzf6xwW",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
