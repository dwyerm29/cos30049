const { artifacts } = require("truffle");
const SimpleStorage = artifacts.require("SimpleStorage");
module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
