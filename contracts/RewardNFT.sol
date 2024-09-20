// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract RewardNFT {
    string public name = "RewardNFT";
    string public symbol = "R-NFT";
    uint256 private _tokenIdCounter;

    mapping(uint256 => address) private _owners;
    mapping(uint256 => string) private _tokenURIs; // To store metadata URIs
    mapping(address => uint256[]) private _ownedTokens;

    event Mint(address indexed owner, uint256 tokenId, string tokenURI);

    // Mint a new NFT
    function mint(address to, string memory _tokenURI) public returns (uint256) {
        require(to != address(0), "Cannot mint to the zero address");
        
        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;

        _owners[newTokenId] = to;
        _tokenURIs[newTokenId] = _tokenURI; // Store the metadata URI
        _ownedTokens[to].push(newTokenId);

        emit Mint(to, newTokenId, _tokenURI);
        return newTokenId;
    }

    // Get the owner of a specific token
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token does not exist");
        return owner;
    }

    // Retrieve the metadata URI for a token
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        string memory uri = _tokenURIs[tokenId];
        require(bytes(uri).length > 0, "Token does not exist or URI not set");
        return uri;
    }

    // Get all tokens owned by a specific address
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    // Optional: function to get the total supply of NFTs
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
