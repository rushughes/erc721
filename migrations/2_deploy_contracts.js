var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var ProvablyRare = artifacts.require("./ProvablyRare.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
