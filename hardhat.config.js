require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-truffle5");
require("@openzeppelin/test-helpers");

const Url_Georli = process.env.URL_GEORILI;
const Private_Key = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: Url_Georli,
      accounts: [Private_Key],
    },
  },
};
