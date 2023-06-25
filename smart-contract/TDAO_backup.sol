//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "https://github.com/erc6551/reference/blob/main/src/lib/ERC6551AccountLib.sol#L11";
import "./experienceTokens.sol";
import "./DAOmember.sol";
import "./ownable.sol";
contract TDAO is Ownable {

    // for each tasks
    struct Task{
        string eventName;
        string eventType;
        uint eventID;
        address validator;
        uint reward;
    }
    uint private globalEventID = 0;
    
    // member struct for points
    struct Member{
        // points
        uint technology;
        uint governance;
        uint finance;
        uint general;
        
        // for donations
        uint donation;
        uint donationThreshold;
        uint redeemableAmount;
    }

    // a mapping of all members on the DAO
    mapping(address => Member) public Members; 
    // member completed tasks
    mapping(address => uint[]) public completedTasks;
    // mapping for tasks 
    mapping(uint => Task) public Tasks;

    ////////////////////////////////////////////////////////////////////////////////
    // member functions

    // creating the member
    function createMember(address person) public onlyOwner{
        Members[person] =  Member(0, 0, 0, 0, 0, 100, 10);
    }
    
    // rewarding members for completing tasks
    function redeemTask(uint taskID, address member) public onlyOwner {
        string memory taskName = Tasks[taskID].eventType;
        if(keccak256(abi.encodePacked(taskName)) == keccak256(abi.encodePacked("technology"))){
            Members[member].technology += Tasks[taskID].reward;
        } else if(keccak256(abi.encodePacked(taskName)) == keccak256(abi.encodePacked("governance"))){
            Members[member].governance += Tasks[taskID].reward;
        } else if(keccak256(abi.encodePacked(taskName)) == keccak256(abi.encodePacked("finance"))){
            Members[member].finance += Tasks[taskID].reward;
        } else{
            Members[member].general += Tasks[taskID].reward;
        }

        completedTasks[member].push(taskID);
    }

    // redeem donation points
    function redeemDonation(address sender) public {
        require(Members[sender].technology >= Members[sender].donationThreshold || 
        Members[sender].governance >= Members[sender].donationThreshold ||
        Members[sender].finance >= Members[sender].donationThreshold ||
        Members[sender].general >= Members[sender].donationThreshold, "you do not have enough experiences to redeem");
        
        Members[sender].donation += Members[sender].redeemableAmount;
        Members[sender].donationThreshold = 10 * Members[sender].donationThreshold;
        Members[sender].redeemableAmount = 10 * Members[sender].redeemableAmount;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // task functions
    function createTask(string memory eventName, string memory eventType, address validator, uint reward) public onlyOwner{
        Tasks[globalEventID] =  Task(eventName, eventType, globalEventID, validator, reward);
        globalEventID ++;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // returns event history and member reputation
    function fetchEventHistory(address member) public view returns(uint256[] memory ) {
        return completedTasks[member];
    }

    function fetchMemberReputation(address member) public view returns(Member memory ){
        return Members[member];
    }
}