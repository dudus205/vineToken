// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.2/access/Ownable.sol";

contract VineToken is ERC721, Ownable {
    uint256 public mintPrice = 0.05 ether; //50000000000000000 Wei = 0.05
    uint256 public totalSupply; 
    uint256 public maxSupply;
    bool public isMintEnabled; 
    mapping(address => uint256) public mintedWallets;

    constructor() ERC721("vineToken", "VIN") {
        maxSupply = 2;
    }

    function toggleIsMintEnabled() external onlyOwner{
        isMintEnabled = !isMintEnabled;
    }

    function setMaxSupply(uint256 maxSupply_) external onlyOwner{
        maxSupply = maxSupply_;
    }

    function mint() external payable {
        require(isMintEnabled, 'minting not enabled');
        require(mintedWallets[msg.sender] < 1, 'exceeds max per wallet');
        require(msg.value == mintPrice, 'wrong value');
        require(maxSupply > totalSupply, 'sold out');

        mintedWallets[msg.sender]++;
        totalSupply++;
        uint256 tokenID = totalSupply;
        _safeMint(msg.sender, tokenID);
    }

    function burn(uint256 tokenId) public {
        super._burn(tokenId);
        mintedWallets[msg.sender]--;
    }
    
}
