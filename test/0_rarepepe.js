var RarePepe = artifacts.require("./RarePepe.sol");

contract('RarePepe', function(accounts) {

  it("...should add an NFT in the first account", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[0], 1, '/ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU', {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(1);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU', "The value /ipfs/QmWyaoTFxd1yg5vJm3P49NVcvEouSqSUpbniK925rKSQQU was not stored.");
    });
  });

  it("...the first account should own the NFT", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.ownerOf(1);
    }).then(function(account) {
      assert.equal(account, accounts[0], "The NFT is not owned by the first account.");
    });
  });

  it("...should add an NFT in the second account", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[1], 2, '/ipfs/QmcD15114nUG9abaFAXJ4ERo2rNMJ5B8NXJqkc3Qt6pyru', {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(2);
    }).then(function(metaData) {
      assert.equal(metaData, '/ipfs/QmcD15114nUG9abaFAXJ4ERo2rNMJ5B8NXJqkc3Qt6pyru', "The value /ipfs/QmcD15114nUG9abaFAXJ4ERo2rNMJ5B8NXJqkc3Qt6pyru was not stored.");
    });
  });

  it("...the second account should own the NFT", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.ownerOf(2);
    }).then(function(account) {
      assert.equal(account, accounts[1], "The NFT is not owned by the second account.");
    });
  });

  it("...the first account can send their NFT to the second account", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.transfer(accounts[1], 1, {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.ownerOf(1);
    }).then(function(account) {
      assert.equal(account, accounts[1], "The NFT is not owned by the second account.");
    });
  });

  it("...the first account can NOT steal the second accounts NFT", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.transfer(accounts[0], 2, {from: accounts[0]});
    }).then(function() {
      return rarePepeInstance.ownerOf(2);
    }).then(function(account) {
      assert.notEqual(account, accounts[0], "The first account stole the second account's NFT");
    });
  });

  it("...the second account can NOT create NFTs", function() {
    return RarePepe.deployed().then(function(instance) {
      rarePepeInstance = instance;

      return rarePepeInstance.mint(accounts[1], 3, '/ipfs/QmfTd2R8LJPZwvzf4cM69xjHw9eC2H2BdaA3kHMg6Aq1Vq', {from: accounts[1]});
    }).then(function() {
      return rarePepeInstance.tokenMetadata(3);
    }).then(function(metaData) {
      assert.notEqual(metaData, '/ipfs/QmfTd2R8LJPZwvzf4cM69xjHw9eC2H2BdaA3kHMg6Aq1Vq', "The second account created an NFT storing the value /ipfs/QmfTd2R8LJPZwvzf4cM69xjHw9eC2H2BdaA3kHMg6Aq1Vq.");
    });
  });

});
