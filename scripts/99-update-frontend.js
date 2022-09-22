const FRONTEND_ADDRESS_FILE = "../sender-dapp-frontend/constants/contract.json";
const FRONTEND_ABI_FILE = "../sender-dapp-frontend/constants/abi.json";
const fs = require("fs");
const { network, ethers } = require("hardhat");

async () => {
  if (process.env.UPDATE_FRONTEND) {
    console.log("updating frontend...");
    updateContractAddress();
    updateAbi();
  }

  const updateAbi = async () => {
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
    if (chainId in currentAddress) {
      if (!currentAddress[chainId].includes(message.address)) {
        currentAddress[chainId].push(message.address);
      }
    }
    {
      currentAddress[chainId] = [message.address];
    }
    fs.writeFileSync(FRONTEND_ADDRESS_FILE, JSON.stringify(currentAddress));
  };
};

module.exports = ["all", "frontend"];
