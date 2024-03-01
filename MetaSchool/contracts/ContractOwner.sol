// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ContractOwner {

    address private ownerAddress;
    string private ownerName;

    constructor() {
        ownerAddress = msg.sender;
        ownerName = "Initial Owner";
    }

     modifier onlyOwner() {
        require(msg.sender == ownerAddress, "Only owner is allowed");
        _;
    }

    // Function to update the entity's name
    function updateOwner(address newOwner) public onlyOwner {
        ownerAddress = newOwner;
    }

    // Function to update the entity's age
    function updateOwnerName(string calldata newOwnerName) public onlyOwner {
        ownerName = newOwnerName;
    }

    // Function to retrieve the entity's name and age
    function getOwnerDetails() public view returns (address, string memory) {
        return (ownerAddress, ownerName);
    }
}
