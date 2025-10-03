#!/usr/bin/env python3
"""
Script to create an initial admin user in the database
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from dotenv import load_dotenv
import sys
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Database connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'smartchem')

async def create_admin_user():
    """Create an initial admin user"""
    # Get admin credentials from environment or use defaults
    admin_username = os.environ.get('ADMIN_USERNAME', 'admin')
    admin_email = os.environ.get('ADMIN_EMAIL', 'admin@smartchem.lk')
    admin_password = os.environ.get('ADMIN_PASSWORD', 'smartchem2025')
    
    # Connect to database
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Check if admin already exists
        existing_admin = await db.admins.find_one({"username": admin_username})
        if existing_admin:
            print(f"Admin user '{admin_username}' already exists")
            return
        
        # Create admin user
        admin = {
            "username": admin_username,
            "email": admin_email,
            "password_hash": pwd_context.hash(admin_password),
            "is_active": True
        }
        
        result = await db.admins.insert_one(admin)
        if result.inserted_id:
            print(f"Admin user '{admin_username}' created successfully")
            print(f"Username: {admin_username}")
            print(f"Password: {admin_password}")
            print("Please change the password after first login!")
        else:
            print("Failed to create admin user")
            
    except Exception as e:
        print(f"Error creating admin user: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(create_admin_user())