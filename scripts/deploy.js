
const hre = require("hardhat");

async function main() {

    // We get the contract to deploy
    const VineToken = await hre.ethers.getContractFactory("VineToken");
    const vineToken = await VineToken.deploy();

    await vineToken.deployed();

    console.log("VineToken deployed to:", vineToken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
