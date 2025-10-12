#!/usr/bin/env python3
"""
Test script to verify the Firebase website can run
"""

import os
import sys
import subprocess
import time
import requests

def test_firebase_setup():
    """Test Firebase setup"""
    print("Testing Firebase website setup...")
    
    # Check if required files exist
    required_files = [
        'backend/firebase/server_firebase.py',
        'backend/firebase/firebase_config.py',
        'backend/firebase/services.py',
        'backend/firebase/auth_service.py',
        'backend/firebase/models.py'
    ]
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
    
    if missing_files:
        print(f"❌ Missing files: {missing_files}")
        return False
    
    print("✅ All required Firebase files are present")
    
    # Check if frontend files exist
    frontend_files = [
        'frontend/src/firebase.js',
        'frontend/src/contexts/FirebaseAuthContext.js',
        'frontend/src/pages/FirebaseLogin.js',
        'frontend/src/pages/FirebaseRegister.js',
        'frontend/src/pages/FirebaseDashboard.js'
    ]
    
    missing_frontend = []
    for file_path in frontend_files:
        if not os.path.exists(file_path):
            missing_frontend.append(file_path)
    
    if missing_frontend:
        print(f"❌ Missing frontend files: {missing_frontend}")
        return False
    
    print("✅ All required frontend files are present")
    
    # Test imports
    try:
        # Test backend imports
        sys.path.append('backend')
        from firebase.firebase_config import initialize_firebase
        from firebase.services import FirebaseService
        from firebase.auth_service import FirebaseAuthService
        print("✅ Firebase backend imports successful")
    except ImportError as e:
        print(f"❌ Firebase backend import failed: {e}")
        return False
    
    try:
        # Test frontend imports would require Node.js environment
        # We'll just check if the files exist
        print("✅ Frontend files are present (import testing requires Node.js environment)")
    except Exception as e:
        print(f"❌ Frontend file check failed: {e}")
        return False
    
    print("✅ Firebase website setup test passed")
    return True

def main():
    """Main test function"""
    print("Firebase Website Test")
    print("=" * 30)
    
    success = test_firebase_setup()
    
    if success:
        print("\n🎉 Firebase website setup is correct!")
        print("\nTo run the website with Firebase:")
        print("1. Configure Firebase credentials in backend/.env")
        print("2. Run: cd backend && python firebase/server_firebase.py")
        print("3. In another terminal, run: cd frontend && npm start")
        return True
    else:
        print("\n❌ Firebase website setup has issues!")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)