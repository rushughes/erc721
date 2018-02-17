var Market = artifacts.require("./Market.sol");
var FineArt = artifacts.require("./FineArt.sol");
var RarePepe = artifacts.require("./RarePepe.sol");
var ERC721Token = artifacts.require("./zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol");

contract('Market', function(accounts) {

  it("...should add a FineArt NFT in account 0 with ID 1", function() {
    return FineArt.deployed().then(function(instance) {
      fineArtInstance = instance;

      return fineArtInstance.createFineArt(accounts[0], 1, '/ipfs/FINEART1', {from: accounts[0]});
    }).then(function() {
      return fineArtInstance.tokenMetadata(1);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/FINEART1', "The value /ipfs/FINEART1 was not stored.");
    });
  });

  it("...should add a FineArt NFT in the account 1 with ID 2", function() {
    return FineArt.deployed().then(function(instance) {
      fineArtInstance = instance;

      return fineArtInstance.createFineArt(accounts[1], 2, '/ipfs/FINEART2', {from: accounts[0]});
    }).then(function() {
      return fineArtInstance.tokenMetadata(2);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/FINEART2', "The value /ipfs/FINEART2 was not stored.");
    });
  });

  it("...should add a RarePepe NFT in the account 1 with ID 1", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[1], 1, '/ipfs/RAREPEPE1', {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(1);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/RAREPEPE1', "The value /ipfs/RAREPEPE1 was not stored.");
    });
  });

  it("...should add a RarePepe NFT in the account 0 with ID 2", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[0], 2, '/ipfs/RAREPEPE2', {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(2);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/RAREPEPE2', "The value /ipfs/RAREPEPE2 was not stored.");
    });
  });

  it("...should add a RarePepe NFT in the account 0 with ID 3", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[0], 3, '/ipfs/RAREPEPE3', {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(3);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/RAREPEPE3', "The value /ipfs/RAREPEPE3 was not stored.");
    });
  });

  it("...should add a RarePepe NFT in the account 0 with ID 4", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[0], 4, '/ipfs/RAREPEPE4', {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(4);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/RAREPEPE4', "The value /ipfs/RAREPEPE4 was not stored.");
      return rarePepeInstance.ownerOf(4);
    }).then(function(account) {
      assert.equal(account, accounts[0], "The NFT is not owned by the account 0.");
    });
  });

  it("...should add a RarePepe NFT in the account 0 with ID 5", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[0], 5, '/ipfs/RAREPEPE5', {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(5);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/RAREPEPE5', "The value /ipfs/RAREPEPE5 was not stored.");
      return rarePepeInstance.ownerOf(5);
    }).then(function(account) {
      assert.equal(account, accounts[0], "The NFT is not owned by the account 0.");
    });
  });

  it("...account 0 can approve FineArt NFT 1 transfer to market contract", function() {
    return FineArt.deployed().then(function(instance) {
      fineArtInstance = instance;

      return Market.deployed();
    }).then(function(instance) {
        marketInstance = instance;
        return fineArtInstance.approve(marketInstance.address, 1, {from: accounts[0]});
    });
  });

  it("...market can takeOwnership of account 0 FineArt NFT 1", function() {
    return FineArt.deployed().then(function(instance) {
      fineArtInstance = instance;
      return Market.deployed();
    }).then(function(instance) {
        marketInstance = instance;
        return marketInstance.acceptOwnership(1, fineArtInstance.address, {from: accounts[0]});
    }).then(function(res) {
      //console.log('return:', res);
      return marketInstance.getTotalAuctions();
    }).then(function(res) {
      totalAuctions = res.toNumber();
      assert.equal(totalAuctions, 1, "The total number of auctions is not 1.");
      return fineArtInstance.ownerOf(1);
    }).then(function(account) {
      assert.equal(account, marketInstance.address, "The NFT is not owned by market contract.");
      return marketInstance.getAuction(0);
    }).then(function(res) {
      var auctionContractAddress = res[0];
      var auctionTokenId = res[1].toNumber();
      var auctionOwnerAddress = res[2];
      var auctionMaxBid = res[3].toNumber();
      var auctionMaxBidAddress = res[4];
      assert.equal(auctionContractAddress, fineArtInstance.address, "The NFT contract address was not stored.");
      return marketInstance.getAuctionsByOwner(accounts[0]);
    }).then(function(res) {
      assert.equal(res.length, 1, "Account 0 does not have 1 auction.");
      auctionId = res[0].toNumber();
      assert.equal(auctionId, 0, "The auction ID should be 0");
      return marketInstance.getAuctionsByOwner(accounts[1]);
    }).then(function(res) {
      assert.equal(res.length, 0, "Account 1 does not have 0 auctions.");
    });
  });

  it("...account 0 can approve RarePepe NFT 4 transfer to market contract", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return Market.deployed();
    }).then(function(instance) {
        marketInstance = instance;
        return rarePepeInstance.approve(marketInstance.address, 4, {from: accounts[0]});
    });
  });

  it("...market can takeOwnership of account 0 RarePepe NFT 4", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;
      return Market.deployed();
    }).then(function(instance) {
        marketInstance = instance;
        return marketInstance.acceptOwnership(4, rarePepeInstance.address, {from: accounts[0]});
     }).then(function(res) {
       //console.log('return:', res);
       return marketInstance.getTotalAuctions();
    }).then(function(res) {
      totalAuctions = res.toNumber();
      assert.equal(totalAuctions, 2, "The total number of auctions is not 2.");
      return rarePepeInstance.ownerOf(4);
    }).then(function(account) {
      assert.equal(account, marketInstance.address, "The NFT is not owned by market contract.");
      return marketInstance.getAuction(1);
    }).then(function(res) {
      var auctionContractAddress = res[0];
      var auctionTokenId = res[1].toNumber();
      var auctionOwnerAddress = res[2];
      var auctionMaxBid = res[3].toNumber();
      var auctionMaxBidAddress = res[4];
      assert.equal(auctionContractAddress, rarePepeInstance.address, "The NFT contract address was not stored.");
      return marketInstance.getAuctionsByOwner(accounts[0]);
    }).then(function(res) {
      assert.equal(res.length, 2, "Account 0 does not have 2 auction.");
      auctionId = res[1].toNumber();
      //console.log(auctionId);
      assert.equal(auctionId, 1, "The auction ID should be 1");
      return marketInstance.getAuctionsByOwner(accounts[1]);
    }).then(function(res) {
      assert.equal(res.length, 0, "Account 1 does not have 0 auctions.");
    });
  });

  it("...account 2 can bid 1 eth on account 0 RarePepe NFT 4 auction id 1", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;
      return Market.deployed();
    }).then(function(instance) {
        marketInstance = instance;
      return marketInstance.getAuction(1);
    }).then(function(res) {
      var auctionContractAddress = res[0];
      var auctionTokenId = res[1].toNumber();
      var auctionOwnerAddress = res[2];
      var auctionMaxBid = res[3].toNumber();
      var auctionMaxBidAddress = res[4];

      assert.equal(auctionContractAddress, rarePepeInstance.address, "The NFT contract address in the auction is not RarePepe.");
      assert.equal(auctionTokenId, 4, "The token ID should be 4");
      assert.equal(auctionOwnerAddress, accounts[0], "The auction should be owned by account 0.");
      assert.equal(auctionMaxBid, 0, "The max bid should be 0");
      assert.equal(auctionMaxBidAddress, '0x0000000000000000000000000000000000000000', "There should be no bid address.");

      marketInstance.bidOnAuction(1, {from: accounts[2], value: 1000});
      return marketInstance.getAuction(1);
    }).then(function(res) {
      var auctionContractAddress = res[0];
      var auctionTokenId = res[1].toNumber();
      var auctionOwnerAddress = res[2];
      var auctionMaxBid = res[3].toNumber();
      var auctionMaxBidAddress = res[4];

      assert.equal(auctionContractAddress, rarePepeInstance.address, "The NFT contract address in the auction is not RarePepe.");
      assert.equal(auctionTokenId, 4, "The token ID should be 4");
      assert.equal(auctionOwnerAddress, accounts[0], "The auction should be owned by account 0.");
      assert.equal(auctionMaxBid, 1000, "The max bid should be 1000");
      assert.equal(auctionMaxBidAddress, accounts[2], "Account 2 should be the highest bidder");
    });
  });

  it("...account 3 can not bid 0.5 eth on account 0 RarePepe NFT 4 auction id 1", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;
      return Market.deployed();
    }).then(function(instance) {
      marketInstance = instance;
      marketInstance.bidOnAuction(1, {from: accounts[3], value: 500});
      return marketInstance.getAuction(1);
    }).then(function(res) {
      var auctionContractAddress = res[0];
      var auctionTokenId = res[1].toNumber();
      var auctionOwnerAddress = res[2];
      var auctionMaxBid = res[3].toNumber();
      var auctionMaxBidAddress = res[4];

      assert.equal(auctionContractAddress, rarePepeInstance.address, "The NFT contract address in the auction is not RarePepe.");
      assert.equal(auctionTokenId, 4, "The token ID should be 4");
      assert.equal(auctionOwnerAddress, accounts[0], "The auction should be owned by account 0.");
      assert.notEqual(auctionMaxBid, 500, "The max bid should not be 500");
      assert.notEqual(auctionMaxBidAddress, accounts[3], "Account 3 should not be the highest bidder");

    });
  });

  it("...account 3 can bid 2 eth on account 0 RarePepe NFT 4 auction id 1", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;
      return Market.deployed();
    }).then(function(instance) {
      marketInstance = instance;
      marketInstance.bidOnAuction(1, {from: accounts[3], value: 2000});
      return marketInstance.getAuction(1);
    }).then(function(res) {
      var auctionContractAddress = res[0];
      var auctionTokenId = res[1].toNumber();
      var auctionOwnerAddress = res[2];
      var auctionMaxBid = res[3].toNumber();
      var auctionMaxBidAddress = res[4];

      assert.equal(auctionContractAddress, rarePepeInstance.address, "The NFT contract address in the auction is not RarePepe.");
      assert.equal(auctionTokenId, 4, "The token ID should be 4");
      assert.equal(auctionOwnerAddress, accounts[0], "The auction should be owned by account 0.");
      assert.equal(auctionMaxBid, 2000, "The max bid should be 2000");
      assert.equal(auctionMaxBidAddress, accounts[3], "Account 3 should be the highest bidder");

    });
  });

});
