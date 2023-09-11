from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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


class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None


# for section 3


@app.get("/jsonData")
async def funcTest():
    jsonResult = {
        "name": "Your name",
        "Uni-year": 2,
        "isStudent": True,
        "hobbies": ["reading", "swimming"],
    }

    return jsonResult


@app.get("/users/")
def get_users():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all users)
        query = "SELECT * FROM users"

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


@app.get("/all_assets/")
def get_all_assets():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(**db_config)

        # Create a cursor to execute SQL queries
        cursor = connection.cursor()

        # Define the SQL query to retrieve data (e.g., all assets)
        query = "SELECT * FROM assets"

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all the rows
        result = cursor.fetchall()

        # Convert the result to a list of dictionaries
        assets = [dict(zip(cursor.column_names, row)) for row in result]

        # Close the cursor and the database connection
        cursor.close()
        connection.close()

        return assets

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


@app.get("/asset/{token_id}")
def get_assets(token_id: int):
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
        query = "SELECT * FROM assets WHERE token_id =" + str(token_id)
        cursor.execute(query)
        result = cursor.fetchall()
        assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()

        return assets

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


@app.get("/listed_assets/")
def get_listed_assets():
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # NOTE THIS DOES NOT WORK
        query = "SELECT * FROM assets INNER JOIN assetslistedforsale ON assets.token_id=assetslistedforsale.token_id INNER JOIN Transactions ON assets.token_id=(SELECT Transactions.token_id FROM Transactions WHERE Transactions.token_id=assets.token_id ORDER BY transaction_id DESC LIMIT 1)"

        cursor.execute(query)
        result = cursor.fetchall()

        print(result)

        assets = [dict(zip(cursor.column_names, row)) for row in result]
        cursor.close()
        connection.close()

        return assets

    except mysql.connector.Error as err:
        return {"error": f"Error: {err}"}


@app.get("/")
async def funcTest1():
    return "Hello, this is fastAPI data"


@app.get("/getAboutData")
async def funcTest2():
    return "Hello, this is about us data"


@app.get("/getHomeData")
async def funcTest3():
    return "Hello, this is home data"


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


@app.post("/items/", response_model=Item)
def create_item(item: Item):
    return item
