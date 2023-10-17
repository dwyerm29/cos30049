// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
    uint256 favoriteNumber;
    bool favoriteBool;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People public person = People({favoriteNumber: 2, name: "Arthur"});

    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public returns (uint256) {
        favoriteNumber = _favoriteNumber;
        return favoriteNumber;
    }

    function retrieveFavouriteNumber() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People({favoriteNumber: _favoriteNumber, name: _name}));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    struct Transaction {
        uint256 transaction_id;
        uint256 token_id;
        uint256 seller_id;
        uint256 buyer_id;
        uint256 sale_time;
        uint256 sale_price;
    }


    Transaction[] public transactions;
    mapping(uint256 => uint256) public tokenIdToOwnerId;

    function addTransaction(uint256 _token_id, uint256 _seller_id, uint256 _buyer_id, uint256 _sale_time, uint256 _sale_price) public {
        uint256 newTransactionID = transactions.length + 1;
        favoriteNumber = newTransactionID;
        transactions.push(Transaction({transaction_id: newTransactionID, token_id: _token_id, seller_id : _seller_id, buyer_id: _buyer_id, sale_time: _sale_time, sale_price: _sale_price}));

        //tokenIdToOwnerId[_token_id] = _seller_id;
    }

    function getAllTransactions() public view returns (Transaction[] memory) {


        //Transaction[] memory return_transactions = new Transaction[](1);

        return transactions;
    }
}