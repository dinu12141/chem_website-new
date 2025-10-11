import firebase_admin
from firebase_admin import firestore, auth
from typing import List, Optional, Dict, Any
from datetime import datetime
from .models import (
    FirebaseUser, FirebaseAdmin, FirebaseTeacher, FirebaseCourse,
    FirebaseTestimonial, FirebaseAnnouncement, FirebaseSupportMessage,
    FirebaseTelegramChannel, FirebaseVideoLesson
)
import logging

logger = logging.getLogger(__name__)

class FirebaseService:
    def __init__(self):
        self.db = firestore.client()
        
    # User operations
    async def create_user(self, user_data: Dict[str, Any]) -> Optional[str]:
        """Create a new user in Firestore"""
        try:
            doc_ref = self.db.collection('users').document()
            user_data['id'] = doc_ref.id
            user_data['created_at'] = datetime.utcnow()
            await doc_ref.set(user_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            return None

    async def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        try:
            doc = await self.db.collection('users').document(user_id).get()
            if doc.exists:
                return doc.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting user: {e}")
            return None

    async def get_user_by_register_number(self, register_number: str) -> Optional[Dict[str, Any]]:
        """Get user by register number"""
        try:
            docs = await self.db.collection('users').where('register_number', '==', register_number).limit(1).get()
            for doc in docs:
                return doc.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting user by register number: {e}")
            return None

    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email"""
        try:
            docs = await self.db.collection('users').where('email', '==', email).limit(1).get()
            for doc in docs:
                return doc.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting user by email: {e}")
            return None

    async def get_all_users(self) -> List[Dict[str, Any]]:
        """Get all users"""
        try:
            docs = await self.db.collection('users').get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all users: {e}")
            return []

    # Admin operations
    async def create_admin(self, admin_data: Dict[str, Any]) -> Optional[str]:
        """Create a new admin in Firestore"""
        try:
            doc_ref = self.db.collection('admins').document()
            admin_data['id'] = doc_ref.id
            admin_data['created_at'] = datetime.utcnow()
            await doc_ref.set(admin_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating admin: {e}")
            return None

    async def get_admin_by_id(self, admin_id: str) -> Optional[Dict[str, Any]]:
        """Get admin by ID"""
        try:
            doc = await self.db.collection('admins').document(admin_id).get()
            if doc.exists:
                return doc.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting admin: {e}")
            return None

    async def get_admin_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        """Get admin by username"""
        try:
            docs = await self.db.collection('admins').where('username', '==', username).limit(1).get()
            for doc in docs:
                return doc.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting admin by username: {e}")
            return None

    async def get_all_admins(self) -> List[Dict[str, Any]]:
        """Get all admins"""
        try:
            docs = await self.db.collection('admins').get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all admins: {e}")
            return []

    async def delete_admin(self, admin_id: str) -> bool:
        """Delete admin"""
        try:
            await self.db.collection('admins').document(admin_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting admin: {e}")
            return False

    async def get_admin_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Get admin by email"""
        try:
            docs = await self.db.collection('admins').where('email', '==', email).limit(1).get()
            for doc in docs:
                return doc.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting admin by email: {e}")
            return None

    async def delete_admin(self, admin_id: str) -> bool:
        """Delete admin"""
        try:
            await self.db.collection('admins').document(admin_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting admin: {e}")
            return False

    # Teacher operations
    async def create_teacher(self, teacher_data: Dict[str, Any]) -> Optional[str]:
        """Create a new teacher in Firestore"""
        try:
            doc_ref = self.db.collection('teachers').document()
            teacher_data['id'] = doc_ref.id
            teacher_data['created_at'] = datetime.utcnow()
            await doc_ref.set(teacher_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating teacher: {e}")
            return None

    async def get_teacher_by_id(self, teacher_id: str) -> Optional[Dict[str, Any]]:
        """Get teacher by ID"""
        try:
            doc = await self.db.collection('teachers').document(teacher_id).get()
            if doc.exists:
                return doc.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting teacher: {e}")
            return None

    async def get_all_teachers(self) -> List[Dict[str, Any]]:
        """Get all teachers"""
        try:
            docs = await self.db.collection('teachers').get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all teachers: {e}")
            return []

    async def update_teacher(self, teacher_id: str, teacher_data: Dict[str, Any]) -> bool:
        """Update teacher"""
        try:
            await self.db.collection('teachers').document(teacher_id).update(teacher_data)
            return True
        except Exception as e:
            logger.error(f"Error updating teacher: {e}")
            return False

    async def delete_teacher(self, teacher_id: str) -> bool:
        """Delete teacher"""
        try:
            await self.db.collection('teachers').document(teacher_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting teacher: {e}")
            return False

    # Course operations
    async def create_course(self, course_data: Dict[str, Any]) -> Optional[str]:
        """Create a new course in Firestore"""
        try:
            doc_ref = self.db.collection('courses').document()
            course_data['id'] = doc_ref.id
            course_data['created_at'] = datetime.utcnow()
            await doc_ref.set(course_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating course: {e}")
            return None

    async def get_course_by_id(self, course_id: str) -> Optional[Dict[str, Any]]:
        """Get course by ID"""
        try:
            doc = await self.db.collection('courses').document(course_id).get()
            if doc.exists:
                return doc.to_dict()
            return None
        except Exception as e:
            logger.error(f"Error getting course: {e}")
            return None

    async def get_all_courses(self, active_only: bool = True) -> List[Dict[str, Any]]:
        """Get all courses"""
        try:
            query = self.db.collection('courses')
            if active_only:
                query = query.where('is_active', '==', True)
            docs = await query.get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all courses: {e}")
            return []

    async def update_course(self, course_id: str, course_data: Dict[str, Any]) -> bool:
        """Update course"""
        try:
            await self.db.collection('courses').document(course_id).update(course_data)
            return True
        except Exception as e:
            logger.error(f"Error updating course: {e}")
            return False

    async def delete_course(self, course_id: str) -> bool:
        """Delete course"""
        try:
            await self.db.collection('courses').document(course_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting course: {e}")
            return False

    # Testimonial operations
    async def create_testimonial(self, testimonial_data: Dict[str, Any]) -> Optional[str]:
        """Create a new testimonial in Firestore"""
        try:
            doc_ref = self.db.collection('testimonials').document()
            testimonial_data['id'] = doc_ref.id
            testimonial_data['created_at'] = datetime.utcnow()
            await doc_ref.set(testimonial_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating testimonial: {e}")
            return None

    async def get_all_testimonials(self, limit: int = 50) -> List[Dict[str, Any]]:
        """Get all testimonials"""
        try:
            docs = await self.db.collection('testimonials').order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit).get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all testimonials: {e}")
            return []

    async def get_featured_testimonials(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get featured testimonials"""
        try:
            docs = await self.db.collection('testimonials').where('is_featured', '==', True).order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit).get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting featured testimonials: {e}")
            return []

    async def update_testimonial(self, testimonial_id: str, testimonial_data: Dict[str, Any]) -> bool:
        """Update testimonial"""
        try:
            await self.db.collection('testimonials').document(testimonial_id).update(testimonial_data)
            return True
        except Exception as e:
            logger.error(f"Error updating testimonial: {e}")
            return False

    async def delete_testimonial(self, testimonial_id: str) -> bool:
        """Delete testimonial"""
        try:
            await self.db.collection('testimonials').document(testimonial_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting testimonial: {e}")
            return False

    # Announcement operations
    async def create_announcement(self, announcement_data: Dict[str, Any]) -> Optional[str]:
        """Create a new announcement in Firestore"""
        try:
            doc_ref = self.db.collection('announcements').document()
            announcement_data['id'] = doc_ref.id
            announcement_data['created_at'] = datetime.utcnow()
            await doc_ref.set(announcement_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating announcement: {e}")
            return None

    async def get_all_announcements(self, active_only: bool = True, limit: int = 20) -> List[Dict[str, Any]]:
        """Get all announcements"""
        try:
            query = self.db.collection('announcements')
            if active_only:
                query = query.where('is_active', '==', True)
            docs = await query.order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit).get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all announcements: {e}")
            return []

    async def get_announcements_by_year(self, year: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Get announcements by year"""
        try:
            docs = await self.db.collection('announcements').where('is_active', '==', True).where('target_year', '==', year).order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit).get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting announcements by year: {e}")
            return []

    async def update_announcement(self, announcement_id: str, announcement_data: Dict[str, Any]) -> bool:
        """Update announcement"""
        try:
            await self.db.collection('announcements').document(announcement_id).update(announcement_data)
            return True
        except Exception as e:
            logger.error(f"Error updating announcement: {e}")
            return False

    async def delete_announcement(self, announcement_id: str) -> bool:
        """Delete announcement"""
        try:
            await self.db.collection('announcements').document(announcement_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting announcement: {e}")
            return False

    # Support Message operations
    async def create_support_message(self, message_data: Dict[str, Any]) -> Optional[str]:
        """Create a new support message in Firestore"""
        try:
            doc_ref = self.db.collection('support_messages').document()
            message_data['id'] = doc_ref.id
            message_data['created_at'] = datetime.utcnow()
            await doc_ref.set(message_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating support message: {e}")
            return None

    async def get_all_support_messages(self, limit: int = 100) -> List[Dict[str, Any]]:
        """Get all support messages"""
        try:
            docs = await self.db.collection('support_messages').order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit).get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all support messages: {e}")
            return []

    async def resolve_support_message(self, message_id: str) -> bool:
        """Mark support message as resolved"""
        try:
            await self.db.collection('support_messages').document(message_id).update({'is_resolved': True})
            return True
        except Exception as e:
            logger.error(f"Error resolving support message: {e}")
            return False

    async def delete_support_message(self, message_id: str) -> bool:
        """Delete support message"""
        try:
            await self.db.collection('support_messages').document(message_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting support message: {e}")
            return False

    # Telegram Channel operations
    async def create_telegram_channel(self, channel_data: Dict[str, Any]) -> Optional[str]:
        """Create a new telegram channel in Firestore"""
        try:
            doc_ref = self.db.collection('telegram_channels').document()
            channel_data['id'] = doc_ref.id
            channel_data['created_at'] = datetime.utcnow()
            await doc_ref.set(channel_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating telegram channel: {e}")
            return None

    async def get_all_telegram_channels(self, active_only: bool = True) -> List[Dict[str, Any]]:
        """Get all telegram channels"""
        try:
            query = self.db.collection('telegram_channels')
            if active_only:
                query = query.where('is_active', '==', True)
            docs = await query.order_by('created_at', direction=firestore.Query.DESCENDING).get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all telegram channels: {e}")
            return []

    async def update_telegram_channel(self, channel_id: str, channel_data: Dict[str, Any]) -> bool:
        """Update telegram channel"""
        try:
            await self.db.collection('telegram_channels').document(channel_id).update(channel_data)
            return True
        except Exception as e:
            logger.error(f"Error updating telegram channel: {e}")
            return False

    async def delete_telegram_channel(self, channel_id: str) -> bool:
        """Delete telegram channel"""
        try:
            await self.db.collection('telegram_channels').document(channel_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting telegram channel: {e}")
            return False

    # Video Lesson operations
    async def create_video_lesson(self, lesson_data: Dict[str, Any]) -> Optional[str]:
        """Create a new video lesson in Firestore"""
        try:
            doc_ref = self.db.collection('video_lessons').document()
            lesson_data['id'] = doc_ref.id
            lesson_data['created_at'] = datetime.utcnow()
            await doc_ref.set(lesson_data)
            return doc_ref.id
        except Exception as e:
            logger.error(f"Error creating video lesson: {e}")
            return None

    async def get_all_video_lessons(self, published_only: bool = True) -> List[Dict[str, Any]]:
        """Get all video lessons"""
        try:
            query = self.db.collection('video_lessons')
            if published_only:
                query = query.where('is_published', '==', True)
            docs = await query.order_by('created_at', direction=firestore.Query.DESCENDING).get()
            return [doc.to_dict() for doc in docs]
        except Exception as e:
            logger.error(f"Error getting all video lessons: {e}")
            return []

    async def update_video_lesson(self, lesson_id: str, lesson_data: Dict[str, Any]) -> bool:
        """Update video lesson"""
        try:
            await self.db.collection('video_lessons').document(lesson_id).update(lesson_data)
            return True
        except Exception as e:
            logger.error(f"Error updating video lesson: {e}")
            return False

    async def delete_video_lesson(self, lesson_id: str) -> bool:
        """Delete video lesson"""
        try:
            await self.db.collection('video_lessons').document(lesson_id).delete()
            return True
        except Exception as e:
            logger.error(f"Error deleting video lesson: {e}")
            return False

    async def upload_file_to_storage(self, file_data: bytes, file_name: str, content_type: str = None) -> Optional[str]:
        """Upload file to Firebase Storage"""
        try:
            from google.cloud import storage as gcs
            import io
            
            # Get the default bucket
            bucket = gcs.Client().bucket(os.getenv('FIREBASE_STORAGE_BUCKET'))
            
            # Create a blob (file) in the bucket
            blob = bucket.blob(file_name)
            
            # Upload the file
            if content_type:
                blob.upload_from_string(file_data, content_type=content_type)
            else:
                blob.upload_from_string(file_data)
            
            # Make the blob publicly readable
            blob.make_public()
            
            # Return the public URL
            return blob.public_url
        except Exception as e:
            logger.error(f"Error uploading file to storage: {e}")
            return None

    async def delete_file_from_storage(self, file_name: str) -> bool:
        """Delete file from Firebase Storage"""
        try:
            from google.cloud import storage as gcs
            
            # Get the default bucket
            bucket = gcs.Client().bucket(os.getenv('FIREBASE_STORAGE_BUCKET'))
            
            # Get the blob (file)
            blob = bucket.blob(file_name)
            
            # Delete the file
            blob.delete()
            
            return True
        except Exception as e:
            logger.error(f"Error deleting file from storage: {e}")
            return False

    async def get_file_url_from_storage(self, file_name: str) -> Optional[str]:
        """Get file URL from Firebase Storage"""
        try:
            from google.cloud import storage as gcs
            
            # Get the default bucket
            bucket = gcs.Client().bucket(os.getenv('FIREBASE_STORAGE_BUCKET'))
            
            # Get the blob (file)
            blob = bucket.blob(file_name)
            
            # Check if file exists
            if not blob.exists():
                return None
            
            # Return the public URL
            return blob.public_url
        except Exception as e:
            logger.error(f"Error getting file URL from storage: {e}")
            return None
