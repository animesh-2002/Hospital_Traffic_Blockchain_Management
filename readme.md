# **Traffic and Hospital Blockchain Project**

---

## **Overview**

This project simulates a blockchain-based system for managing accident reports and hospital dispatches. The system enables hospitals to register themselves and receive accident reports from traffic authorities to find the nearest hospital for quick assistance.

---

## **Prerequisites**

1. **Node.js** (v16 or higher)  
   - [Download and install Node.js](https://nodejs.org/).
2. **Truffle Suite**  
   - Install using:  
     ```bash
     npm install -g truffle
     ```
3. **Ganache**  
   - Download and install Ganache from the [official website](https://trufflesuite.com/ganache/).
4. **MetaMask Extension** (Browser-based Ethereum wallet)  
   - Install the [MetaMask browser extension](https://metamask.io/).
5. **Solidity Compiler**  
   - Comes bundled with Truffle.

---

## **Step-by-Step Installation and Execution**

### **1. Clone the Repository**
Clone the project repository from GitHub:
```bash
git clone https://github.com/your-repo/blockchain-hospital-traffic.git
cd blockchain-hospital-traffic
```

### **2. Install Node.js Dependencies**
Run the following command to install the necessary dependencies:
```bash
npm install
```

### **3. Start Ganache**
1. Open Ganache and create a new workspace.
2. Copy the RPC server URL (e.g., http://127.0.0.1:7545) and note the network ID.

### **4. Compile the Smart Contract**
```bash
truffle compile
```

### **5. Deploy the Smart Contract**
Update truffle-config.js with the Ganache network details:
```
networks: {
    development: {
        host: "127.0.0.1", // Localhost
        port: 7545,        // Ganache port
        network_id: "*"    // Match any network ID
    }
}
```
Deploy the contract:
```bash
truffle migrate --network development
```

### **6. Set Up MetaMask**
1. Add a new network in MetaMask using the Ganache RPC URL and Chain ID.
2. Import an account from Ganache into MetaMask using a private key.

### **7. Run the Client Script**
Update the interact.js script with the deployed contract address from the migration logs. Then, run the script:

```bash
node interact.js
```
