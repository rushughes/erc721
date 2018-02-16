var Market = artifacts.require("./Market.sol");
var FineArt = artifacts.require("./FineArt.sol");
var RarePepe = artifacts.require("./RarePepe.sol");


contract('Market', function(accounts) {

  it("...should add a FineArt NFT in the first account", function() {
    return FineArt.deployed().then(function(instance) {
      fineArtInstance = instance;

      return fineArtInstance.createFineArt(accounts[0], 1, '/ipfs/FINEART', {from: accounts[0]});
    }).then(function() {
      return fineArtInstance.tokenMetadata(1);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/FINEART', "The value /ipfs/FINEART was not stored.");
    });
  });

  it("...should add a RarePepe NFT in the second account", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[1], 1, '/ipfs/RAREPEPE', {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(1);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/RAREPEPE', "The value /ipfs/RAREPEPE was not stored.");
    });
  });

  it("...first account can approve NFT transfer to market contract", function() {
    return FineArt.deployed().then(function(instance) {
      fineArtInstance = instance;

      return Market.deployed();
    }).then(function(instance) {
        marketInstance = instance;
        return fineArtInstance.approve(marketInstance.address, 1, {from: accounts[0]});
    });
  });

  it("...market can takeOwnership of first accounts NFT", function() {
    return FineArt.deployed().then(function(instance) {
      fineArtInstance = instance;
      return Market.deployed();
    }).then(function(instance) {
        marketInstance = instance;
        marketInstance.acceptOwnership(1, fineArtInstance.address, {from: accounts[0]});
    }).then(function() {
        return marketInstance.getTotalAuctions();
    }).then(function(res) {
      totalAuctions = res.toNumber();
      assert.equal(totalAuctions, 1, "The total number of auctions is not 1.");
      return fineArtInstance.ownerOf(1);
    }).then(function(account) {
      assert.equal(account, marketInstance.address, "The NFT is not owned by market contract.");
      return marketInstance.getAuction(0);
    }).then(function(contractAddress) {
      assert.equal(contractAddress, fineArtInstance.address, "The NFT contract address was not stored.");
    });
  });

  // it("...market can takeOwnership of first accounts NFT", function() {
  //   return FineArt.deployed().then(function(instance) {
  //     fineArtInstance = instance;
  //     return Market.deployed();
  //   }).then(function(instance) {
  //       marketInstance = instance;
  //       return marketInstance.bid(1, fineArtInstance.address, 1, {from: accounts[0]});
  //   }).then(function(res) {
  //   });
  // });

});
