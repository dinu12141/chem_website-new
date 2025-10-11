from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import os
import logging
import uuid
import random
from pathlib import Path
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import auth as firebase_auth

# Import Firebase services
from .firebase_config import initialize_firebase
from .services import FirebaseService
from .auth_service import FirebaseAuthService
from .models import *

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Firebase
db = initialize_firebase()
if db is None:
    logger.error("Failed to initialize Firebase")
else:
    logger.info("Firebase initialized successfully")

# Initialize services
firebase_service = FirebaseService()
auth_service = FirebaseAuthService()

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', "nadeeka_warnakula_secret_key_2024_nadeeka")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get('ACCESS_TOKEN_EXPIRE_MINUTES', 30 * 24 * 60))  # 30 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Create the main app
app = FastAPI(title="Nadeeka Warnakula API with Firebase", version="1.0.0")
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication endpoints
@api_router.post("/auth/register", response_model=dict)
async def register_user(user_data: UserCreateWithPassword):
    try:
        # Check if email already exists
        existing_user = await firebase_service.get_user_by_email(user_data.email)
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Generate register number
        register_number = await generate_register_number(user_data.al_year)
        
        # Hash password
        password_hash = auth_service.get_password_hash(user_data.password)
        
        # Create user in Firestore
        user_dict = {
            "full_name": user_data.full_name,
            "email": user_data.email,
            "phone_number": user_data.phone_number,
            "whatsapp_number": user_data.whatsapp_number,
            "id_number": user_data.id_number,
            "al_year": user_data.al_year,
            "school_name": user_data.school_name,
            "register_number": register_number,
            "password_hash": password_hash,
            "is_active": True
        }
        
        user_id = await firebase_service.create_user(user_dict)
        if not user_id:
            raise HTTPException(status_code=500, detail="Failed to create user. Please try again later.")
        
        logger.info(f"User registered successfully: {user_data.full_name} ({register_number})")
        
        return {
            "message": "User registered successfully",
            "register_number": register_number,
            "student_name": user_data.full_name
        }
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Log the actual error for debugging
        logger.error(f"Registration error: {str(e)}")
        # For other exceptions, return a generic error
        raise HTTPException(status_code=500, detail="Registration failed. Please try again.")

async def generate_register_number(al_year: str) -> str:
    """Generate unique register number in format SC{year}{3-digit-number}"""
    # In a real implementation, you would check Firestore for existing numbers
    # For this example, we'll generate a random number
    number = random.randint(100, 999)
    return f"SC{al_year}{number}"

@api_router.post("/auth/login", response_model=Token)
async def login_user(user_credentials: UserLogin):
    user = await firebase_service.get_user_by_register_number(user_credentials.register_number)
    if not user or not auth_service.verify_password(user_credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect register number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_service.create_access_token(
        data={"sub": user["id"]}, expires_delta=access_token_expires
    )
    
    user_response = UserResponse(**user)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_response
    }

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub", "")
        if user_id is None or user_id == "":
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    try:
        user = await firebase_service.get_user_by_id(user_id)
        if user is None:
            raise credentials_exception
        return UserResponse(**user)
    except Exception as e:
        logger.error(f"Database error while fetching user: {e}")
        raise HTTPException(status_code=500, detail="Database error. Please try again later.")

# Teacher endpoints
@api_router.get("/teachers", response_model=List[Teacher])
async def get_teachers():
    teachers = await firebase_service.get_all_teachers()
    return [Teacher(**teacher) for teacher in teachers]

@api_router.get("/teachers/{teacher_id}", response_model=Teacher)
async def get_teacher(teacher_id: str):
    teacher = await firebase_service.get_teacher_by_id(teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return Teacher(**teacher)

@api_router.post("/teachers", response_model=Teacher)
async def create_teacher(teacher: Teacher):
    teacher_dict = teacher.dict()
    teacher_id = await firebase_service.create_teacher(teacher_dict)
    if teacher_id:
        teacher_dict['id'] = teacher_id
        return Teacher(**teacher_dict)
    raise HTTPException(status_code=500, detail="Failed to create teacher")

@api_router.put("/teachers/{teacher_id}", response_model=Teacher)
async def update_teacher(teacher_id: str, teacher: Teacher):
    success = await firebase_service.update_teacher(teacher_id, teacher.dict(exclude_unset=True))
    if not success:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    updated_teacher = await firebase_service.get_teacher_by_id(teacher_id)
    if updated_teacher:
        return Teacher(**updated_teacher)
    raise HTTPException(status_code=404, detail="Teacher not found after update")

@api_router.delete("/teachers/{teacher_id}", response_model=dict)
async def delete_teacher(teacher_id: str):
    success = await firebase_service.delete_teacher(teacher_id)
    if not success:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return {"message": "Teacher deleted successfully"}

# Course endpoints
@api_router.get("/courses", response_model=List[Course])
async def get_courses():
    courses = await firebase_service.get_all_courses(active_only=True)
    return [Course(**course) for course in courses]

@api_router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    course = await firebase_service.get_course_by_id(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return Course(**course)

@api_router.post("/courses", response_model=Course)
async def create_course(course: Course):
    course_dict = course.dict()
    course_id = await firebase_service.create_course(course_dict)
    if course_id:
        course_dict['id'] = course_id
        return Course(**course_dict)
    raise HTTPException(status_code=500, detail="Failed to create course")

@api_router.put("/courses/{course_id}", response_model=Course)
async def update_course(course_id: str, course: Course):
    success = await firebase_service.update_course(course_id, course.dict(exclude_unset=True))
    if not success:
        raise HTTPException(status_code=404, detail="Course not found")
    
    updated_course = await firebase_service.get_course_by_id(course_id)
    if updated_course:
        return Course(**updated_course)
    raise HTTPException(status_code=404, detail="Course not found after update")

@api_router.delete("/courses/{course_id}", response_model=dict)
async def delete_course(course_id: str):
    success = await firebase_service.delete_course(course_id)
    if not success:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": "Course deleted successfully"}

# Testimonial endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await firebase_service.get_all_testimonials()
    return [Testimonial(**testimonial) for testimonial in testimonials]

@api_router.get("/testimonials/featured", response_model=List[Testimonial])
async def get_featured_testimonials():
    testimonials = await firebase_service.get_featured_testimonials()
    return [Testimonial(**testimonial) for testimonial in testimonials]

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: Testimonial):
    testimonial_dict = testimonial.dict()
    testimonial_id = await firebase_service.create_testimonial(testimonial_dict)
    if testimonial_id:
        testimonial_dict['id'] = testimonial_id
        return Testimonial(**testimonial_dict)
    raise HTTPException(status_code=500, detail="Failed to create testimonial")

@api_router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial: Testimonial):
    success = await firebase_service.update_testimonial(testimonial_id, testimonial.dict(exclude_unset=True))
    if not success:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    updated_testimonial = await firebase_service.get_testimonial_by_id(testimonial_id)
    if updated_testimonial:
        return Testimonial(**updated_testimonial)
    raise HTTPException(status_code=404, detail="Testimonial not found after update")

@api_router.delete("/testimonials/{testimonial_id}", response_model=dict)
async def delete_testimonial(testimonial_id: str):
    success = await firebase_service.delete_testimonial(testimonial_id)
    if not success:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# Announcement endpoints
@api_router.get("/announcements", response_model=List[Announcement])
async def get_announcements():
    announcements = await firebase_service.get_all_announcements()
    return [Announcement(**announcement) for announcement in announcements]

@api_router.get("/announcements/{year}")
async def get_announcements_by_year(year: str):
    announcements = await firebase_service.get_announcements_by_year(year)
    return [Announcement(**announcement) for announcement in announcements]

@api_router.post("/announcements", response_model=Announcement)
async def create_announcement(announcement: Announcement):
    announcement_dict = announcement.dict()
    announcement_id = await firebase_service.create_announcement(announcement_dict)
    if announcement_id:
        announcement_dict['id'] = announcement_id
        return Announcement(**announcement_dict)
    raise HTTPException(status_code=500, detail="Failed to create announcement")

@api_router.put("/announcements/{announcement_id}", response_model=Announcement)
async def update_announcement(announcement_id: str, announcement: Announcement):
    success = await firebase_service.update_announcement(announcement_id, announcement.dict(exclude_unset=True))
    if not success:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    updated_announcement = await firebase_service.get_announcement_by_id(announcement_id)
    if updated_announcement:
        return Announcement(**updated_announcement)
    raise HTTPException(status_code=404, detail="Announcement not found after update")

@api_router.delete("/announcements/{announcement_id}", response_model=dict)
async def delete_announcement(announcement_id: str):
    success = await firebase_service.delete_announcement(announcement_id)
    if not success:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return {"message": "Announcement deleted successfully"}

# Support Message endpoints
@api_router.post("/support/messages", response_model=dict)
async def create_support_message(message: SupportMessage):
    message_dict = message.dict()
    message_id = await firebase_service.create_support_message(message_dict)
    if message_id:
        return {"message": "Message sent successfully"}
    raise HTTPException(status_code=500, detail="Failed to send message")

@api_router.get("/support/messages", response_model=List[SupportMessage])
async def get_support_messages():
    messages = await firebase_service.get_all_support_messages()
    return [SupportMessage(**message) for message in messages]

@api_router.put("/support/messages/{message_id}/resolve", response_model=dict)
async def resolve_support_message(message_id: str):
    success = await firebase_service.resolve_support_message(message_id)
    if not success:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message marked as resolved"}

@api_router.delete("/support/messages/{message_id}", response_model=dict)
async def delete_support_message(message_id: str):
    success = await firebase_service.delete_support_message(message_id)
    if not success:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted successfully"}

# Telegram Channel endpoints
@api_router.get("/telegram/channels", response_model=List[TelegramChannel])
async def get_telegram_channels():
    channels = await firebase_service.get_all_telegram_channels()
    return [TelegramChannel(**channel) for channel in channels]

@api_router.post("/telegram/channels", response_model=TelegramChannel)
async def create_telegram_channel(channel: TelegramChannel):
    channel_dict = channel.dict()
    channel_id = await firebase_service.create_telegram_channel(channel_dict)
    if channel_id:
        channel_dict['id'] = channel_id
        return TelegramChannel(**channel_dict)
    raise HTTPException(status_code=500, detail="Failed to create channel")

@api_router.put("/telegram/channels/{channel_id}", response_model=TelegramChannel)
async def update_telegram_channel(channel_id: str, channel: TelegramChannel):
    success = await firebase_service.update_telegram_channel(channel_id, channel.dict(exclude_unset=True))
    if not success:
        raise HTTPException(status_code=404, detail="Channel not found")
    
    updated_channel = await firebase_service.get_telegram_channel_by_id(channel_id)
    if updated_channel:
        return TelegramChannel(**updated_channel)
    raise HTTPException(status_code=404, detail="Channel not found after update")

@api_router.delete("/telegram/channels/{channel_id}", response_model=dict)
async def delete_telegram_channel(channel_id: str):
    success = await firebase_service.delete_telegram_channel(channel_id)
    if not success:
        raise HTTPException(status_code=404, detail="Channel not found")
    return {"message": "Channel deleted successfully"}

# Video Lesson endpoints
@api_router.get("/video-lessons", response_model=List[VideoLesson])
async def get_video_lessons():
    lessons = await firebase_service.get_all_video_lessons()
    return [VideoLesson(**lesson) for lesson in lessons]

@api_router.post("/video-lessons", response_model=VideoLesson)
async def create_video_lesson(lesson: VideoLesson):
    lesson_dict = lesson.dict()
    lesson_id = await firebase_service.create_video_lesson(lesson_dict)
    if lesson_id:
        lesson_dict['id'] = lesson_id
        return VideoLesson(**lesson_dict)
    raise HTTPException(status_code=500, detail="Failed to create video lesson")

@api_router.put("/video-lessons/{lesson_id}", response_model=VideoLesson)
async def update_video_lesson(lesson_id: str, lesson: VideoLesson):
    success = await firebase_service.update_video_lesson(lesson_id, lesson.dict(exclude_unset=True))
    if not success:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    updated_lesson = await firebase_service.get_video_lesson_by_id(lesson_id)
    if updated_lesson:
        return VideoLesson(**updated_lesson)
    raise HTTPException(status_code=404, detail="Lesson not found after update")

@api_router.delete("/video-lessons/{lesson_id}", response_model=dict)
async def delete_video_lesson(lesson_id: str):
    success = await firebase_service.delete_video_lesson(lesson_id)
    if not success:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return {"message": "Lesson deleted successfully"}

# General endpoints
@api_router.get("/")
async def root():
    return {"message": "Nadeeka Warnakula API with Firebase - නදීක වර්ණකුල Chemistry Platform"}

@api_router.get("/stats")
async def get_stats():
    # In a real implementation, you would query Firestore for counts
    # For this example, we'll return sample data
    return {
        "total_students": 250,
        "total_courses": 12,
        "total_announcements": 3,
        "platform_name": "Nadeeka Warnakula",
        "teacher": "නදීක වර්ණකුල (NADEEKA Warnakula)"
    }

# User endpoints for admin
@api_router.get("/admin/users", response_model=List[UserResponse])
async def get_all_users(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get all users for admin dashboard"""
    users = await firebase_service.get_all_users()
    return [UserResponse(**user) for user in users]

# Admin Authentication endpoints
@api_router.post("/auth/admin/register", response_model=dict)
async def register_admin(admin_data: AdminCreate):
    """Register a new admin user (for initial setup)"""
    try:
        # Check if username already exists
        existing_admin = await firebase_service.get_admin_by_username(admin_data.username)
        if existing_admin:
            raise HTTPException(status_code=400, detail="Username already exists")
        
        # Check if email already exists
        existing_email = await firebase_service.get_admin_by_email(admin_data.email)
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Hash password
        password_hash = auth_service.get_password_hash(admin_data.password)
        
        # Create admin in Firestore
        admin_dict = {
            "username": admin_data.username,
            "email": admin_data.email,
            "password_hash": password_hash,
            "is_active": True
        }
        
        admin_id = await firebase_service.create_admin(admin_dict)
        if not admin_id:
            raise HTTPException(status_code=500, detail="Failed to create admin")
        
        logger.info(f"Admin registered successfully: {admin_data.username}")
        
        return {
            "message": "Admin registered successfully",
            "admin_id": admin_id
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Admin registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Admin registration failed")

@api_router.post("/auth/admin/login", response_model=AdminToken)
async def login_admin(admin_credentials: AdminLogin):
    """Authenticate admin user"""
    admin = await firebase_service.get_admin_by_username(admin_credentials.username)
    if not admin or not auth_service.verify_password(admin_credentials.password, admin["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_service.create_access_token(
        data={"sub": admin["id"], "admin": True}, expires_delta=access_token_expires
    )
    
    admin_response = AdminResponse(**admin)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "admin": admin_response
    }

@api_router.get("/auth/admin/me", response_model=AdminResponse)
async def get_current_admin_info(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current admin info"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate admin credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        # Check if this is an admin token
        if not payload.get("admin", False):
            raise credentials_exception
        admin_id: str = payload.get("sub", "")
        if admin_id is None or admin_id == "":
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    try:
        admin = await firebase_service.get_admin_by_id(admin_id)
        if admin is None:
            raise credentials_exception
        return AdminResponse(**admin)
    except Exception as e:
        logger.error(f"Database error while fetching admin: {e}")
        raise HTTPException(status_code=500, detail="Database error. Please try again later.")

# Add endpoint to get all admins (for admin management)
@api_router.get("/auth/admin/admins", response_model=List[AdminResponse])
async def get_all_admins(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get all admins for admin dashboard"""
    admins = await firebase_service.get_all_admins()
    return [AdminResponse(**admin) for admin in admins]

# Add endpoint to delete an admin
@api_router.delete("/auth/admin/admins/{admin_id}", response_model=dict)
async def delete_admin(admin_id: str, credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Delete an admin user"""
    # Get current admin to prevent self-deletion
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        current_admin_id: str = payload.get("sub", "")
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate admin credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Prevent admin from deleting themselves
    if current_admin_id == admin_id:
        raise HTTPException(status_code=400, detail="You cannot delete yourself")
    
    # Check if this is the last admin
    admins = await firebase_service.get_all_admins()
    if len(admins) <= 1:
        raise HTTPException(status_code=400, detail="Cannot delete the last admin user")
    
    success = await firebase_service.delete_admin(admin_id)
    if not success:
        raise HTTPException(status_code=404, detail="Admin not found")
    return {"message": "Admin deleted successfully"}

# File upload endpoints for Firebase Storage
@api_router.post("/upload/image")
async def upload_image(file: bytes = File(...), filename: str = Form(...)):
    """Upload an image to Firebase Storage"""
    try:
        # Upload file to Firebase Storage
        file_url = await firebase_service.upload_file_to_storage(file, filename, "image/jpeg")
        if not file_url:
            raise HTTPException(status_code=500, detail="Failed to upload image")
        
        return {"url": file_url, "message": "Image uploaded successfully"}
    except Exception as e:
        logger.error(f"Error uploading image: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload image")

@api_router.post("/upload/video")
async def upload_video(file: bytes = File(...), filename: str = Form(...)):
    """Upload a video to Firebase Storage"""
    try:
        # Upload file to Firebase Storage
        file_url = await firebase_service.upload_file_to_storage(file, filename, "video/mp4")
        if not file_url:
            raise HTTPException(status_code=500, detail="Failed to upload video")
        
        return {"url": file_url, "message": "Video uploaded successfully"}
    except Exception as e:
        logger.error(f"Error uploading video: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload video")

@api_router.delete("/upload/file/{filename}")
async def delete_file(filename: str):
    """Delete a file from Firebase Storage"""
    try:
        success = await firebase_service.delete_file_from_storage(filename)
        if not success:
            raise HTTPException(status_code=404, detail="File not found or failed to delete")
        
        return {"message": "File deleted successfully"}
    except Exception as e:
        logger.error(f"Error deleting file: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete file")

# Include router
app.include_router(api_router)

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database with sample data"""
    try:
        logger.info("Firebase backend started successfully")
    except Exception as e:
        logger.error(f"Error during startup: {e}")

if __name__ == "__main__":
    import uvicorn
    
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 8000))
    log_level = os.environ.get('LOG_LEVEL', 'info').lower()
    
    uvicorn.run(
        "server_firebase:app",
        host=host,
        port=port,
        log_level=log_level,
        reload=False
    )
