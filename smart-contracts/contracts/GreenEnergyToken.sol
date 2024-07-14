// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./StandardERC20.sol";

/// @title Green Energy Token Contract
/// @notice This token is used to tokenize the energy assets from green energy producers
contract GreenEnergyToken is StandardERC20 {

    struct CarbonFootprintRecord {
        uint256 timestamp;
        address company;
        uint256 footprint;
        string action; // "add" for addition, "reduce" for reduction
    }

    mapping(address => uint) public footprintGenerated;
    mapping(address => address) public approvedIot;
    address public owner;
    address[] public certifiedAddresses;
    CarbonFootprintRecord[] public footprintRecords;

    event Buy(address indexed to, uint indexed footPrint, uint indexed amount);
    event Compensate(address indexed to, uint indexed footPrint, uint indexed amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() StandardERC20("Green Energy Token", "GET", 100 * 10**18) {
        require(msg.sender != address(0), "Invalid owner address");
        owner = msg.sender;
    }

    function mint(uint256 amount) public onlyOwner {
        _mint(address(this), amount);
    }

    function addFootprint(address company, uint256 footprint) public onlyOwner {
        footprintGenerated[company] += footprint;
        footprintRecords.push(CarbonFootprintRecord(block.timestamp, company, footprint, "add"));
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(owner).transfer(balance);
    }

    function getFootPrint(address company) public view returns (uint256) {
        return footprintGenerated[company];
    }

    function buy() public payable {
        require(msg.value > 0, "Value must be greater than 0");
        uint256 amount = msg.value;
        _transfer(address(this), msg.sender, amount);
        emit Buy(msg.sender, footprintGenerated[msg.sender], amount);
    }

    function getIOT(address company) public view returns (address) {
        return approvedIot[company];
    }

    function compensate(uint256 footprint) public {
        // Calculate the amount of tokens required, allowing for fractional tokens
        uint256 amount = (footprint * 10**18) / 1000;
        require(balanceOf(msg.sender) >= amount, "Insufficient balance to compensate");
        require(footprintGenerated[msg.sender] >= footprint, "Insufficient carbon footprint to compensate");

        _burn(msg.sender, amount);
        footprintGenerated[msg.sender] -= footprint;
        footprintRecords.push(CarbonFootprintRecord(block.timestamp, msg.sender, footprint, "reduce"));

        emit Compensate(msg.sender, footprint, amount);
    }

    function changeOwner(address newOwner) public onlyOwner returns (bool) {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        return true;
    }

    function approveIOT(address company, address iotDevice) public onlyOwner {
        approvedIot[company] = iotDevice;
        if (iotDevice != address(0) && !isCertified(company)) {
            certifiedAddresses.push(company);
        }
    }

    function isCertified(address company) public view returns (bool) {
        for (uint i = 0; i < certifiedAddresses.length; i++) {
            if (certifiedAddresses[i] == company) {
                return true;
            }
        }
        return false;
    }

    function getCertifiedAddresses() public view returns (address[] memory) {
        return certifiedAddresses;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getFootprintRecords() public view returns (CarbonFootprintRecord[] memory) {
        return footprintRecords;
    }
}
