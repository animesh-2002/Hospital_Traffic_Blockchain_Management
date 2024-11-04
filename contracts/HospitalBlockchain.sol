// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HospitalBlockchain {
    struct Hospital {
        string name;
        string location; // Simplified as a string; in real applications, we might use coordinates
        address hospitalAddress;
    }

    // State variables
    Hospital[] public hospitals;
    mapping(string => uint) private locationIndex;

    // Events
    event HospitalRegistered(string name, string location, address hospitalAddress);
    event NearestHospitalFound(string name, string location, address hospitalAddress);

    // Register a new hospital
    function registerHospital(string memory name, string memory location) public {
        hospitals.push(Hospital(name, location, msg.sender));
        locationIndex[location] = hospitals.length - 1; // Mapping location to index for reference
        emit HospitalRegistered(name, location, msg.sender);
    }

    // Find the nearest hospital based on location (simplified)
    function findNearestHospital(string memory userLocation) public view returns (string memory) {
        require(hospitals.length > 0, "No hospitals registered");

        // For demonstration, just return the first hospital with the given location
        // Replace this with actual distance calculation logic if possible
        for (uint i = 0; i < hospitals.length; i++) {
            if (keccak256(abi.encodePacked(hospitals[i].location)) == keccak256(abi.encodePacked(userLocation))) {
                return hospitals[i].name;
            }
        }
        
        // If no matching hospital is found
        return "No nearby hospital found";
    }

    // View all registered hospitals
    function getHospitals() public view returns (Hospital[] memory) {
        return hospitals;
    }
}
