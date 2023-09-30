from fastapi import FastAPI, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated, Union

# CHECK README IF YOU GET AN ERROR HERE
from db_config import db_config

# DB
import mysql.connector

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
        Assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return Assets
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


# ! Everything below here is examples from the tutorials that I have left in case we need them. To be deleted later.
@app.get("/")
async def funcTest1():
    return "Hello, this is fastAPI data"


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
