#!/usr/bin/env python3
"""
Script to test admin login credentials
"""

import requests
import json
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configuration
BACKEND_URL = os.environ.get('BACKEND_URL', 'http://localhost:8000')
API_URL = f"{BACKEND_URL}/api"

def test_admin_login():
    """Test admin login with default credentials"""
    # Default admin credentials
    admin_credentials = {
        "username": os.environ.get('ADMIN_USERNAME', 'admin'),
        "password": os.environ.get('ADMIN_PASSWORD', 'smartchem2025')
    }
    
    print(f"Testing admin login at {API_URL}/auth/admin/login")
    print(f"Using credentials: {admin_credentials}")
    
    try:
        # Test login
        response = requests.post(
            f"{API_URL}/auth/admin/login",
            json=admin_credentials,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print("Login successful!")
            print(f"Access Token: {data.get('access_token', 'N/A')}")
            print(f"Admin Username: {data.get('admin', {}).get('username', 'N/A')}")
            print(f"Admin Email: {data.get('admin', {}).get('email', 'N/A')}")
            return True
        else:
            print(f"Login failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"Error during login test: {e}")
        return False

if __name__ == "__main__":
    print("=== SMARTCHEM Admin Login Test ===")
    success = test_admin_login()
    if success:
        print("\n✅ Admin login test passed!")
    else:
        print("\n❌ Admin login test failed!")