#!/usr/bin/env python3
"""
Firebase Integration Test Script
Tests the Firebase implementation of the Nadeeka Warnakula platform
"""

import os
import sys
import asyncio
import logging
from dotenv import load_dotenv

# Add backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), 'backend', '.env'))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def test_firebase_config():
    """Test Firebase configuration"""
    logger.info("Testing Firebase configuration...")
    
    # Check required environment variables
    required_vars = [
        'FIREBASE_PROJECT_ID',
        'FIREBASE_PRIVATE_KEY_ID',
        'FIREBASE_PRIVATE_KEY',
        'FIREBASE_CLIENT_EMAIL',
        'FIREBASE_CLIENT_ID',
        'FIREBASE_CLIENT_CERT_URL'
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        logger.error(f"Missing Firebase environment variables: {missing_vars}")
        return False
    
    logger.info("Firebase configuration check passed")
    return True

def test_firebase_imports():
    """Test Firebase imports"""
    logger.info("Testing Firebase imports...")
    
    try:
        import firebase_admin
        from firebase_admin import credentials, firestore, auth, storage
        logger.info("Firebase imports successful")
        return True
    except ImportError as e:
        logger.error(f"Firebase imports failed: {e}")
        return False

async def test_firebase_initialization():
    """Test Firebase initialization"""
    logger.info("Testing Firebase initialization...")
    
    try:
        # Import Firebase config
        from backend.firebase.firebase_config import initialize_firebase
        
        # Initialize Firebase
        db = initialize_firebase()
        if db is None:
            logger.error("Firebase initialization failed")
            return False
            
        logger.info("Firebase initialization successful")
        return True
    except Exception as e:
        logger.error(f"Firebase initialization failed: {e}")
        return False

async def test_firebase_services():
    """Test Firebase services"""
    logger.info("Testing Firebase services...")
    
    try:
        # Import Firebase services
        from backend.firebase.services import FirebaseService
        from backend.firebase.firebase_config import get_firestore_db, get_firebase_auth, get_firebase_storage
        
        # Test Firestore connection
        db = get_firestore_db()
        if db is None:
            logger.error("Firestore connection failed")
            return False
            
        # Test Firebase Auth
        auth_service = get_firebase_auth()
        if auth_service is None:
            logger.error("Firebase Auth connection failed")
            return False
            
        # Test Firebase Storage
        storage_service = get_firebase_storage()
        if storage_service is None:
            logger.error("Firebase Storage connection failed")
            return False
            
        # Test Firebase service class
        firebase_service = FirebaseService()
        if firebase_service is None:
            logger.error("Firebase service class initialization failed")
            return False
            
        logger.info("Firebase services test successful")
        return True
    except Exception as e:
        logger.error(f"Firebase services test failed: {e}")
        return False

async def test_firebase_auth_service():
    """Test Firebase authentication service"""
    logger.info("Testing Firebase authentication service...")
    
    try:
        # Import Firebase auth service
        from backend.firebase.auth_service import FirebaseAuthService
        
        # Initialize auth service
        auth_service = FirebaseAuthService()
        if auth_service is None:
            logger.error("Firebase auth service initialization failed")
            return False
            
        logger.info("Firebase authentication service test successful")
        return True
    except Exception as e:
        logger.error(f"Firebase authentication service test failed: {e}")
        return False

async def test_firebase_models():
    """Test Firebase models"""
    logger.info("Testing Firebase models...")
    
    try:
        # Import Firebase models
        from backend.firebase.models import (
            FirebaseUser, FirebaseAdmin, FirebaseTeacher, FirebaseCourse,
            FirebaseTestimonial, FirebaseAnnouncement, FirebaseSupportMessage,
            FirebaseTelegramChannel, FirebaseVideoLesson
        )
        
        # Test model instantiation
        user = FirebaseUser(
            full_name="Test User",
            email="test@example.com",
            phone_number="1234567890",
            id_number="123456789V",
            al_year="2025",
            school_name="Test School",
            register_number="SC2025001",
            password_hash="test_hash"
        )
        
        logger.info("Firebase models test successful")
        return True
    except Exception as e:
        logger.error(f"Firebase models test failed: {e}")
        return False

async def main():
    """Main test function"""
    logger.info("Starting Firebase integration tests...")
    
    # Run all tests
    tests = [
        test_firebase_config,
        test_firebase_imports,
        test_firebase_initialization,
        test_firebase_services,
        test_firebase_auth_service,
        test_firebase_models
    ]
    
    results = []
    for test in tests:
        try:
            if asyncio.iscoroutinefunction(test):
                result = await test()
            else:
                result = test()
            results.append(result)
        except Exception as e:
            logger.error(f"Test {test.__name__} failed with exception: {e}")
            results.append(False)
    
    # Calculate results
    passed = sum(results)
    total = len(results)
    
    logger.info(f"Firebase integration tests completed: {passed}/{total} tests passed")
    
    if passed == total:
        logger.info("🎉 All Firebase integration tests passed!")
        return True
    else:
        logger.error(f"❌ {total - passed} tests failed. Please check the logs above.")
        return False

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)