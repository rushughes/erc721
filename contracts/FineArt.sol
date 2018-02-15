pragma solidity ^0.4.18;

import './zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';

contract FineArt is ERC721Token {
  string public constant name = "Fine Art";
  string public constant symbol = "FINEART";

  mapping (uint256 => string) private metaData;

  function tokenMetadata(uint256 _tokenId) external view returns (string) {
    string infoUrl = metaData[_tokenId];
    return infoUrl;
  }

  function createFineArt(address _to, uint256 _tokenId, string _infoURL) public {
    require(_to != address(0));
    _mint(_to, _tokenId);
    metaData[_tokenId] = _infoURL;
  }
}
