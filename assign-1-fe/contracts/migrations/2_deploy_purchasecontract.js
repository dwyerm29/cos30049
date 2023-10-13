const { artifacts } = require("truffle");
const PurchaseContract = artifacts.require("PurchaseContract");
module.exports = function (deployer) {
  deployer.deploy(PurchaseContract);
};
