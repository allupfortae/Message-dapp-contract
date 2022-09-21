const ether = require("@openzeppelin/test-helpers/src/ether");
const fs = require("fs");
const { network, ethers } = require("hardhat");
const FRONTEND_ADDRESS_FILE = "../sender-dapp-frontend/constant/contract.json";
const FRONTEND_ABI_FILE = "../sender-dapp-frontend/constant/abi.json";

module.exports = async () => {
  if (process.env.UPDATE_FRONTEND) {
    console.log("updating front end...");
    updateContractAddress();
    updateABI();
  }

  const updateABI = async () => {
    const message = await ethers.getContractFactory("SendingMessages");
    fs.writeFileSync(
      FRONTEND_ABI_FILE,
      message.interface.format(ethers.utils.FormatTypes.json)
    );
  };

  const updateContractAddress = async () => {
    const message = await ethers.getContractFactory("SendingMessages");
    const chainId = network.config.chainId.toString();
    const currentAddress = JSON.parse(
      fs.readFileSync(FRONTEND_ADDRESS_FILE, "utf8")
    );
    if (chainId in contractAddress) {
      if (!currentAddress[chainId].included(message.address)) {
        currentAddress[chainId].push(message.address);
      }
    }
    {
      currentAddress[chainId] = [message.address];
    }
    fs.writeFileSync(FRONTEND_ADDRESS_FILE, JSON.stringify(currentAddress));
  };
};

module.exports.tags = ["all", "frontend"];
