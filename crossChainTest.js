// const { PluginLedgerConnectorEthereum } = require("@hyperledger/cactus-plugin-ledger-connector-ethereum");
// const { PluginRegistry } = require("@hyperledger/cactus-core");
// const { ApiClient } = require("@hyperledger/cactus-api-client");
// const TrafficBlockchain = require('./client/src/contracts/TrafficBlockchain.json');
// const HospitalBlockchain = require('./client/src/contracts/HospitalBlockchain.json');

// // Create a plugin registry instance
// const pluginRegistry = new PluginRegistry();

// const trafficConnector = new PluginLedgerConnectorEthereum({
//     instanceId: "traffic-ledger-connector",   // Unique ID for the Traffic blockchain
//     rpcApiHttpHost: "http://127.0.0.1:7545",  // Traffic blockchain RPC endpoint
//     pluginRegistry,                             // Add the plugin registry
//     logLevel: "INFO",
// });
// console.log(trafficConnector)
// const hospitalConnector = new PluginLedgerConnectorEthereum({
//     instanceId: "hospital-ledger-connector",  // Unique ID for the Hospital blockchain
//     rpcApiHttpHost: "http://127.0.0.1:7545",  // Hospital blockchain RPC endpoint
//     pluginRegistry,                             // Add the plugin registry
//     logLevel: "INFO",
// });
// console.log(hospitalConnector)
// // Create an API client instance
// const apiClient = new ApiClient();

// // Log ABIs for debugging
// console.log("TrafficBlockchain ABI:", TrafficBlockchain.abi);
// console.log("HospitalBlockchain ABI:", HospitalBlockchain.abi);
// // console.log("TrafficBlockchain reportAccident inputs:", TrafficBlockchain.abi[0].inputs);
// // console.log("HospitalBlockchain findNearestHospital inputs:", HospitalBlockchain.abi[0].inputs);
// // console.log("Reporter Address:", "0x6e35D94DC975660c05C042Fe28f3583C4fFCd4c7");
// // console.log("Location:", "Highway 101");
// // console.log("Timestamp:", Math.floor(Date.now() / 1000));

// async function crossChainTest() {
//     try {
//         const trafficAddress = "0xBfC7b736cbF9084CD024B2a64e0A7CfB8ba78260";  // Traffic contract address
//         const hospitalAddress = "0xA990779959aDebE5061702819809453DFD526101"; // Hospital contract address
  
//         // Report accident on TrafficBlockchain
//         console.log("Reporting accident on TrafficBlockchain...");
//         const reportAccidentResponse = await trafficConnector.transact({
//             contractAddress: trafficAddress,
//             contractAbi: TrafficBlockchain.abi,
//             methodName: "reportAccident",
//             params: [
//                 "0x6e35D94DC975660c05C042Fe28f3583C4fFCd4c7", // Replace with actual reporter address
//                 "Highway 101",       // The location
//                 Math.floor(Date.now() / 1000) // Current timestamp
//             ],
//             gas: 100000,
//         });
//         console.log("Accident Reported:", reportAccidentResponse);
  
//         // Fetch nearest hospital from HospitalBlockchain
//         console.log("Fetching nearest hospital from HospitalBlockchain...");
//         const nearestHospitalResponse = await hospitalConnector.transact({
//             contractAddress: hospitalAddress,
//             contractAbi: HospitalBlockchain.abi,
//             methodName: "findNearestHospital",
//             params: [
//                 "Hospital Name",     // Replace with the actual hospital name
//                 "Highway 101",       // The location
//                 "0x86fb01012745d224591EFaaB51756e1a69495dF4"  // Replace with the actual hospital address
//             ],
//             gas: 100000,
//         });
//         console.log("Nearest Hospital:", nearestHospitalResponse);
  
//     } catch (error) {
//         console.error("Error in cross-chain test:", error); // Log the entire error object
//     }
// }

// crossChainTest()
const { PluginLedgerConnectorEthereum } = require("@hyperledger/cactus-plugin-ledger-connector-ethereum");
const { PluginRegistry } = require("@hyperledger/cactus-core");
const { ApiClient } = require("@hyperledger/cactus-api-client");
const TrafficBlockchain = require('./client/src/contracts/TrafficBlockchain.json');
const HospitalBlockchain = require('./client/src/contracts/HospitalBlockchain.json');

// Create a plugin registry instance
const pluginRegistry = new PluginRegistry();

const trafficConnector = new PluginLedgerConnectorEthereum({
    instanceId: "traffic-ledger-connector",   // Unique ID for the Traffic blockchain
    rpcApiHttpHost: "http://127.0.0.1:7545",  // Traffic blockchain RPC endpoint
    pluginRegistry,                             // Add the plugin registry
    logLevel: "INFO",
});
console.log(trafficConnector)
const hospitalConnector = new PluginLedgerConnectorEthereum({
    instanceId: "hospital-ledger-connector",  // Unique ID for the Hospital blockchain
    rpcApiHttpHost: "http://127.0.0.1:7545",  // Hospital blockchain RPC endpoint
    pluginRegistry,                             // Add the plugin registry
    logLevel: "INFO",
});

// Create an API client instance
const apiClient = new ApiClient();

// **Verify ABI definitions (optional - for debugging)**

console.log(TrafficBlockchain.abi)

async function crossChainTest() {
    try {
        const trafficAddress = "0xBfC7b736cbF9084CD024B2a64e0A7CfB8ba78260";  // Traffic contract address
        const hospitalAddress = "0xA990779959aDebE5061702819809453DFD526101"; // Hospital contract address
  
        // Report accident on TrafficBlockchain
        console.log("Reporting accident on TrafficBlockchain...");

        const reportAccidentResponse = await trafficConnector.transact({
            contractAddress: trafficAddress,
            // Ensure ABI is defined correctly
            contractAbi: TrafficBlockchain.abi, // Check if ABI is populated
            methodName: "reportAccident",
            
            params: [
                
                "0x86fb01012745d224591EFaaB51756e1a69495dF4", // Replace with actual reporter address
                "Highway 101",       // The location
                Math.floor(Date.now() / 1000) // Current timestamp
            ],
            gas: 100000,
        });
        console.log("Accident Reported:", reportAccidentResponse);
  
        // Fetch nearest hospital from HospitalBlockchain
        console.log("Fetching nearest hospital from HospitalBlockchain...");
        const nearestHospitalResponse = await hospitalConnector.transact({
            contractAddress: hospitalAddress,
            // Ensure ABI is defined correctly
            contractAbi: HospitalBlockchain.abi, // Check if ABI is populated
            methodName: "findNearestHospital",
            params:[
                "Hospital Name",     // Replace with the actual hospital name
                "Highway 101",       // The location
                "0x86fb01012745d224591EFaaB51756e1a69495dF4"  // Replace with the actual hospital address
            ],
            gas: 100000,
        });
        console.log("Nearest Hospital:", nearestHospitalResponse);
  
    } catch (error) {
        console.error("Error in cross-chain test:", error); // Log the entire error object
    }
}

crossChainTest();