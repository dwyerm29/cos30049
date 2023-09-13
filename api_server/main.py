from fastapi import FastAPI, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

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


# return a list of users without their passwords
@app.get("/users/")
def get_users():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)
        # Create a cursor to execute SQL queries
        cursor = connection.cursor()
        # Define the SQL query to retrieve data (e.g., all users)
        query = "SELECT user_id, first_name, last_name, email, wallet_id FROM users;"
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


# get a list of all assets. Optionally you may provide a list of categories to the query to match the assets using the following format: http://localhost:8000/assets/?category=1&category=2
@app.get("/assets/")
async def read_items(category: Annotated[list[int] | None, Query()] = None):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT DISTINCT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM assets LEFT JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id JOIN filetypes ON assets.image_filetype_id=filetypes.filetype_id JOIN licensetypes ON assets.license_type_id=licensetypes.license_type_id JOIN assetcategories ON assets.token_id=assetcategories.token_id"
        if category != None:
            if len(category) > 0:
                query += " WHERE assetcategories.category_id='" + str(category[0]) + "'"
            if len(category) > 1:
                for i in range(1, len(category)):
                    query += (
                        " OR assetcategories.category_id='" + str(category[i]) + "'"
                    )
        cursor.execute(query)
        result = cursor.fetchall()
        assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# get information for a single asset, along with details like selling price if it exists
@app.get("/asset/{token_id}")
def get_assets(token_id: int):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = (
            "SELECT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM assets LEFT JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id JOIN filetypes on assets.image_filetype_id=filetypes.filetype_id JOIN licensetypes on assets.license_type_id=licensetypes.license_type_id WHERE assets.token_id ="
            + str(token_id)
        )
        cursor.execute(query)
        result = cursor.fetchall()
        assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# get a list of all assets listed for sale along with other info
@app.get("/listed_assets/")
def get_listed_assets():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT assets.token_id, item_name, item_description, image_url, image_thumbnail_url, image_resolution, selling_price, time_listed, filetype_name, license_name FROM assets JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id JOIN filetypes on assets.image_filetype_id=filetypes.filetype_id JOIN licensetypes on assets.license_type_id=licensetypes.license_type_id"
        cursor.execute(query)
        result = cursor.fetchall()
        print(result)
        assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return assets
    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


# return a list of transactions that a particular user has been involved in
@app.get("/user_transactions/")
def get_user_transactions():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM transactions WHERE seller_id = '1' OR buyer_id = '1'"
        cursor.execute(query)
        result = cursor.fetchall()
        assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return assets
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
        assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()
        return assets
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
            "SELECT user_id, first_name, last_name, email, wallet_id FROM users WHERE email='"
            + login.email
            + "' AND password='"
            + login.password
            + "'"
        )
        print(query)
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
