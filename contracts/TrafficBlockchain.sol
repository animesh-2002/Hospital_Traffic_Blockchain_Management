// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrafficBlockchain {
    struct AccidentReport {
        string location;
        uint256 timestamp;
        address reporter;
    }

    // State variables
    AccidentReport[] public accidentReports;
    mapping(address => uint256[]) public userReports;

    // Events
    event AccidentReported(address indexed reporter, string location, uint256 timestamp);

    // Function to report an accident
    function reportAccident(string memory location) public {
        AccidentReport memory newReport = AccidentReport({
            location: location,
            timestamp: block.timestamp,
            reporter: msg.sender
        });

        accidentReports.push(newReport);
        userReports[msg.sender].push(accidentReports.length - 1);

        emit AccidentReported(msg.sender, location, block.timestamp);
    }

    // Get all accident reports
    function getAllReports() public view returns (AccidentReport[] memory) {
        return accidentReports;
    }

    // Get reports by a specific user
    function getUserReports(address user) public view returns (AccidentReport[] memory) {
        uint256[] storage reportIndices = userReports[user];
        AccidentReport[] memory reports = new AccidentReport[](reportIndices.length);
        
        for (uint256 i = 0; i < reportIndices.length; i++) {
            reports[i] = accidentReports[reportIndices[i]];
        }
        return reports;
    }
}
