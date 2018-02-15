var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var FineArt = artifacts.require("./FineArt.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(FineArt);
};
