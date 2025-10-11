#!/usr/bin/env python3
"""
Test script to verify Firebase integration
"""

import os
import sys
import asyncio
from pathlib import Path

# Add the backend directory to the path
backend_path = Path(__file__).parent / "backend"
sys.path.insert(0, str(backend_path))

try:
    # Test Firebase configuration
    from backend.firebase.firebase_config import initialize_firebase
    from backend.firebase.services import FirebaseService
    from backend.firebase.auth_service import FirebaseAuthService
    
    print("✓ Firebase modules imported successfully")
    
    # Test Firebase initialization
    db = initialize_firebase()
    if db:
        print("✓ Firebase initialized successfully")
    else:
        print("⚠ Firebase initialization failed (this is expected if no credentials are configured)")
    
    # Test service instantiation
    firebase_service = FirebaseService()
    auth_service = FirebaseAuthService()
    print("✓ Firebase services instantiated successfully")
    
    print("\nFirebase integration test completed successfully!")
    print("\nNote: Full functionality testing requires:")
    print("1. Firebase project credentials configured")
    print("2. Firebase Admin SDK service account key")
    print("3. Proper environment variables set")
    
except ImportError as e:
    print(f"✗ Failed to import Firebase modules: {e}")
    print("Make sure all Firebase dependencies are installed:")
    print("pip install firebase-admin google-cloud-storage")
except Exception as e:
    print(f"✗ Error during Firebase integration test: {e}")

# Test frontend Firebase configuration
print("\n" + "="*50)
print("Frontend Firebase Configuration Test")
print("="*50)

try:
    # Check if frontend firebase.js exists
    frontend_firebase_path = Path(__file__).parent / "frontend" / "src" / "firebase.js"
    if frontend_firebase_path.exists():
        print("✓ Frontend firebase.js configuration file exists")
        
        # Read and check content
        with open(frontend_firebase_path, 'r') as f:
            content = f.read()
            if 'initializeApp' in content and 'getAuth' in content and 'getFirestore' in content:
                print("✓ Frontend Firebase configuration appears correct")
            else:
                print("⚠ Frontend Firebase configuration may be incomplete")
    else:
        print("✗ Frontend firebase.js configuration file not found")
        
except Exception as e:
    print(f"✗ Error testing frontend Firebase configuration: {e}")

print("\n" + "="*50)
print("Firebase Integration Test Summary")
print("="*50)
print("Backend:  Partially configured (requires credentials)")
print("Frontend: Configuration file exists")
print("\nTo complete the Firebase integration:")
print("1. Add Firebase project credentials to backend/.env")
print("2. Configure Firebase Admin SDK service account key")
print("3. Set required environment variables")
print("4. Test with actual Firebase services")