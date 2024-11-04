// Required libraries
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');

// Initialize Web3 with Ganache provider directly
const web3 = new Web3("http://127.0.0.1:7545");

// Load Contract ABI and Address
const hospitalBlockchainABI = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'client/src/contracts/HospitalBlockchain.json'))
).abi;

const trafficBlockchainABI = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'client/src/contracts/TrafficBlockchain.json'))
).abi;

// Contract addresses (replace with addresses from Ganache after deployment)
const hospitalBlockchainAddress = "0xA990779959aDebE5061702819809453DFD526101";
const trafficBlockchainAddress = "0xBfC7b736cbF9084CD024B2a64e0A7CfB8ba78260";


// Contract instances
const hospitalContract = new web3.eth.Contract(hospitalBlockchainABI, hospitalBlockchainAddress);
const trafficContract = new web3.eth.Contract(trafficBlockchainABI, trafficBlockchainAddress);

// Register a hospital
async function registerHospital(name, location) {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    await hospitalContract.methods.registerHospital(name, location).send({ from: accounts[0], gas: 3000000 });
    console.log(`Hospital registered: ${name}, ${location}`);
  } catch (error) {
    console.error("Error registering hospital:", error);
  }
}

// Find the nearest hospital
async function findNearestHospital(userLocation) {
  try {
    const nearestHospital = await hospitalContract.methods.findNearestHospital(userLocation).call();
    console.log(`Nearest hospital at ${userLocation}: ${nearestHospital}`);
  } catch (error) {
    console.error("Error finding nearest hospital:", error);
  }
}

// Report an accident
async function reportAccident(location) {
  try {
    const accounts = await web3.eth.getAccounts();
    await trafficContract.methods.reportAccident(location).send({ from: accounts[0],gas:3000000 });
    console.log(`Accident reported at ${location}`);
  } catch (error) {
    console.error("Error reporting accident:", error);
  }
}

// Retrieve all accident reports
async function getAllAccidentReports() {
  try {
    const reports = await trafficContract.methods.getAllReports().call();
    console.log("Accident Reports:", reports);
  } catch (error) {
    console.error("Error retrieving accident reports:", error);
  }
}

// Execute functions
(async () => {
   

  await registerHospital("City Hospital", "Downtown");
  await findNearestHospital("Downtown");
  await reportAccident("Highway 101");
  await getAllAccidentReports();
})();
