require("dotenv").config();
const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const nftABI = require("../artifacts/contracts/NFT.sol/NFT.json");
const contractAddress = "0x9931d02903116c385d9320ab464354ed68ff0b14";
const contractInstance = new web3.eth.Contract(nftABI.abi, contractAddress);

const mintNFT = async (tokenURI) => {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); // getting the latest nonce

  // making the transaction
  const transaction = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce,
    gas: 500000,
    maxPriorityFeePerGas: 10000000,
    data: contractInstance.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };

  const signPromiseFunction = web3.eth.accounts.signTransaction(
    transaction,
    PRIVATE_KEY
  );
  signPromiseFunction
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash) => {
        if (!err) {
          console.log(`The hash of your transaction is: ${hash}`);
        } else {
          console.log(
            "Something went wrong while carrying out the transaction",
            err
          );
        }
      });
    })
    .catch((err) => console.log("Promise failed:", err));
};

mintNFT(
  "https://gateway.pinata.cloud/ipfs/QmfSyt6XFZKX6QR4GKNSCW7mquGnsFoP1QA38h2w9xzoTf"
);
