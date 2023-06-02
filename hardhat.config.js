require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  mocha: {
    // Load the bundled test file
    // Note: the path is relative to the root of your project
    files: ['dist/test.bundle.js'],
    url: "http://127.0.0.1:8546",

  },
};
