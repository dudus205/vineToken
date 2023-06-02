
const hre = require("hardhat");

async function main() {

    // We get the contract to deploy
    const FiredGuys = await hre.ethers.getContractFactory("VineToken");
    const firedGuys = await FiredGuys.deploy();

    await firedGuys.deployed();

    console.log("VineToken deployed to:", firedGuys.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
