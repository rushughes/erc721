pragma solidity ^0.4.18;

import './zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import './zeppelin-solidity/contracts/ownership/Ownable.sol';

contract RarePepe is ERC721Token, Ownable {
  string public constant name = "Rare Pepe";
  string public constant symbol = "RAREPEPE";

  mapping (uint256 => string) private metaData;

  function tokenMetadata(uint256 _tokenId) external view returns (string) {
    string infoUrl = metaData[_tokenId];
    return infoUrl;
  }

  function mint(address _to, uint256 _tokenId, string _infoURL) onlyOwner public {
    require(_to != address(0));
    _mint(_to, _tokenId);
    metaData[_tokenId] = _infoURL;
  }
}
