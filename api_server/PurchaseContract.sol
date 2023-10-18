// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PurchaseContract {
    //purchasse information
    struct Purchase {
        string itemName;
        uint256 itemPrice;
        uint256 purchaseTime;
    }
    //user information
    struct User {
        string name;
        string email;
    }
    //holds array information for both purchase and user
    Purchase[] public purchases;
    User[] public users;
    //Mapping used to link each purchase to a user by their repecitve indices in array
    mapping(uint256 => uint256) public purchaseToUser; 

    //Able to add purchase information
    function addPurchase(string memory _itemName, uint256 _itemPrice, uint256 _purchaseTime) public {
        Purchase memory purchase = Purchase({
            itemName: _itemName,
            itemPrice: _itemPrice,
            purchaseTime: _purchaseTime
        });
        purchases.push(purchase);
    }
    //able to add user information
    function addUser(string memory _name, string memory _email) public {
        User memory user = User({
            name: _name,
            email: _email
        });
        users.push(user);
    }
    //Links the purchase to the user depending on array
    function linkPurchaseToUser(uint256 _purchaseNum, uint256 _userNum) public {
        require(_purchaseNum < purchases.length, "Purchase index out of bounds");
        require(_userNum < users.length, "User index out of bounds");

        purchaseToUser[_purchaseNum] = _userNum;
    }
    //gets the purchase information
    function getPurchase(uint256 _index) public view returns (string memory, uint256, uint256) {
        require(_index < purchases.length, "Purchase index out of bounds");
        Purchase memory purchase = purchases[_index];
        return (purchase.itemName, purchase.itemPrice, purchase.purchaseTime);
    }
    //gets the user information
    function getUser(uint256 _index) public view returns (string memory, string memory) {
        require(_index < users.length, "User index out of bounds");
        User memory user = users[_index];
        return (user.name, user.email);
    }
    //gets the purchase information and links it to the user
    function getPurchaseLinkedToUser(uint256 _purchaseNum) public view returns (string memory, uint256, uint256, string memory, string memory) {
        require(_purchaseNum < purchases.length, "Purchase index out of bounds");
        uint256 userNum = purchaseToUser[_purchaseNum];
        require(userNum < users.length, "User index out of bounds");

        Purchase memory purchase = purchases[_purchaseNum];
        User memory user = users[userNum];

        return (purchase.itemName, purchase.itemPrice, purchase.purchaseTime, user.name, user.email);
    }
}
