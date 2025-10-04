#!/usr/bin/env python3
"""
Script to check if admin user exists in the database
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import sys
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'nadeeka_warnakula')

async def check_admin_user():
    """Check if admin user exists"""
    # Connect to database
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Check if admin collection exists
        collections = await db.list_collection_names()
        print(f"Available collections: {collections}")
        
        if 'admins' not in collections:
            print("Admins collection does not exist")
            return
        
        # Check if any admin exists
        admin_count = await db.admins.count_documents({})
        print(f"Number of admins in database: {admin_count}")
        
        # Get the first admin user
        admin = await db.admins.find_one({})
        if admin:
            print("Admin user found:")
            print(f"  ID: {admin.get('id', 'N/A')}")
            print(f"  Username: {admin.get('username', 'N/A')}")
            print(f"  Email: {admin.get('email', 'N/A')}")
            print(f"  Created at: {admin.get('created_at', 'N/A')}")
            print(f"  Is active: {admin.get('is_active', 'N/A')}")
        else:
            print("No admin user found")
            
    except Exception as e:
        print(f"Error checking admin user: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(check_admin_user())