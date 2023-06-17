// Import necessary dependencies
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Test case
describe("VineToken", function () {
  let vineToken;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const VineToken = await ethers.getContractFactory("VineToken");
    vineToken = await VineToken.deploy();
    await vineToken.deployed();
  });

  it("should mint a new token", async function () {
    const mintPrice = ethers.utils.parseEther("0.5");
    const tokenId = 1;

    await vineToken.toggleIsMintEnabled();

    const mintTx = await vineToken.connect(addr1).mint({ value: mintPrice });
    await mintTx.wait();

    const totalSupply = await vineToken.totalSupply();
    expect(totalSupply).to.equal(1);

    const ownerOfToken = await vineToken.ownerOf(tokenId);
    expect(ownerOfToken).to.equal(addr1.address);

    const balanceOfAddr1 = await vineToken.balanceOf(addr1.address);
    expect(balanceOfAddr1).to.equal(1);
  });

  it("should revert when minting is disabled", async function () {
    const mintPrice = ethers.utils.parseEther("0.5");

    await expect(vineToken.connect(owner).mint({ value: mintPrice })).to.be.revertedWith(
        "minting not enabled"
    );
  });

});
