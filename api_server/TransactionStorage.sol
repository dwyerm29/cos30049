// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
//pragma experimental ABIEncoderV2;

contract TransactionStorage {


    struct Transaction {
        uint256 transaction_id;
        uint256 token_id;
        uint256 seller_id;
        uint256 buyer_id;
        uint256 sale_time;
        uint256 sale_price;

        string owner_name;
        string token_name;
    }


    Transaction[] public transactions;
    mapping(uint256 => uint256) public tokenIdToOwnerId;
    mapping(uint256 => Transaction) public tokenIdToLatestTransaction;

    function addTransaction(uint256 _token_id, uint256 _seller_id, uint256 _buyer_id, uint256 _sale_time, uint256 _sale_price, string memory _owner_name, string memory _token_name) public {
        uint256 newTransactionID = transactions.length + 1;
        Transaction memory newTransaction = Transaction({transaction_id: newTransactionID, token_id: _token_id, seller_id : _seller_id, buyer_id: _buyer_id, sale_time: _sale_time, sale_price: _sale_price, owner_name: _owner_name, token_name: _token_name});
        transactions.push(newTransaction);

        tokenIdToOwnerId[_token_id] = _seller_id;

        tokenIdToLatestTransaction[_token_id] = newTransaction;
    }

    function getAlltransactionsForUser(uint256 _user_id) public view returns (Transaction[] memory) {
        //Transaction[] memory transactionsList = new Transaction[](1);
        Transaction[] memory transactionsList;

        for(uint256 i = 0; i < transactions.length; i++) {
            if()
        }

    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }





}