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
        string sale_price;
        string owner_name;
        string owner_email;
        string token_name;
    }

    Transaction[] public transactions;
    
    mapping(uint256 => uint256) public tokenIdToOwnerId;
    //used to determine who the owner of a token is
    mapping(uint256 => Transaction) public tokenIdToLatestTransaction;

    function addTransaction(uint _token_id, uint _seller_id, uint _buyer_id, uint _sale_time, string memory _sale_price, string memory _owner_name, string memory _owner_email, string memory _token_name) public {
        uint256 newTransactionID = transactions.length + 1;
        Transaction memory newTransaction = Transaction({transaction_id: newTransactionID, token_id: _token_id, seller_id : _seller_id, buyer_id: _buyer_id, sale_time: _sale_time, sale_price: _sale_price, owner_name: _owner_name, owner_email: _owner_email, token_name: _token_name});
        transactions.push(newTransaction);

        tokenIdToOwnerId[_token_id] = _buyer_id;
        tokenIdToLatestTransaction[_token_id] = newTransaction;
    }

    function populateTransactions() public {
        addTransaction(2, 33, 33, 55, "2.6", "Dave", "dave@example.com", "sdfsd");
        addTransaction(3, 33, 33, 55, "24", "Dave", "dave@example.com", "sdfsd");
        addTransaction(4, 44, 33, 55, "0.1", "Steve", "dave@example.com", "sdfsd");
        addTransaction(5, 44, 33, 55, "2", "Steve", "dave@example.com", "sdfsd");
        addTransaction(6, 44, 33, 55, "2", "Steve", "dave@example.com", "sdfsd");
        addTransaction(7, 44, 33, 55, "2", "Steve", "dave@example.com", "sdfsd");
    }

    //this is used as an input to the populateMultipleTransactions function, which is used when buying more than one asset at a time
    struct InputTransaction { 
        uint256 token_id;
        uint256 seller_id;
        uint256 buyer_id;
        uint256 sale_time;
        string sale_price;
        string owner_name;
        string owner_email;
        string token_name;
    }

    //used to to make more than transaction at once, for instance when purchasing more than one asset, or initialising a database
    function addMultipleTransactions(InputTransaction[] memory _transactions) public {
        for(uint256 i = 0; i < _transactions.length; i++) {
            addTransaction(_transactions[i].token_id, _transactions[i].seller_id, _transactions[i].buyer_id, _transactions[i].sale_time, _transactions[i].sale_price, _transactions[i].owner_name, _transactions[i].owner_email, _transactions[i].token_name);
        }
    }

    //used to populate a user's transaction table
    function getAllTransactionsForUser(uint256 _user_id) public view returns (Transaction[] memory) {
 
        uint256 listLength = 0;
        for(uint256 i = 0; i < transactions.length; i++) {
            if((transactions[i].seller_id == _user_id) || (transactions[i].buyer_id == _user_id)) {
                listLength++;
            }
        }

        Transaction[] memory transactionsForUser = new Transaction[](listLength);
        uint256 j;

        for (uint256 i = 0; i < transactions.length; i++) {
            if ((transactions[i].seller_id == _user_id) || (transactions[i].buyer_id == _user_id)) {
                transactionsForUser[j] = transactions[i]; 
                j++;
            }
        }
        return transactionsForUser;
    }

    //used to populate a user's currently owned assets table
    function getAllOwnedAssetsForUser(uint256 _user_id) public view returns (Transaction[] memory) {
        uint256 listLength = 0;
        for(uint256 i = 0; i < transactions.length; i++) {
            if((transactions[i].buyer_id == _user_id)) {
                if(tokenIdToOwnerId[transactions[i].token_id] == _user_id){
                    listLength++;
                }
            }
        }

        Transaction[] memory OwnedAssetsForUser = new Transaction[](listLength);
        uint256 j;

        for (uint256 i = 0; i < transactions.length; i++) {
            if((transactions[i].buyer_id == _user_id)) {
                if(tokenIdToOwnerId[transactions[i].token_id] == _user_id){
                    OwnedAssetsForUser[j] = transactions[i]; 
                    j++;
                }
            }
        }    
        return OwnedAssetsForUser;
    }

    //used mostly for debugging purposes
    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }





}