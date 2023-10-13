// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;


contract SimpleStorage{

    struct Purchase {
        uint tokenid;
        string itemName;
        uint itemPrice;
        uint purchaseTime;
        string firstName;
        string lastName;
        uint buyerid;
        string email;
    }
   
    Purchase public purchaseData;
   //stores the purchasing information
    function store(
        uint256 tokenid,
        string memory itemName,
        uint256 itemPrice,
        uint purchaseTime,
        string memory firstName,
        string memory lastName,
        uint256 buyerid,
        string memory email             
    ) public {
        purchaseData.tokenid = tokenid;
        purchaseData.itemName = itemName;
        purchaseData.itemPrice = itemPrice;
        purchaseData.purchaseTime = purchaseTime;
        purchaseData.firstName = firstName;
        purchaseData.lastName = lastName;
        purchaseData.buyerid = buyerid;
        purchaseData.email = email;
    }

 
//gets/retrieves purchase information
    function getItemData() public view returns(uint tokenid, string memory itemName, uint itemPrice, uint purchaseTime, string memory firstName, string memory lastName, uint buyerid, string memory email)  {
       

      tokenid = purchaseData.tokenid ;
      itemName = purchaseData.itemName ;
      itemPrice = purchaseData.itemPrice  ;
     purchaseTime  = purchaseData.purchaseTime  ;
      firstName = purchaseData.firstName  ;
      lastName = purchaseData.lastName  ;
      buyerid = purchaseData.buyerid  ;
      email = purchaseData.email;
    }

}
