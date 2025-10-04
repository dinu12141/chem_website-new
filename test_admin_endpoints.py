#!/usr/bin/env python3
"""
Test script to verify admin management endpoints
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

def test_admin_endpoints():
    """Test admin management endpoints"""
    print("=== Testing Admin Management Endpoints ===")
    
    # First, login as admin to get a token
    print("\n1. Logging in as admin...")
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
        
        if login_response.status_code != 200:
            print(f"   Login failed: {login_response.text}")
            return False
            
        login_data = login_response.json()
        access_token = login_data.get('access_token')
        print(f"   Login successful!")
        
        # Test get all admins endpoint
        print("\n2. Testing get all admins endpoint...")
        admins_response = requests.get(
            f"{API_URL}/admin/admins",
            headers={'Authorization': f'Bearer {access_token}'}
        )
        
        print(f"   Get admins status code: {admins_response.status_code}")
        
        if admins_response.status_code == 200:
            admins_data = admins_response.json()
            print(f"   Found {len(admins_data)} admins")
            for admin in admins_data:
                print(f"     - {admin.get('username')} ({admin.get('email')})")
        else:
            print(f"   Failed to get admins: {admins_response.text}")
            
        print("\n✅ Admin management endpoints test completed!")
        return True
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        return False

if __name__ == "__main__":
    test_admin_endpoints()