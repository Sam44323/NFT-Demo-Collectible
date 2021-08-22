const { ethers } = require("ethers");

export const getProvider = () => {
  return ethers.getDefaultProvider("rinkeby", {
    alchemy: process.env.API_URL,
  });
};
