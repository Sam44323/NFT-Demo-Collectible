const hre = require("hardhat");

const main = async () => {
  // getting the contract factory
  const NFT = await hre.ethers.getContractFactory("NFT");

  // Start deployment, returning a promise that resolves to a contract object
  const nft = await NFT.deploy();
  console.log("Contract deployed to address", nft.address);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
