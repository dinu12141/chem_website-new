import requests
import json

# Test admin login
login_url = "http://localhost:8000/api/auth/admin/login"
login_data = {
    "username": "admin",
    "password": "nadeeka2025"
}

try:
    response = requests.post(login_url, json=login_data)
    print(f"Login Status Code: {response.status_code}")
    print(f"Login Response: {response.json()}")
    
    if response.status_code == 200:
        token = response.json()["access_token"]
        print(f"Token: {token}")
        
        # Test getting admins list
        admins_url = "http://localhost:8000/api/auth/admin/admins"
        headers = {"Authorization": f"Bearer {token}"}
        
        admins_response = requests.get(admins_url, headers=headers)
        print(f"Admins List Status Code: {admins_response.status_code}")
        print(f"Admins List Response: {admins_response.json()}")
        
        # Test creating a new admin
        create_admin_url = "http://localhost:8000/api/auth/admin/register"
        new_admin_data = {
            "username": "testadmin",
            "email": "testadmin@nadeeka-warnakula.lk",
            "password": "testpassword123"
        }
        
        create_response = requests.post(create_admin_url, json=new_admin_data, headers=headers)
        print(f"Create Admin Status Code: {create_response.status_code}")
        print(f"Create Admin Response: {create_response.json()}")
        
    else:
        print("Login failed")
        
except Exception as e:
    print(f"Error: {e}")