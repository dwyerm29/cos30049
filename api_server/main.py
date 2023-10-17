from fastapi import FastAPI, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, Union
from web3 import Web3
from solcx import compile_standard, install_solc
# CHECK README IF YOU GET AN ERROR HERE
from db_config import db_config

# DB
import mysql.connector

#W3
from web3 import Web3
w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
from solcx import compile_standard, install_solc
import json

import time


app = FastAPI()

origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# return a list of Users without their passwords
@app.get("/users/")
def get_users():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()
        # Define the SQL query to retrieve data (e.g., all Users)
        query = "SELECT user_id, first_name, last_name, email, wallet_id FROM Users;"
        # Execute the SQL query
        cursor.execute(query)
        # Fetch all the rows
        result = cursor.fetchall()
        # Convert the result to a list of dictionaries
        users = [dict(zip(cursor.column_names, row)) for row in result]
        # Close the cursor and the database connection
        cursor.close()
        connection.close()
        return users
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# get information for a single asset, along with details like selling price if it exists
@app.get("/asset/{token_id}/")
def get_assets(token_id: int):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = (
            "SELECT Assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name, orig_owner.first_name AS original_owner_first_name, orig_owner.last_name AS original_owner_last_name, orig_owner.user_id AS original_owner_user_id, current_owner.first_name AS current_owner_first_name, current_owner.last_name AS current_owner_last_name, current_owner.user_id AS current_owner_user_id FROM Assets LEFT JOIN AssetsListedForSale ON Assets.token_id=AssetsListedForSale.token_id JOIN FileTypes ON Assets.image_filetype_id=FileTypes.filetype_id JOIN LicenseTypes ON Assets.license_type_id=LicenseTypes.license_type_id JOIN Users orig_owner ON Assets.original_owner=orig_owner.user_id JOIN Users current_owner ON Assets.current_owner=current_owner.user_id WHERE Assets.token_id="
            + str(token_id)
        )
        cursor.execute(query)
        result = cursor.fetchall()
        Assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return Assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# get a list of all Assets listed for sale along with other info
@app.get("/listed_assets/")
def get_listed_assets():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT Assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM Assets JOIN AssetsListedForSale ON Assets.token_id=AssetsListedForSale.token_id JOIN FileTypes on Assets.image_filetype_id=FileTypes.filetype_id JOIN LicenseTypes on Assets.license_type_id=LicenseTypes.license_type_id"
        cursor.execute(query)
        result = cursor.fetchall()
        Assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return Assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# get a list of all featured Assets listed for sale along with other info
@app.get("/featured_assets/")
def get_listed_assets():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT Assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM Assets JOIN AssetsListedForSale ON Assets.token_id = AssetsListedForSale.token_id JOIN FileTypes ON Assets.image_filetype_id = FileTypes.filetype_id JOIN LicenseTypes ON Assets.license_type_id = LicenseTypes.license_type_id JOIN AssetCategories ON Assets.token_id = AssetCategories.token_id JOIN AssetCategoryDescriptions ON AssetCategories.category_id=AssetCategoryDescriptions.category_id WHERE AssetCategoryDescriptions.category_name = 'Featured'"
        cursor.execute(query)
        result = cursor.fetchall()
        Assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return Assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# ! attempt to combine search with category filtering
# get a list of all Assets. Optionally you may provide a list of categories to the query to match the Assets using the following format: http://localhost:8000/Assets/?category=1&category=2


@app.get("/assets/search/")
async def read_items(
    query: Union[str, None] = None, category: Annotated[Union[list[str], None], Query()] = None
):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        dbQuery = "SELECT DISTINCT Assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM Assets JOIN AssetsListedForSale ON Assets.token_id=AssetsListedForSale.token_id JOIN FileTypes ON Assets.image_filetype_id=FileTypes.filetype_id JOIN LicenseTypes ON Assets.license_type_id=LicenseTypes.license_type_id JOIN AssetCategories ON Assets.token_id=AssetCategories.token_id JOIN AssetCategoryDescriptions ON AssetCategories.category_id=AssetCategoryDescriptions.category_id"
        if category != None:
            if len(category) > 0:
                dbQuery += (
                    " WHERE AssetCategoryDescriptions.category_name='"
                    + category[0]
                    + "'"
                )
            if len(category) > 1:
                for i in range(1, len(category)):
                    dbQuery += (
                        " OR AssetCategoryDescriptions.category_name='"
                        + category[i]
                        + "'"
                    )
        if query:
            if category:
                dbQuery += " AND"
            else:
                dbQuery += " WHERE"
            dbQuery += (
                " item_name LIKE '%"
                + query
                + "%' OR item_description LIKE '%"
                + query
                + "%' OR Assets.token_id ='"
                + query
                + "'"
            )
        cursor.execute(dbQuery)
        result = cursor.fetchall()
        Assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return Assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# return a list of Transactions that a particular user has been involved in
@app.get("/user/{user_id}/transactions/")
def get_user_transactions(user_id: int):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = (
            "SELECT transaction_id, Transactions.token_id, seller_id, buyer_id, Assets.sale_price, sale_time, item_name, item_description, image_url, image_thumbnail_url, image_resolution, filetype_name, license_name FROM Transactions JOIN Assets ON Transactions.token_id=Assets.token_id JOIN FileTypes ON Assets.image_filetype_id=FileTypes.filetype_id JOIN LicenseTypes ON Assets.license_type_id=LicenseTypes.license_type_id WHERE seller_id='"
            + str(user_id)
            + "' OR buyer_id = '"
            + str(user_id)
            + "'"
        )
        cursor.execute(query)
        result = cursor.fetchall()
        Assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return Assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# return a list of Assets that a particular user has for sale
@app.get("/user/{user_id}/listed_assets/")
def get_listed_assets(user_id: int):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = (
            "SELECT Assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM Assets JOIN AssetsListedForSale ON Assets.token_id = AssetsListedForSale.token_id JOIN FileTypes ON Assets.image_filetype_id = FileTypes.filetype_id JOIN LicenseTypes ON Assets.license_type_id = LicenseTypes.license_type_id WHERE Assets.current_owner='"
            + str(user_id)
            + "'"
        )
        cursor.execute(query)
        result = cursor.fetchall()
        Assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return Assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# return a list of Assets that a specified user currently owns
@app.get("/user/{user_id}/owned_assets/")
def get_user_Transactions(user_id: int):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = (
            "SELECT Assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, filetype_name, license_name, sale_price, transaction_datetime FROM Assets JOIN FileTypes ON Assets.image_filetype_id = FileTypes.filetype_id JOIN LicenseTypes ON Assets.license_type_id = LicenseTypes.license_type_id WHERE Assets.current_owner='"
            + str(user_id)
            + "'"
        )
        cursor.execute(query)
        result = cursor.fetchall()
        Assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return Assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# get a list of all asset categories along with their descriptions
@app.get("/asset_categories/")
def get_asset_categories():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM AssetCategoryDescriptions"
        cursor.execute(query)
        result = cursor.fetchall()
        AssetCategories = [dict(zip(cursor.column_names, row))
                           for row in result]
        cursor.close()
        connection.close()
        return AssetCategories
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# get a list of all asset filetypes along with their descriptions


@app.get("/asset_filetypes/")
def get_asset_filetypes():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM filetypes"
        cursor.execute(query)
        result = cursor.fetchall()
        FileTypes = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return FileTypes
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

 # get a list of all asset filetypes along with their descriptions


@app.get("/asset_licensetypes/")
def get_asset_licensetypes():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM licensetypes"
        cursor.execute(query)
        result = cursor.fetchall()
        LicenseTypes = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return LicenseTypes
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


class LoginRequest(BaseModel):
    email: str
    password: str


# check whether a user's username and password are correct. returns a user object if successful, or empty response if unsuccessful
@app.post("/login/")
def login(login: LoginRequest):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = (
            "SELECT user_id, first_name, last_name, email, wallet_id FROM Users WHERE email='"
            + login.email
            + "' AND password='"
            + login.password
            + "'"
        )
        cursor.execute(query)
        result = cursor.fetchall()
        user = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return user
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


class CreateAssetRequest(BaseModel):
    name: str
    description: str
    imageURL: str
    imageThumbnailURL: str
    imageResolution: str
    licenseTypeID: int
    imageFileTypeID: int
    ownerID: int
    categoryIDs: set[int]

# Posts a new asset to the Assets table, along with a creation transaction (price: 0, both buyer and seller ID that of the uploader), and associated asset categories/


@app.post("/postnewasset/")
def postNewAsset(newAsset: CreateAssetRequest):
    try:
        print(newAsset)
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        addAssetQuery = (
            "INSERT INTO Assets (item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner, current_owner, sale_price, transaction_datetime) VALUES ('"
            + newAsset.name
            + "', '"
            + newAsset.description
            + "', '"
            + newAsset.imageURL
            + "', '"
            + newAsset.imageThumbnailURL
            + "', '"
            + newAsset.imageResolution
            + "', '"
            + str(newAsset.imageFileTypeID)
            + "', '"
            + str(newAsset.licenseTypeID)
            + "', '"
            + str(newAsset.ownerID)
            + "', '"
            + str(newAsset.ownerID)
            + "', '0', NOW())"
        )
        print(addAssetQuery)
        cursor.execute(addAssetQuery)
        assetID = cursor.lastrowid
        print(assetID)

        addTransactionQuery = (
            "INSERT INTO `Transactions` (`token_id`, `seller_id`, `buyer_id`, `sale_price`, `sale_time`) VALUES ('"
            + str(assetID)
            + "', '"
            + str(newAsset.ownerID)
            + "', '"
            + str(newAsset.ownerID)
            + "', '0', NOW())")
        print(addTransactionQuery)
        cursor.execute(addTransactionQuery)

        for categoryID in newAsset.categoryIDs:
            addAssetCategoryQuery = (
                "INSERT INTO AssetCategories ( token_id, category_id) VALUES ('"
                + str(assetID)
                + "', '"
                + str(categoryID)
                + "')"
            )
            cursor.execute(addAssetCategoryQuery)
            print(addAssetCategoryQuery)

        cursor.close()
        connection.commit()
        connection.close()
        return assetID
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# Custom type for a new asset listing


class AssetListingRequest(BaseModel):
    token_id: str
    selling_price: str

# Posts a new asset listing, used by owners of an asset that wish to list their asset for sale.


@app.post("/postassetlisting/")
def postAssetListing(newListing: AssetListingRequest):
    try:
        print(newListing)
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        addListingQuery = (
            "INSERT INTO assetslistedforsale (token_id, selling_price, time_listed) VALUES ('"
            + newListing.token_id
            + "', '"
            + newListing.selling_price
            + "', NOW())"
        )
        print(addListingQuery)
        cursor.execute(addListingQuery)

        cursor.close()
        connection.commit()
        connection.close()
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# Puts an asset listing, used by owners of an asset that wish to update the price of an existing asset listing.


@app.put("/putassetlisting/")
def putAssetListing(updateListing: AssetListingRequest):
    try:
        print(updateListing)
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        updateListingQuery = (
            "UPDATE assetslistedforsale SET selling_price ='"
            + updateListing.selling_price
            + "' WHERE token_id = '"
            + updateListing.token_id
            + "'"
        )
        print(updateListingQuery)
        cursor.execute(updateListingQuery)

        cursor.close()
        connection.commit()
        connection.close()
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

# Deletes an asset listing, used by owners of an asset that wish to remove an existing asset listing.


@app.delete("/deleteassetlisting/{token_id}")
def deleteAssetListing(token_id: str):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        deleteListingQuery = (
            "DELETE FROM assetslistedforsale WHERE token_id = '"
            + token_id
            + "'"
        )
        print(deleteListingQuery)
        cursor.execute(deleteListingQuery)

        cursor.close()
        connection.commit()
        connection.close()
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# ! Everything below here is examples from the tutorials that I have left in case we need them. To be deleted later.


# Week 8 sample code:
@app.get("/deployContract")
async def funcTest1():
    # type your address here
    w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
    # Default is 1337 or with the PORT in your Gaanche
    chain_id = 1337
    # Find in you account
    my_address = "0x153aB956036f09E592C37E70f92EF37FbB8f12D2"
    # Find in you account
    private_key = "0x1229b80388af2cc90f13959a07075b7f4e5535dcebc167d1f6a2b728e1030c03"


    with open("./SimpleStorage.sol", "r") as file:
        simple_storage_file = file.read()
        
    install_solc("0.6.0")
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"SimpleStorage.sol": {"content": simple_storage_file}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.6.0",
    )

    with open("compiled_code.json", "w") as file:
        json.dump(compiled_sol, file)

    # get bytecode
    bytecode = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["evm"][
        "bytecode"
    ]["object"]

    # get abi
    abi = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"]
    print("ABI: " + abi)


    SimpleStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

    nonce = w3.eth.get_transaction_count(my_address)

    transaction = SimpleStorage.constructor().build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "nonce": nonce,
        }
    )
    transaction.pop('to')


    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

    print("Contract address:")
    print(tx_receipt.contractAddress)

    try:
        print(tx_receipt.contractAddress)
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        addContractAddressQuery = (
            "INSERT INTO ContractAddress (contract_address) VALUES ('"
            + tx_receipt.contractAddress
            + "')"
        )
        print(addContractAddressQuery)
        cursor.execute(addContractAddressQuery)

        cursor.close()
        connection.commit()
        connection.close()
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


    print(signed_txn)
    print(tx_hash)
    print(tx_receipt)


    simple_storage = w3.eth.contract(address=tx_receipt.contractAddress, abi=abi)

    store_transaction = simple_storage.functions.store(67).build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "nonce": nonce + 1,
        }
    )

    signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
    send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)

    print(signed_store_txn)
    print(send_store_tx)
    print(tx_receipt)

    
    return "Hello, this is contract deploy preocess"

@app.get("/simpleStorageStore")
async def funcTest1():
    w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))
    chain_id = 1337
    my_address = "0x96De804C980b07dFf64FDE714F56938Aa0C23229"
    private_key = "0x226b32b4bdda1b6150af46e3e8735010b8fa1ce03609d706439558dd4cb21952"

    #get compiled ABI
    with open("compiled_code.json", "r") as file:
        compiled_sol = json.load(file)
        abi = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"]

    #get contract address from database
    contractAddress = ""
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        getContractAddressQuery = (
            "SELECT * FROM ContractAddress LIMIT 1"
        )
        print(getContractAddressQuery)
        cursor.execute(getContractAddressQuery)
        result = cursor.fetchone()
        contractAddress = result[0]

        print(contractAddress)

        cursor.close()
        connection.commit()
        connection.close()
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

    simple_storage = w3.eth.contract(address=contractAddress, abi=abi)
    
    nonce = w3.eth.get_transaction_count(my_address)

    store_transaction = simple_storage.functions.store(67).build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "nonce": nonce,
        }
    )

    signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
    send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(send_store_tx)

    print(signed_store_txn)
    print(send_store_tx)
    print(tx_receipt)

    
    return "Hello, this is contract deploy preocess" 

@app.get("/simpleStorageRetrieve")
async def funcTest1():
    w3 = Web3(Web3.HTTPProvider("HTTP://127.0.0.1:7545"))

    #get compiled ABI
    with open("compiled_code.json", "r") as file:
        compiled_sol = json.load(file)
        abi = compiled_sol["contracts"]["SimpleStorage.sol"]["SimpleStorage"]["abi"]

    #get contract address from database
    contractAddress = ""
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        getContractAddressQuery = (
            "SELECT * FROM ContractAddress LIMIT 1"
        )
        print(getContractAddressQuery)
        cursor.execute(getContractAddressQuery)
        result = cursor.fetchone()
        contractAddress = result[0]

        print(contractAddress)

        cursor.close()
        connection.commit()
        connection.close()
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}

    simple_storage = w3.eth.contract(address=contractAddress, abi=abi)
    
    get_transaction = simple_storage.functions.retrieve().call()

    return get_transaction





@app.get("/eventsample")
async def eventSample():
    assert w3.isConnected()

    # Contract address and ABI
    contract_address = '0xYourContractAddress'
    contract_abi = [...]  # Your contract ABI

    # Create a contract object
    contract = w3.eth.contract(address=contract_address, abi=contract_abi)

    # Define an event filter
    event_filter = contract.events.MyEvent.createFilter(fromBlock='latest')

    # Send a transaction to call a function (if needed)
    tx_hash = contract.functions.myFunction().transact({'from': w3.eth.accounts[0]})
    w3.eth.waitForTransactionReceipt(tx_hash)

    # Retrieve event logs
    event_logs = event_filter.get_new_entries()
    if event_logs:
        event = event_logs[0]
        print("Return Value:", event['args']['returnValue'])


@app.get("/checktxreciept")
async def checkreciept():
    # Send the transaction
    transaction_hash = w3.eth.sendTransaction({'to': '0xB97A1ec41C99caF7656958642e0412D433cd7FB3', 'value': w3.toWei(1, 'ether')})

    # Wait for some time
    time.sleep(15)  # Adjust the waiting time as needed

    # Query the transaction receipt
    receipt = w3.eth.getTransactionReceipt(transaction_hash)

    if receipt is not None:
        if receipt['status'] == 1:
            print("Transaction successful")
        else:
            print("Transaction failed")
    else:
        print("Transaction has not been confirmed yet")

    event_logs = event_filter.get_new_entries()

    for event in event_logs:
        print("New event:", event['args'])




@app.get("/jsonData")
async def funcTest():
    jsonResult = {
        "name": "Your name",
        "Uni-year": 2,
        "isStudent": True,
        "hobbies": ["reading", "swimming"],
    }
    return jsonResult


@app.get("/student/{student_id}")
async def getStudentId(student_id: int):
    return {"student_id": student_id}


class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None


@app.post("/items/", response_model=Item)
def create_item(item: Item):
    return item
