//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Ownable {
    address private owner;

    constructor () {
        owner = msg.sender;
    }

    modifier onlyOwner () {
        require(isOwner(), "you are not the owner");
        _;
    }

    function isOwner() public view returns (bool){
        return msg.sender == owner;
    }
}
