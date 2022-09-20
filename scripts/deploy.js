// importing ethers
const { ethers } = requre("hardhat");

// making an function to deploy the smart contract
async function main() {
  // now getting the contract name  'SendMsg'
  const SendMessageFactory = await ethers.getContractFactory("SendingMessages");
  console.log("Deploying contract...");
  // We deploy the contract by calling SendMsgFactory and then using deploy function
  const sendMessages = await SendMessageFactory.deploy();
  // then we await the deployed
  await sendMessages.deployed();
  console.log(`Deployed contract to: ${sendMessages.address}`);
}

// // verifying our contract
// async function verify(contractAddress, args) {
//   // args are for constructor
// }

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
