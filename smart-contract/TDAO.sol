//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "https://github.com/erc6551/reference/blob/main/src/lib/ERC6551AccountLib.sol#L11";
import "https://github.com/sismo-core/sismo-connect-onchain-verifier/blob/main/src/libs/SismoLib.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./experience.sol";
import "./DAOmember.sol";
import "./ownable.sol";

contract TDAO is Ownable, DAOMember, SismoConnect {

    // call SismoConnect constructor with your appId
    constructor(bytes16 appId) SismoConnect(buildConfig(appId)) {}

    GovToken govToken;
    FinToken finToken;
    GeneralToken generalToken;
    TechToken techToken;
    // DonationToken donationToken;

    enum experienceType{technology, finance, governance, general, donation}

    // for each tasks
    struct Task{
        string eventName;
        TDAO.experienceType eventType;
        uint eventID;
        address validator;
        uint reward;
    }
    uint private globalEventID = 0;
    
    // member struct for points
    struct Member{
        address wallet6551;
        uint redeemLimit;
    }

    // a mapping of all members on the DAO
    mapping(address => Member) public Members; 
    // member completed tasks
    mapping(address => uint[]) public completedTasks;
    // mapping for tasks 
    mapping(uint => Task) public Tasks;

    ////////////////////////////////////////////////////////////////////////////////
    // Sismo connect

    function login(bytes memory sismoConnectResponse) public returns (bool) {    
        SismoConnectVerifiedResult memory result = verify({
            responseBytes: sismoConnectResponse,
            // we want users to prove that they own a Sismo Vault
            // we are recreating the auth request made in the frontend to be sure that 
            // the proof provided in the response is valid with respect to this auth request
            auth: buildAuth({authType: AuthType.EVM_ACCOUNT})       
        });
    
        // if the proofs is valid, we can take the userId from the verified result
        // in this case the userId is the vaultId (since we used AuthType.VAULT in the auth request) 
        // it is the anonymous identifier of a user's vault for a specific app 
        // --> vaultId = hash(userVaultSecret, appId)
        // uint256 EVMID = SismoConnectHelper.getUserId(result, AuthType.EVM_ACCOUNT);
        
        return true;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // member functions

    uint private globalTokenID = 0;

    function createTokens() public onlyOwner {
        govToken = new GovToken(500 * 10 ** 18);
        finToken = new FinToken(500 * 10 ** 18);
        generalToken = new GeneralToken(500 * 10 ** 18);
        techToken = new TechToken(500 * 10 ** 18);
        // donationToken = new DonationToken(500 * 10 ** 18);
    }

    // creating the member
    function createMember(address to) public onlyOwner{
        DAOMember.awardMember(to, "Welcome to Toronto DAOs"); // change to Json for Nouns
        Members[to].wallet6551 = ERC6551AccountLib.computeAddress(0x02101dfB77FDE026414827Fdc604ddAF224F0921, 
        0xb7EC2fad3240022Aa6b014917A61E291298cE483, 
        100, 0x974A40f2Ca32E888e375FA984620fC696EE9F3f0, globalTokenID, 0); // change tokencontract after deployed
        Members[to].redeemLimit = 100;
        globalTokenID ++;
    }
    
    // rewarding members for completing tasks
    function redeemTask(uint taskID, address payable to) public onlyOwner {
        TDAO.experienceType rewardType = Tasks[taskID].eventType;
        if(rewardType == TDAO.experienceType.technology){
            techToken.transfer(Members[to].wallet6551, Tasks[taskID].reward);
        } else if(rewardType == TDAO.experienceType.finance){
            finToken.transfer(Members[to].wallet6551, Tasks[taskID].reward);
        } else if(rewardType == TDAO.experienceType.governance){
            govToken.transfer(Members[to].wallet6551, Tasks[taskID].reward);
        } else if(rewardType == TDAO.experienceType.general){
            generalToken.transfer(Members[to].wallet6551, Tasks[taskID].reward);
        } else{
            // donationToken.transfer(to, Tasks[taskID].reward);
        }
        completedTasks[to].push(taskID);
    }

    // redeem donation points
    // function redeemDonation(address payable to) public {
    //     require(govToken.balanceOf(Members[to].wallet6551) >= Members[to].redeemLimit ||
    //     finToken.balanceOf(Members[to].wallet6551) >= Members[to].redeemLimit ||
    //     generalToken.balanceOf(Members[to].wallet6551) >= Members[to].redeemLimit ||
    //     techToken.balanceOf(Members[to].wallet6551) >= Members[to].redeemLimit
    //     , "you do not have enough experiences to redeem");

    //     donationToken.transfer(Members[to].wallet6551, Members[to].redeemLimit);
    //     Members[to].redeemLimit = 10 * Members[to].redeemLimit;
    // }

    function getTechnology(address to) public view returns (uint) {
        return techToken.balanceOf(Members[to].wallet6551);
    }
    function getGeneral(address to) public view returns (uint) {
        return generalToken.balanceOf(Members[to].wallet6551);
    }
    function getFinance(address to) public view returns (uint) {
        return finToken.balanceOf(Members[to].wallet6551);
    }
    function getGovernance(address to) public view returns (uint) {
        return govToken.balanceOf(Members[to].wallet6551);
    }
    // function getDonation(address to) public view returns (uint) {
    //     return donationToken.balanceOf(Members[to].wallet6551);
    // }

    ////////////////////////////////////////////////////////////////////////////////
    // task functions
    function createTask(string memory eventName, TDAO.experienceType eventType, address validator, uint reward) public onlyOwner{
        Tasks[globalEventID] =  Task(eventName, eventType, globalEventID, validator, reward);
        globalEventID++;
    }

    ////////////////////////////////////////////////////////////////////////////////
    // returns event history and member reputation
    function fetchEventHistory(address member) public view returns(uint256[] memory ) {
        return completedTasks[member];
    }

    function fetchMemberReputation(address member) public view returns(Member memory ){
        return Members[member];
    }

    function fetchTasks(uint taskID) public view returns(Task memory ){
        return Tasks[taskID];
    }
}