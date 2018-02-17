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

  // total amount of auctions
  uint256 private totalAuctions;

  // mapping from auction id to auction structure
  // this effectively gives each auction a UID
  mapping(uint256 => AuctionToken) private auctionTokens;

  // Mapping from owner to list of owned auction IDs
  // this lets us maintain a list of auctions by address
  mapping (address => uint256[]) private ownedAuctions;

  /*
  to transfer in an NFT the user ..
  1) makes a call to the publishing contract to 'approve' the market contract can take a token_id
  2) make a call to the market contract telling it to 'takeOwnership' of the token_id from the publishing contract
  */

  function acceptOwnership(uint256 _tokenId, address _contractAddress) public returns (uint256){
    // instance the generic smart contract
    ERC721 e = ERC721(_contractAddress);

    // get the original owner of the token
    address owner = e.ownerOf(_tokenId);

    // take ownership of the token to ourselves
		e.takeOwnership(_tokenId);

    // populate the structure
    AuctionToken memory auction;
    auction.contractAddress = _contractAddress;
    auction.token_id = _tokenId;
    auction.owner = msg.sender;
    auction.maxBid = 0;

    auctionTokens[totalAuctions] = auction;

    totalAuctions++;

    // add auctionID to mapping list of owner address to auction IDs
    uint256 length = ownedAuctions[owner].length;
    ownedAuctions[owner].push(length);

    return totalAuctions;
  }

  function getAuction(uint256 _id) external view returns(address, uint256, address, uint256, address) {
    return ( auctionTokens[_id].contractAddress, auctionTokens[_id].token_id, auctionTokens[_id].owner, auctionTokens[_id].maxBid, auctionTokens[_id].maxBidAddress);
  }

  function getTotalAuctions() external view returns(uint256) {
    return totalAuctions;
  }

  /**
  * @dev Gets the total number of auctions of the specified address
  * @param _owner address to query the number of auctions
  * @return uint256 representing the number of auctions owned by the passed address
  */

  function getCountAuctionsByOwner(address _owner) external view returns (uint256) {
    require(_owner != address(0));
    var count = ownedAuctions[_owner].length;
    return count;
  }

  function getAuctionsByOwner(address _owner) external view returns (uint256[] _ownedAuctionIds) {
    require(_owner != address(0));
    _ownedAuctionIds = ownedAuctions[_owner];
  }

  function bidOnAuction(uint256 _id) payable returns(address, uint256, address, uint256, address) {
    // if our new bid is the highest
    if (msg.value > auctionTokens[_id].maxBid) {
      // we refund the old bid
      auctionTokens[_id].maxBidAddress.send(auctionTokens[_id].maxBid);
      // we replace the old bid
      auctionTokens[_id].maxBid = msg.value;
      auctionTokens[_id].maxBidAddress = msg.sender;
    }

    return ( auctionTokens[_id].contractAddress, auctionTokens[_id].token_id, auctionTokens[_id].owner, auctionTokens[_id].maxBid, auctionTokens[_id].maxBidAddress);

  }

}
