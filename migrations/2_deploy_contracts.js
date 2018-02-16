var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var FineArt = artifacts.require("./FineArt.sol");
var RarePepe = artifacts.require("./RarePepe.sol");
var Market = artifacts.require("./Market.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(FineArt);
  deployer.deploy(RarePepe);
  deployer.deploy(Market);
};
