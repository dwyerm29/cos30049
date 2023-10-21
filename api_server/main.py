from fastapi import FastAPI, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, Union
from web3 import Web3
from solcx import compile_standard, install_solc

# db_config stores the database configuration in a separate file that is added to the gitignore so each developer has their own copy. See README.txt for example file.
from db_config import db_config

# blockchain_config is also in the gitignore and is used for storing a user's Ganache wallet keys. See README.txt for example file.
from blockchain_config import blockchain_config

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
        query = "SELECT user_id, first_name, last_name, email FROM Users;"
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

#used by all functions that make use of a smart contract to retrieve the contract's ABI    
def get_abi():
    with open("transaction_storage_compiled.json", "r") as file:
        compiled_sol = json.load(file)
        abi = compiled_sol["contracts"]["TransactionStorage.sol"]["TransactionStorage"]["abi"]
    return abi

#used by all functions that make use of a smart contract to retrieve the contract's address (requires the contract to be deployed first)    
def get_smart_contract_address():
    contractAddress = ""
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        getContractAddressQuery = (
            "SELECT contract_address FROM SmartContractAddresses WHERE contract_name='TransactionStorage'"
        )
        cursor.execute(getContractAddressQuery)
        result = cursor.fetchone()
        contractAddress = result[0]

        print(contractAddress)

        cursor.close()
        connection.commit()
        connection.close()
        return contractAddress
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# get information for a single asset, along with details like selling price if it exists
@app.get("/asset/{token_id}/")
def get_assets(token_id: int):
    #First This get most of the asset's details such as license type, image URL, FileType, etc. from the MYSQL Database
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = ("SELECT assets.token_id, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name, orig_owner.first_name AS original_owner_first_name, orig_owner.last_name AS original_owner_last_name, orig_owner.user_id AS original_owner_user_id FROM assets LEFT JOIN AssetListings ON assets.token_id=AssetListings.token_id JOIN filetypes ON assets.image_filetype_id=filetypes.filetype_id JOIN licensetypes ON assets.license_type_id=licensetypes.license_type_id JOIN users orig_owner ON assets.original_owner=orig_owner.user_id WHERE assets.token_id="
        + str(token_id))
        cursor.execute(query)
        result = cursor.fetchone()
        asset = dict(zip(cursor.column_names, result))
        cursor.close()
        connection.close()

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    
    #Next, add other information such as token name, owner name, etc. from the TransactionStorage smart contract
    #get compiled ABI
    contract_abi = get_abi()

    #get contract address from database
    contractAddress = get_smart_contract_address()

    transaction_storage = w3.eth.contract(address=contractAddress, abi=contract_abi)
    get_transaction = transaction_storage.functions.tokenIdToLatestTransaction(token_id).call()

    #add the relevant fields from the smart contract to the asset
    asset["item_name"] = get_transaction[8]
    asset["owner_name"] = get_transaction[6]
    asset["owner_id"] = get_transaction[3]
    asset["owner_email"] = get_transaction[7]
    asset["sale_price"] = get_transaction[5]
    asset["sale_time"] = get_transaction[4]

    return asset

# get a list of all Assets listed for sale along with other info
@app.get("/listed_assets/")
def get_listed_assets():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM assets JOIN AssetListings ON assets.token_id=AssetListings.token_id JOIN FileTypes on assets.image_filetype_id=FileTypes.filetype_id JOIN LicenseTypes on assets.license_type_id=LicenseTypes.license_type_id"
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
        query = "SELECT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM assets JOIN AssetListings ON assets.token_id = AssetListings.token_id JOIN FileTypes ON assets.image_filetype_id = FileTypes.filetype_id JOIN LicenseTypes ON assets.license_type_id = LicenseTypes.license_type_id JOIN AssetCategories ON assets.token_id = AssetCategories.token_id JOIN AssetCategoryDescriptions ON AssetCategories.category_id=AssetCategoryDescriptions.category_id WHERE AssetCategoryDescriptions.category_name = 'Featured'"
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
async def search_assets(
    query: Union[str, None] = None, category: Annotated[Union[list[str], None], Query()] = None
):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        dbQuery = "SELECT DISTINCT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM assets JOIN AssetListings ON assets.token_id=AssetListings.token_id JOIN FileTypes ON assets.image_filetype_id=FileTypes.filetype_id JOIN LicenseTypes ON assets.license_type_id=LicenseTypes.license_type_id JOIN AssetCategories ON assets.token_id=AssetCategories.token_id JOIN AssetCategoryDescriptions ON AssetCategories.category_id=AssetCategoryDescriptions.category_id"
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

# return a list of Assets that a particular user has for sale
@app.get("/user/{user_id}/listed_assets/")
def get_listed_assets(user_id: int):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = (
            "SELECT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM assets JOIN AssetListings ON assets.token_id = AssetListings.token_id JOIN FileTypes ON assets.image_filetype_id = FileTypes.filetype_id JOIN LicenseTypes ON assets.license_type_id = LicenseTypes.license_type_id WHERE AssetListings.seller_id='"
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
            "SELECT user_id, first_name, last_name, email FROM Users WHERE email='"
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
    
class NewUser(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str


# post new user, used for registering new users
@app.post("/post_new_user/")
def post_new_user(newUser: NewUser):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = (
            "INSERT INTO Users (password, first_name, last_name, email) VALUES ('"
            + newUser.password
            + "', '"
            + newUser.first_name
            + "', '"
            + newUser.last_name
            + "', '"
            + newUser.email
            + "')"
        )
        print(query)
        cursor.execute(query)
        result = cursor.fetchall()
        print(result)
        user = dict(zip(cursor.column_names, result))
        cursor.close()
        connection.commit()
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
    ownerName: str
    ownerEmail: str
    categoryIDs: set[int]

# Posts a new asset to the Assets table, along with a creation transaction (price: 0, both buyer and seller ID that of the uploader), and associated asset categories/
@app.post("/post_new_asset/")
def post_new_asset(newAsset: CreateAssetRequest):
    try:
        print(newAsset)
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        addAssetQuery = (
            "INSERT INTO assets (item_name, item_description, image_url, image_thumbnail_url, image_resolution, image_filetype_id, license_type_id, original_owner) VALUES ('"
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
            + "')"
        )
        print(addAssetQuery)
        cursor.execute(addAssetQuery)
        token_id = cursor.lastrowid
        print(token_id)

        for categoryID in newAsset.categoryIDs:
            addAssetCategoryQuery = (
                "INSERT INTO AssetCategories ( token_id, category_id) VALUES ('"
                + str(token_id)
                + "', '"
                + str(categoryID)
                + "')"
            )
            cursor.execute(addAssetCategoryQuery)
            print(addAssetCategoryQuery)

        cursor.close()
        #without these line, the inserts are never written to the database
        connection.commit()
        connection.close()

    
        chain_id = 1337
        # gets the account address from your blockchain_config file
        my_address = str(blockchain_config.get("account_address"))
        print("my_address = " + my_address)
        # # gets your account private key from your blockchain_config file
        private_key = str(blockchain_config.get("account_private_key"))
        print("private_key= " + private_key)

        #get compiled ABI
        contract_abi = get_abi()

        #get contract address from database
        contractAddress = get_smart_contract_address()

        #setup and execute add transaction function on the smart contract
        transaction_storage = w3.eth.contract(address=contractAddress, abi=contract_abi)
        nonce = w3.eth.get_transaction_count(my_address)
        store_transaction = transaction_storage.functions.addTransaction(token_id, newAsset.ownerID, newAsset.ownerID, int(round(time.time() * 1000)), "0", newAsset.ownerName, newAsset.ownerEmail, newAsset.name).build_transaction(
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

        print(w3.to_json(tx_receipt))
    
        return token_id
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}
    

# Custom type for a new asset listing
class AssetListingRequest(BaseModel):
    token_id: str
    selling_price: str
    seller_id: int

# Posts a new asset listing, used by owners of an asset that wish to list their asset for sale.
@app.post("/post_asset_listing/")
def post_asset_listing(newListing: AssetListingRequest):
    try:
        print(newListing)
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        addListingQuery = (
            "INSERT INTO AssetListings (token_id, seller_id, selling_price, time_listed) VALUES ('"
            + newListing.token_id
            + "', '"
            + str(newListing.seller_id)
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
@app.put("/put_asset_listing/")
def put_asset_listing(updateListing: AssetListingRequest):
    try:
        print(updateListing)
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        updateListingQuery = (
            "UPDATE AssetListings SET selling_price ='"
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
@app.delete("/delete_asset_listing/{token_id}")
def delete_asset_listing(token_id: str):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        deleteListingQuery = (
            "DELETE FROM AssetListings WHERE token_id = '"
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

# Deploys the TransactionStorage.sol smart contract, writes the ABI to a file, and saves the smart contract address to the database for future interaction with the smart contract.
@app.get("/transaction_storage_deploy_contract")
async def transaction_storage_deploy_contract():
    # Default is 1337 or with the PORT in your Gaanche
    chain_id = 1337
    # gets the account address from your blockchain_config file
    my_address = str(blockchain_config.get("account_address"))
    print("my_address = " + my_address)
    # # gets your account private key from your blockchain_config file
    private_key = str(blockchain_config.get("account_private_key"))
    print("private_key= " + private_key)


    with open("./TransactionStorage.sol", "r") as file:
        simple_storage_file = file.read()
        
    install_solc("0.8.18")
    compiled_sol = compile_standard(
        {
            "language": "Solidity",
            "sources": {"TransactionStorage.sol": {"content": simple_storage_file}},
            "settings": {
                "outputSelection": {
                    "*": {"*": ["abi", "metadata", "evm.bytecode", "evm.sourceMap"]}
                }
            },
        },
        solc_version="0.8.18",
    )

    with open("transaction_storage_compiled.json", "w") as file:
        json.dump(compiled_sol, file)

    # get bytecode
    bytecode = compiled_sol["contracts"]["TransactionStorage.sol"]["TransactionStorage"]["evm"][
        "bytecode"
    ]["object"]

    # get abi
    abi = compiled_sol["contracts"]["TransactionStorage.sol"]["TransactionStorage"]["abi"]

    TransactionStorage = w3.eth.contract(abi=abi, bytecode=bytecode)

    nonce = w3.eth.get_transaction_count(my_address)

    transaction = TransactionStorage.constructor().build_transaction(
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
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        addContractAddressQuery = (
            "REPLACE INTO SmartContractAddresses (contract_name, contract_address) VALUES ('TransactionStorage', '"
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

    return "Contract Address: " + tx_receipt.contractAddress


#Used to populate the transaction history after a new smart contract has been deployed to the blockchain
@app.get("/transaction_storage_populate_transactions")
async def transaction_storage_populate_transactions():
    chain_id = 1337
    # gets the account address from your blockchain_config file
    my_address = str(blockchain_config.get("account_address"))
    print("my_address = " + my_address)
    # # gets your account private key from your blockchain_config file
    private_key = str(blockchain_config.get("account_private_key"))
    print("private_key= " + private_key)

    #get compiled ABI
    contract_abi = get_abi()

    #get contract address from database
    contractAddress = get_smart_contract_address()

    transaction_storage = w3.eth.contract(address=contractAddress, abi=contract_abi)
    
    initTransactions = [[123129, 5, 5, 1696943037000, '0', 'Ryutaro Tsukata', 'Ryutaro.Tsukata@example.com', 'Moon Jellyfish'],
                        [123130, 3, 3, 1696943037000, '0', 'Maria Eduarda Loura Magalhães', 'maria.magalhaes@example.com', 'Neon Woman'],
                        [123131, 6, 6, 1696943037000, '0', 'Twiggy Jia', 'Twiggy.Jia@example.com', 'Purple Jellyfish'],
                        [123132, 7, 7, 1696943037000, '0', 'Alexander Ant', 'Alexander.Ant@example.com', 'Paint Swirl'],
                        [123133, 8, 8, 1696943037000, '0', 'Anni Roenkae', 'AnniRoenkae@example.com', 'Pink & Black'],
                        [123134, 9, 9, 1696943037000, '0', 'Dids', 'Dids@example.com', 'Abstract Pink'],
                        [123135, 10, 10, 1696943037000, '0', 'Damir Mijailovic', 'Damir.Mijailovic@example.com', 'Bright Abstract'],
                        [123136, 11, 11, 1696943037000, '0', 'Marlene Leppänen', 'Marlene.Leppänen@example.com', 'Faceless'],
                        [124343, 4, 4, 1696943037000, '0', 'ThisIsEngineering', 'thisisengineering@example.com', 'Cyber Girl'],
                        [2373453, 12, 12, 1696943037000, '0', 'Ishara Kasthuriarachchi', 'Ishara.Kasthuriarachchi@example.com', 'Random Ape'],
                        [2623426, 13, 13, 1696943037000, '0', 'Anthony', 'Anthony@example.com', 'Yellow Rose'],
                        [3032346, 14, 14, 1696943037000, '0', 'Julia Sakelli', 'Julia.Sakelli@example.com', 'Succulent'],
                        [23734536, 15, 15, 1696943037000, '0', 'Pixabay', 'Pixabay@example.com', 'White Rose'],
                        [123129, 5, 2, 1697634237000, '0.31', 'Jane Smith', 'jane.smith@example.com', 'Moon Jellyfish'],
                        [123130, 3, 1, 1697634237000, '0.4', 'John Smith', 'john.smith@example.com', 'Neon Woman'],
                        [123131, 6, 2, 1697634237000, '0.64', 'Jane Smith', 'jane.smith@example.com', 'Purple Jellyfish'],
                        [123132, 7, 2, 1697634237000, '0.22', 'Jane Smith', 'jane.smith@example.com', 'Paint Swirl'],
                        [123133, 8, 2, 1697634237000, '0.67', 'Jane Smith', 'jane.smith@example.com', 'Pink & Black'],
                        [123134, 9, 2, 1697634237000, '0.94', 'Jane Smith', 'jane.smith@example.com', 'Abstract Pink'],
                        [123135, 10, 2, 1697634237000, '0.15', 'Jane Smith', 'jane.smith@example.com', 'Bright Abstract'],
                        [123136, 11, 2, 1697634237000, '0.55', 'Jane Smith', 'jane.smith@example.com', 'Faceless'],
                        [2373453, 12, 1, 1697634237000, '0.5', 'John Smith', 'john.smith@example.com', 'Random Ape'],
                        [2623426, 13, 1, 1697634237000, '0.34', 'John Smith', 'john.smith@example.com', 'Yellow Rose'],
                        [3032346, 14, 1, 1697634237000, '0.25', 'John Smith', 'john.smith@example.com', 'Succulent'],
                        [23734536, 15, 4, 1697634237000, '0.64', 'ThisIsEngineering', 'thisisengineering@example.com', 'White Rose'],
                        [2373453, 1, 4, 1697720637000, '0.43', 'ThisIsEngineering', 'thisisengineering@example.com', 'Random Ape']]

    receipts = ""

    for transaction in initTransactions:
        nonce = w3.eth.get_transaction_count(my_address)    
        store_transaction = transaction_storage.functions.addTransaction(transaction[0], transaction[1], transaction[2], transaction[3], transaction[4], transaction[5], transaction[6], transaction[7]).build_transaction(
            {
                "chainId": chain_id,
                "gasPrice": w3.eth.gas_price,
                "from": my_address,
                "nonce": nonce,
            }
        )
        signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
        send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
        receipt= w3.to_json(w3.eth.wait_for_transaction_receipt(send_store_tx))
        print(receipt)
        receipts += receipt
    
    return receipts

# Gets a list of all transactions from the smart contract. This function is not used by the web app (it could be useful for further expansion), but has been used extensively for debugging purposes.
@app.get("/transaction_storage_get_all_transactions")
async def transaction_storage_get_all_transactions():
    #get compiled ABI
    contract_abi = get_abi()

    #get contract address from database
    contractAddress = get_smart_contract_address()

    transaction_storage = w3.eth.contract(address=contractAddress, abi=contract_abi)
    
    get_transaction = transaction_storage.functions.getAllTransactions().call()

    return get_transaction

# Gets a list of all transactions that a particular user has ever been involved in.
@app.get("/transaction_storage_get_all_transactions_for_user/{user_id}")
async def transaction_storage_get_all_transactions_for_user(user_id: int):
    #get compiled ABI
    contract_abi = get_abi()

    #get contract address from database
    contractAddress = get_smart_contract_address()

    transaction_storage = w3.eth.contract(address=contractAddress, abi=contract_abi)
    get_transaction = transaction_storage.functions.getAllTransactionsForUser(user_id).call()

    return get_transaction

# Gets a list of all assets that a given user currently owns.
@app.get("/transaction_storage_get_all_owned_assets_for_user/{user_id}")
async def transaction_storage_get_all_owned_assets_for_user(user_id: int):
    #get compiled ABI
    contract_abi = get_abi()

    #get contract address from database
    contractAddress = get_smart_contract_address()

    transaction_storage = w3.eth.contract(address=contractAddress, abi=contract_abi)
    get_transaction = transaction_storage.functions.getAllOwnedAssetsForUser(user_id).call()

    return get_transaction
class Transaction(BaseModel):
    token_id: int
    seller_id: int
    buyer_id: int
    sale_price: str
    owner_name: str
    owner_email: str
    token_name: str

#Used to add multiple transactions to the smart contract when checking out
@app.post("/transaction_storage_add_multiple_transactions")
async def transaction_storage_add_multiple_transactions(transactions: list[Transaction]):

    chain_id = 1337
    # gets the account address from your blockchain_config file
    my_address = str(blockchain_config.get("account_address"))
    print("my_address = " + my_address)
    # # gets your account private key from your blockchain_config file
    private_key = str(blockchain_config.get("account_private_key"))
    print("private_key= " + private_key)

    #get compiled ABI
    contract_abi = get_abi()

    #get contract address from database
    contractAddress = get_smart_contract_address()

    arrayedTransactions = []

    for transaction in transactions:
        if(transaction.seller_id != transaction.buyer_id):
            arrayedTransactions.append([transaction.token_id, transaction.seller_id, transaction.buyer_id, int(round(time.time() * 1000)), transaction.sale_price, transaction.owner_name, transaction.owner_email, transaction.token_name])

    print(arrayedTransactions)

    transaction_storage = w3.eth.contract(address=contractAddress, abi=contract_abi)

    # Define an event filter
    event_filter = transaction_storage.events.CompletedTransactions.create_filter(fromBlock='latest')

    nonce = w3.eth.get_transaction_count(my_address)  

    store_transaction = transaction_storage.functions.addMultipleTransactions(arrayedTransactions).build_transaction(
        {
            "chainId": chain_id,
            "gasPrice": w3.eth.gas_price,
            "from": my_address,
            "nonce": nonce,
        }
    )

    signed_store_txn = w3.eth.account.sign_transaction(store_transaction, private_key=private_key)
    send_store_tx = w3.eth.send_raw_transaction(signed_store_txn.rawTransaction)
    tx_receiptA = w3.eth.wait_for_transaction_receipt(send_store_tx)

    print(w3.to_json(tx_receiptA))

    # Retrieve event logs
    event_logs = event_filter.get_new_entries()
    event = ""
    if event_logs:
        event = event_logs[0]

    #remove item listings after making transactions
    for transaction in transactions:
        delete_asset_listing(str(transaction.token_id))

    return {
        "Receipt": str(w3.to_json(tx_receiptA)),
        "AddedTransactions": event['args']['completedTransactions']
    }