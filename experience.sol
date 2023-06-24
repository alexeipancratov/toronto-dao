// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TechToken is ERC20 {
    address owner;

    constructor(uint256 initialSupply) ERC20("TDAO-Tech", "TDT") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }
 
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(msg.sender == owner, "you cannot transfer your experience points");
        address to_transfer = _msgSender();
        _transfer(to_transfer, to, amount);
        return true;
    }
}

contract FinToken is ERC20 {
    address owner;

    constructor(uint256 initialSupply) ERC20("TDAO-Fin", "TDF") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }
 
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(msg.sender == owner, "you cannot transfer your experience points");
        address to_transfer = _msgSender();
        _transfer(to_transfer, to, amount);
        return true;
    }
}

contract GeneralToken is ERC20 {
    address owner;

    constructor(uint256 initialSupply) ERC20("TDAO-Gen", "TDGen") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }
 
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(msg.sender == owner, "you cannot transfer your experience points");
        address to_transfer = _msgSender();
        _transfer(to_transfer, to, amount);
        return true;
    }
}

contract GovToken is ERC20 {
    address owner;

    constructor(uint256 initialSupply) ERC20("TDAO-Gov", "TDGov") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }
 
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(msg.sender == owner, "you cannot transfer your experience points");
        address to_transfer = _msgSender();
        _transfer(to_transfer, to, amount);
        return true;
    }
}

contract DonationToken is ERC20 {
    // donation coins operates as normal since there is no restrictions
    constructor(uint256 initialSupply) ERC20("TDAO-Donation", "TDDon") {
        _mint(msg.sender, initialSupply);
    }
}