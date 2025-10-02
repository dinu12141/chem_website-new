import pymongo
import sys
from pymongo.errors import ConnectionFailure

def check_mongodb():
    try:
        # Try to connect to MongoDB
        client = pymongo.MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=5000)
        # Try to ping the server
        client.admin.command('ping')
        print("✅ MongoDB is running and accessible!")
        print(f"MongoDB version: {client.server_info()['version']}")
        client.close()
        return True
    except ConnectionFailure:
        print("❌ MongoDB is not accessible!")
        print("Please make sure MongoDB is installed and running.")
        print("\nTo install MongoDB:")
        print("1. Visit: https://www.mongodb.com/try/download/community")
        print("2. Download and install MongoDB Community Server")
        print("3. Start the MongoDB service")
        return False
    except Exception as e:
        print(f"❌ Error connecting to MongoDB: {e}")
        return False

if __name__ == "__main__":
    print("Checking MongoDB connection...")
    success = check_mongodb()
    if not success:
        sys.exit(1)