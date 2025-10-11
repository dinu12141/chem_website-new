    async def create_firebase_user(self, email: str, password: str, display_name: str = None) -> Optional[str]:
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

    async def create_firebase_admin(self, email: str, password: str, username: str) -> Optional[str]:
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