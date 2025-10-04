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
    
    if response.status_code == 200:
        token = response.json()["access_token"]
        print(f"Token: {token}")
        
        # Get admins list to find the test admin
        admins_url = "http://localhost:8000/api/auth/admin/admins"
        headers = {"Authorization": f"Bearer {token}"}
        
        admins_response = requests.get(admins_url, headers=headers)
        admins = admins_response.json()
        
        # Find the test admin we created
        test_admin = None
        for admin in admins:
            if admin["username"] == "testadmin":
                test_admin = admin
                break
                
        if test_admin:
            print(f"Found test admin: {test_admin['username']}")
            
            # Test deleting the admin
            delete_url = f"http://localhost:8000/api/auth/admin/admins/{test_admin['id']}"
            delete_response = requests.delete(delete_url, headers=headers)
            print(f"Delete Admin Status Code: {delete_response.status_code}")
            print(f"Delete Admin Response: {delete_response.json()}")
        else:
            print("Test admin not found")
    else:
        print("Login failed")
        
except Exception as e:
    print(f"Error: {e}")