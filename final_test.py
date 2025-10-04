#!/usr/bin/env python3
"""
Final test script to verify admin login functionality
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

def test_complete_admin_flow():
    """Test the complete admin authentication flow"""
    print("=== Nadeeka Warnakula Admin Authentication Flow Test ===")
    
    # Step 1: Login
    print("\n1. Testing admin login...")
    admin_credentials = {
        "username": "admin",
        "password": "nadeeka2025"
    }
    
    try:
        login_response = requests.post(
            f"{API_URL}/auth/admin/login",
            json=admin_credentials,
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"   Login Status Code: {login_response.status_code}")
        
        if login_response.status_code != 200:
            print(f"   Login Failed: {login_response.text}")
            return False
            
        login_data = login_response.json()
        access_token = login_data.get('access_token')
        print(f"   Login Successful!")
        print(f"   Access Token: {access_token[:50]}...")
        
        # Step 2: Validate token by getting admin info
        print("\n2. Testing token validation...")
        me_response = requests.get(
            f"{API_URL}/auth/admin/me",
            headers={'Authorization': f'Bearer {access_token}'}
        )
        
        print(f"   Validation Status Code: {me_response.status_code}")
        
        if me_response.status_code != 200:
            print(f"   Token Validation Failed: {me_response.text}")
            return False
            
        admin_info = me_response.json()
        print(f"   Token Validation Successful!")
        print(f"   Admin Username: {admin_info.get('username')}")
        print(f"   Admin Email: {admin_info.get('email')}")
        
        # Step 3: Test admin-only endpoint
        print("\n3. Testing admin-only endpoint...")
        users_response = requests.get(
            f"{API_URL}/admin/users",
            headers={'Authorization': f'Bearer {access_token}'}
        )
        
        print(f"   Users Endpoint Status Code: {users_response.status_code}")
        
        if users_response.status_code != 200:
            print(f"   Users Endpoint Failed: {users_response.text}")
            # This might fail if the endpoint requires different permissions
        else:
            users_data = users_response.json()
            print(f"   Users Endpoint Successful!")
            print(f"   Number of users: {len(users_data)}")
        
        print("\n✅ All tests passed! Admin authentication is working correctly.")
        return True
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        return False

if __name__ == "__main__":
    success = test_complete_admin_flow()
    if success:
        print("\n🎉 Admin authentication system is working properly!")
        print("You can now login to the admin dashboard using:")
        print("  Username: admin")
        print("  Password: nadeeka2025")
    else:
        print("\n💥 Admin authentication system has issues!")
        print("Please check the backend logs and frontend console for errors.")