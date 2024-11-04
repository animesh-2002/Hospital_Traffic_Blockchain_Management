// const HospitalBlockchain = artifacts.require("HospitalBlockchain");
// const TrafficBlockchain = artifacts.require("TrafficBlockchain");

// module.exports = function (deployer) {
//   deployer.deploy(HospitalBlockchain);
//   deployer.deploy(TrafficBlockchain);
// };

const HospitalBlockchain = artifacts.require("HospitalBlockchain");
const TrafficBlockchain = artifacts.require("TrafficBlockchain");

module.exports = async function (deployer, network, accounts) {
  // Deploy HospitalBlockchain using the first account
  await deployer.deploy(HospitalBlockchain, { from: accounts[0] });
  
  // Deploy TrafficBlockchain using the second account
  await deployer.deploy(TrafficBlockchain, { from: accounts[1] });
};
