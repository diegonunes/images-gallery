import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)

mongo_client = MongoClient(
    host=MONGO_URL, username=MONGO_USERNAME, password=MONGO_PASSWORD, port=MONGO_PORT
)


def insert_test_document():
    """Inserts sample document to the test_collection in the test db"""
    db = mongo_client.test
    test_collection = db.test_collection
    res = test_collection.insert_one({"name": "Diego", "instructor": False})
    print(res)
