var Etherlogin = artifacts.require("./EtherLogin.sol");

module.exports = function(deployer) {
  deployer.deploy(Etherlogin);
};
