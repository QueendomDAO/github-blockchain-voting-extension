var Voting = artifacts.require("./Voting.sol");
var Incrementer = artifacts.require("./Incrementer.sol");
var PollManager = artifacts.require("./Incrementer.sol");
var Poll = artifacts.require("./Incrementer.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting);
  deployer.deploy(Incrementer);
  deployer.deploy(PollManager);
  deployer.deploy(Poll);
};