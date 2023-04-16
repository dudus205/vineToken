const { expect } = require('chai');

describe('VineToken', function () {
  let VineToken;
  let vineToken;
  let owner;
  let nonOwner;

  beforeEach(async function () {
    VineToken = await ethers.getContractFactory('VineToken');
    vineToken = await VineToken.deploy();
    await vineToken.deployed();

    [owner, nonOwner] = await ethers.getSigners();
  });

  it('should toggle isMintEnabled when called by owner', async function () {
    // check that isMintEnabled is initially false
    expect(await vineToken.isMintEnabled()).to.be.false;

    // call toggleIsMintEnabled as owner
    await vineToken.connect(owner).toggleIsMintEnabled();

    // check that isMintEnabled is now true
    expect(await vineToken.isMintEnabled()).to.be.true;

    // call toggleIsMintEnabled again as owner
    await vineToken.connect(owner).toggleIsMintEnabled();

    // check that isMintEnabled is now false again
    expect(await vineToken.isMintEnabled()).to.be.false;
  });

  it('should revert if called by non-owner', async function () {
    // call toggleIsMintEnabled as non-owner
    await expect(vineToken.connect(nonOwner).toggleIsMintEnabled()).to.be.revertedWith('Ownable: caller is not the owner');

    // check that isMintEnabled is still false
    expect(await vineToken.isMintEnabled()).to.be.false;
  });

  beforeEach(async function () {
    VineToken = await ethers.getContractFactory('VineToken');
    vineToken = await VineToken.deploy();
    await vineToken.deployed();

    [owner] = await ethers.getSigners();
  });

  it('should set the max supply when called by owner', async function () {
    // check that maxSupply is initially 2
    expect(await vineToken.maxSupply()).to.equal(2);

    // set max supply to 10 as owner
    await vineToken.connect(owner).setMaxSupply(10);

    // check that maxSupply is now 10
    expect(await vineToken.maxSupply()).to.equal(10);
  });

  it('should revert if called by non-owner', async function () {
    // set max supply to 10 as non-owner
    await expect(vineToken.connect(nonOwner).setMaxSupply(10)).to.be.revertedWith('Ownable: caller is not the owner');

    // check that maxSupply is still 2
    expect(await vineToken.maxSupply()).to.equal(2);
  });




});
