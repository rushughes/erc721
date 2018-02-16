pragma solidity ^0.4.18;

import './zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import './zeppelin-solidity/contracts/ownership/Ownable.sol';

contract Market is Ownable {

  struct AuctionToken {
    address contractAddress;   // contract token belongs to
    uint256 token_id;          // id of the token from it's contract
    address owner;             // original owning address of the tokens
    uint256 maxBid;            // highest bid
    address maxBidAddress;     // highest bidder
    uint256 auctionEnd;        // block auction ends at
  }

  uint256 private totalAuctions;
  mapping(uint256 => AuctionToken) private auctionTokens;

  /*
  to transfer in an NFT the user ..
  1) makes a call to the publishing contract to 'approve' the market contract can take a token_id
  2) make a call to the market contract telling it to 'takeOwnership' of the token_id from the publishing contract
  */

  function acceptOwnership(uint256 _tokenId, address _contractAddress) public returns (uint256){
    ERC721 e = ERC721(_contractAddress);
		e.takeOwnership(_tokenId);
    var auction = auctionTokens[totalAuctions];
    auction.contractAddress = _contractAddress;
    auction.token_id = _tokenId;
    auction.owner = msg.sender;
    auction.maxBid = 0;
    totalAuctions++;
    return totalAuctions;
  }

  function getAuction(uint256 _id) external view returns(address) {
    return auctionTokens[_id].contractAddress;
  }

  function getTotalAuctions() external view returns(uint256) {
    return totalAuctions;
  }

}
