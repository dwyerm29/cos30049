// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract PurchaseContract{

    struct Purchase {
        uint tokenid;
        string itemName;
        uint itemPrice;
        uint purchaseTime;
    }
    
    struct User {
        string firstName;
        string lastName;
        uint buyerid;
        string email;
    }

    mapping(address => Purchase) public purchases;
    mapping(address => User) public users;

    function makePurchase(uint tokenid, string memory itemName, uint itemPrice, string memory firstName, string memory lastName, uint buyerid, string memory email) public {
        Purchase storage purchase = purchases[msg.sender];
        User storage user = users[msg.sender];

        purchase.tokenid = tokenid;
        purchase.itemName = itemName;
        purchase.itemPrice = itemPrice;
        purchase.purchaseTime = block.timestamp;
        user.firstName = firstName;
        user.lastName = lastName;
        user.buyerid = buyerid;
        user.email = email;
    }

}
