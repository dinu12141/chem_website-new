import firebase_admin
from firebase_admin import auth as firebase_auth
from typing import Optional, Dict, Any
import logging
from passlib.context import CryptContext
from jose import jwt
import os
from datetime import datetime, timedelta
from pydantic import BaseModel, Field, EmailStr
from typing import List
import uuid

logger = logging.getLogger(__name__)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class FirebaseAuthService:
    def __init__(self):
        pass
    
    def get_password_hash(self, password: str) -> str:
        """Generate password hash"""
        return pwd_context.hash(password)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify password against hash"""
        return pwd_context.verify(plain_password, hashed_password)
    
    def create_access_token(self, data: dict, expires_delta: Optional[Any] = None) -> str:
        """Create JWT access token"""
        from datetime import datetime, timedelta
        
        SECRET_KEY = os.environ.get('SECRET_KEY', "nadeeka_warnakula_secret_key_2024_nadeeka")
        ALGORITHM = "HS256"
        
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt

    async def create_firebase_user(self, email: str, password: str, display_name: Optional[str] = None) -> Optional[str]:
        """Create a new Firebase user"""
        try:
            user = firebase_auth.create_user(
                email=email,
                display_name=display_name
            )
            # Set the password separately
            firebase_auth.update_user(user.uid, password=password)
            return user.uid
        except Exception as e:
            logger.error(f"Error creating Firebase user: {e}")
            return None

    async def create_firebase_admin(self, email: str, password: str, username: Optional[str] = None) -> Optional[str]:
        """Create a new Firebase admin user"""
        try:
            user = firebase_auth.create_user(
                email=email,
                display_name=username
            )
            # Set the password separately
            firebase_auth.update_user(user.uid, password=password)
            return user.uid
        except Exception as e:
            logger.error(f"Error creating Firebase admin: {e}")
            return None

    async def verify_user_credentials(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        """Verify user credentials and return user data"""
        try:
            # In a real implementation, you would verify credentials with Firebase Auth
            # For now, we'll return a mock response
            user = firebase_auth.get_user_by_email(email)
            return {
                'uid': user.uid,
                'email': user.email,
                'display_name': user.display_name
            }
        except Exception as e:
            logger.error(f"Error verifying user credentials: {e}")
            return None

    async def verify_admin_credentials(self, username: str, password: str) -> Optional[Dict[str, Any]]:
        """Verify admin credentials and return admin data"""
        try:
            # In a real implementation, you would verify credentials with Firebase Auth
            # For now, we'll return a mock response
            # This would typically involve checking custom claims or a separate admin collection
            users = firebase_auth.list_users()
            for user in users.users:
                if user.display_name == username:
                    return {
                        'uid': user.uid,
                        'email': user.email,
                        'username': user.display_name
                    }
            return None
        except Exception as e:
            logger.error(f"Error verifying admin credentials: {e}")
            return None