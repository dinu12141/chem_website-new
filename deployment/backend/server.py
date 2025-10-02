from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
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

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection with error handling
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = None
db = None

try:
    client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
    db = client[os.environ.get('DB_NAME', 'smartchem')]
    logger.info(f"Connected to MongoDB at {mongo_url}")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")

# Security
SECRET_KEY = os.environ.get('SECRET_KEY', "smartchem_secret_key_2024_nadeeka_warnakula")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get('ACCESS_TOKEN_EXPIRE_MINUTES', 30 * 24 * 60))  # 30 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Create the main app
app = FastAPI(title="SMARTCHEM API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to check database connection
def check_db_connection():
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection unavailable. Please contact administrator.")
    return db

# Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    phone_number: str
    id_number: str
    al_year: str
    school_name: str
    register_number: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class UserCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone_number: str = Field(..., min_length=8, max_length=15)
    id_number: str = Field(..., min_length=9, max_length=12)
    al_year: str = Field(..., pattern="^(2024|2025|2026)$")
    school_name: str = Field(..., min_length=2, max_length=200)
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    register_number: str
    password: str

class UserResponse(BaseModel):
    id: str
    full_name: str
    email: str
    phone_number: str
    id_number: str
    al_year: str
    school_name: str
    register_number: str
    created_at: datetime
    is_active: bool

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class Teacher(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    name_sinhala: str
    qualifications: List[str]
    experience_years: int
    specializations: List[str]
    image_url: str
    bio: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Course(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    title_sinhala: str
    description: str
    year: str
    type: str  # Theory, Revision, SPEEDY, etc.
    teacher_id: str
    duration: str
    schedule: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: str
    school: str
    year: str
    content: str
    rating: int = Field(..., ge=1, le=5)
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_featured: bool = False

class Announcement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    title_sinhala: str
    content: str
    content_sinhala: str
    type: str  # general, urgent, exam, class
    target_year: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class SupportMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_resolved: bool = False

class TelegramChannel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    title_sinhala: str
    description: str
    member_count: str
    features: List[str]
    link: str
    image: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class VideoLesson(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    title_sinhala: str
    description: str
    video_url: str
    thumbnail: str
    duration: str
    course_id: str
    is_published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def generate_register_number(al_year: str) -> str:
    """Generate unique register number in format SC{year}{3-digit-number}"""
    db_instance = check_db_connection()
    while True:
        number = random.randint(100, 999)
        register_number = f"SC{al_year}{number}"
        
        # Check if register number already exists
        try:
            existing_user = await db_instance.users.find_one({"register_number": register_number})
            if not existing_user:
                return register_number
        except Exception as e:
            logger.error(f"Database error while checking register number: {e}")
            raise HTTPException(status_code=500, detail="Database error. Please try again later.")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    db_instance = check_db_connection()
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
        user = await db_instance.users.find_one({"id": user_id})
        if user is None:
            raise credentials_exception
        return User(**user)
    except Exception as e:
        logger.error(f"Database error while fetching user: {e}")
        raise HTTPException(status_code=500, detail="Database error. Please try again later.")

# Authentication endpoints
@api_router.post("/auth/register", response_model=dict)
async def register_user(user_data: UserCreate):
    # Check if database is available
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection unavailable. Please contact administrator.")
    
    try:
        # Check if email already exists
        try:
            existing_email = await db.users.find_one({"email": user_data.email})
            if existing_email:
                raise HTTPException(status_code=400, detail="Email already registered")
        except Exception as e:
            logger.error(f"Database error while checking email: {e}")
            raise HTTPException(status_code=500, detail="Database error. Please try again later.")
        
        # Check if ID number already exists
        try:
            existing_id = await db.users.find_one({"id_number": user_data.id_number})
            if existing_id:
                raise HTTPException(status_code=400, detail="ID number already registered")
        except Exception as e:
            logger.error(f"Database error while checking ID: {e}")
            raise HTTPException(status_code=500, detail="Database error. Please try again later.")
        
        # Generate register number
        try:
            register_number = await generate_register_number(user_data.al_year)
        except Exception as e:
            logger.error(f"Error generating register number: {e}")
            raise HTTPException(status_code=500, detail="Error generating register number. Please try again later.")
        
        # Create user
        try:
            user = User(
                full_name=user_data.full_name,
                email=user_data.email,
                phone_number=user_data.phone_number,
                id_number=user_data.id_number,
                al_year=user_data.al_year,
                school_name=user_data.school_name,
                register_number=register_number,
                password_hash=get_password_hash(user_data.password)
            )
            
            result = await db.users.insert_one(user.dict())
            if not result.inserted_id:
                raise HTTPException(status_code=500, detail="Failed to create user. Please try again later.")
            
            logger.info(f"User registered successfully: {user.full_name} ({register_number})")
            
            return {
                "message": "User registered successfully",
                "register_number": register_number,
                "student_name": user_data.full_name
            }
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise HTTPException(status_code=500, detail="Failed to create user. Please try again later.")
            
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Log the actual error for debugging
        logger.error(f"Registration error: {str(e)}")
        # For other exceptions, return a generic error
        raise HTTPException(status_code=500, detail="Registration failed. Please try again.")

@api_router.post("/auth/login", response_model=Token)
async def login_user(user_credentials: UserLogin):
    db_instance = check_db_connection()
    user = await db_instance.users.find_one({"register_number": user_credentials.register_number})
    if not user or not verify_password(user_credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect register number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["id"]}, expires_delta=access_token_expires
    )
    
    user_response = UserResponse(**user)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_response
    }

@api_router.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserResponse(**current_user.dict())

# Teacher endpoints
@api_router.get("/teachers", response_model=List[Teacher])
async def get_teachers():
    db_instance = check_db_connection()
    teachers = await db_instance.teachers.find().to_list(100)
    return [Teacher(**teacher) for teacher in teachers]

@api_router.get("/teachers/{teacher_id}", response_model=Teacher)
async def get_teacher(teacher_id: str):
    db_instance = check_db_connection()
    teacher = await db_instance.teachers.find_one({"id": teacher_id})
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return Teacher(**teacher)

@api_router.post("/teachers", response_model=Teacher)
async def create_teacher(teacher: Teacher):
    db_instance = check_db_connection()
    teacher_dict = teacher.dict()
    result = await db_instance.teachers.insert_one(teacher_dict)
    if result.inserted_id:
        return Teacher(**teacher_dict)
    raise HTTPException(status_code=500, detail="Failed to create teacher")

@api_router.put("/teachers/{teacher_id}", response_model=Teacher)
async def update_teacher(teacher_id: str, teacher: Teacher):
    db_instance = check_db_connection()
    result = await db_instance.teachers.update_one(
        {"id": teacher_id},
        {"$set": teacher.dict(exclude_unset=True)}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    updated_teacher = await db_instance.teachers.find_one({"id": teacher_id})
    if updated_teacher:
        return Teacher(**updated_teacher)
    raise HTTPException(status_code=404, detail="Teacher not found after update")

@api_router.delete("/teachers/{teacher_id}", response_model=dict)
async def delete_teacher(teacher_id: str):
    db_instance = check_db_connection()
    result = await db_instance.teachers.delete_one({"id": teacher_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return {"message": "Teacher deleted successfully"}

# Course endpoints
@api_router.get("/courses", response_model=List[Course])
async def get_courses():
    db_instance = check_db_connection()
    courses = await db_instance.courses.find({"is_active": True}).to_list(100)
    return [Course(**course) for course in courses]

@api_router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    db_instance = check_db_connection()
    course = await db_instance.courses.find_one({"id": course_id})
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return Course(**course)

@api_router.post("/courses", response_model=Course)
async def create_course(course: Course):
    db_instance = check_db_connection()
    course_dict = course.dict()
    result = await db_instance.courses.insert_one(course_dict)
    if result.inserted_id:
        return Course(**course_dict)
    raise HTTPException(status_code=500, detail="Failed to create course")

@api_router.put("/courses/{course_id}", response_model=Course)
async def update_course(course_id: str, course: Course):
    db_instance = check_db_connection()
    result = await db_instance.courses.update_one(
        {"id": course_id},
        {"$set": course.dict(exclude_unset=True)}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    
    updated_course = await db_instance.courses.find_one({"id": course_id})
    if updated_course:
        return Course(**updated_course)
    raise HTTPException(status_code=404, detail="Course not found after update")

@api_router.delete("/courses/{course_id}", response_model=dict)
async def delete_course(course_id: str):
    db_instance = check_db_connection()
    result = await db_instance.courses.delete_one({"id": course_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": "Course deleted successfully"}

# Testimonial endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    db_instance = check_db_connection()
    testimonials = await db_instance.testimonials.find().sort("created_at", -1).to_list(50)
    return [Testimonial(**testimonial) for testimonial in testimonials]

@api_router.get("/testimonials/featured", response_model=List[Testimonial])
async def get_featured_testimonials():
    db_instance = check_db_connection()
    testimonials = await db_instance.testimonials.find({"is_featured": True}).sort("created_at", -1).to_list(10)
    return [Testimonial(**testimonial) for testimonial in testimonials]

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: Testimonial):
    db_instance = check_db_connection()
    testimonial_dict = testimonial.dict()
    result = await db_instance.testimonials.insert_one(testimonial_dict)
    if result.inserted_id:
        return Testimonial(**testimonial_dict)
    raise HTTPException(status_code=500, detail="Failed to create testimonial")

@api_router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial: Testimonial):
    db_instance = check_db_connection()
    result = await db_instance.testimonials.update_one(
        {"id": testimonial_id},
        {"$set": testimonial.dict(exclude_unset=True)}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    updated_testimonial = await db_instance.testimonials.find_one({"id": testimonial_id})
    if updated_testimonial:
        return Testimonial(**updated_testimonial)
    raise HTTPException(status_code=404, detail="Testimonial not found after update")

@api_router.delete("/testimonials/{testimonial_id}", response_model=dict)
async def delete_testimonial(testimonial_id: str):
    db_instance = check_db_connection()
    result = await db_instance.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# Announcement endpoints
@api_router.get("/announcements", response_model=List[Announcement])
async def get_announcements():
    db_instance = check_db_connection()
    announcements = await db_instance.announcements.find({"is_active": True}).sort("created_at", -1).to_list(20)
    return [Announcement(**announcement) for announcement in announcements]

@api_router.get("/announcements/{year}")
async def get_announcements_by_year(year: str):
    db_instance = check_db_connection()
    announcements = await db_instance.announcements.find({
        "is_active": True,
        "$or": [{"target_year": year}, {"target_year": None}]
    }).sort("created_at", -1).to_list(20)
    return [Announcement(**announcement) for announcement in announcements]

@api_router.post("/announcements", response_model=Announcement)
async def create_announcement(announcement: Announcement):
    db_instance = check_db_connection()
    announcement_dict = announcement.dict()
    result = await db_instance.announcements.insert_one(announcement_dict)
    if result.inserted_id:
        return Announcement(**announcement_dict)
    raise HTTPException(status_code=500, detail="Failed to create announcement")

@api_router.put("/announcements/{announcement_id}", response_model=Announcement)
async def update_announcement(announcement_id: str, announcement: Announcement):
    db_instance = check_db_connection()
    result = await db_instance.announcements.update_one(
        {"id": announcement_id},
        {"$set": announcement.dict(exclude_unset=True)}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    updated_announcement = await db_instance.announcements.find_one({"id": announcement_id})
    if updated_announcement:
        return Announcement(**updated_announcement)
    raise HTTPException(status_code=404, detail="Announcement not found after update")

@api_router.delete("/announcements/{announcement_id}", response_model=dict)
async def delete_announcement(announcement_id: str):
    db_instance = check_db_connection()
    result = await db_instance.announcements.delete_one({"id": announcement_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return {"message": "Announcement deleted successfully"}

# Support Message endpoints
@api_router.post("/support/messages", response_model=dict)
async def create_support_message(message: SupportMessage):
    db_instance = check_db_connection()
    await db_instance.support_messages.insert_one(message.dict())
    return {"message": "Message sent successfully"}

@api_router.get("/support/messages", response_model=List[SupportMessage])
async def get_support_messages():
    db_instance = check_db_connection()
    messages = await db_instance.support_messages.find().sort("created_at", -1).to_list(100)
    return [SupportMessage(**message) for message in messages]

@api_router.put("/support/messages/{message_id}/resolve", response_model=dict)
async def resolve_support_message(message_id: str):
    db_instance = check_db_connection()
    result = await db_instance.support_messages.update_one(
        {"id": message_id},
        {"$set": {"is_resolved": True}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message marked as resolved"}

@api_router.delete("/support/messages/{message_id}", response_model=dict)
async def delete_support_message(message_id: str):
    db_instance = check_db_connection()
    result = await db_instance.support_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted successfully"}

# Telegram Channel endpoints
@api_router.get("/telegram/channels", response_model=List[TelegramChannel])
async def get_telegram_channels():
    db_instance = check_db_connection()
    channels = await db_instance.telegram_channels.find({"is_active": True}).sort("created_at", -1).to_list(100)
    return [TelegramChannel(**channel) for channel in channels]

@api_router.post("/telegram/channels", response_model=TelegramChannel)
async def create_telegram_channel(channel: TelegramChannel):
    db_instance = check_db_connection()
    await db_instance.telegram_channels.insert_one(channel.dict())
    return channel

@api_router.put("/telegram/channels/{channel_id}", response_model=TelegramChannel)
async def update_telegram_channel(channel_id: str, channel: TelegramChannel):
    db_instance = check_db_connection()
    result = await db_instance.telegram_channels.update_one(
        {"id": channel_id},
        {"$set": channel.dict(exclude_unset=True)}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Channel not found")
    
    updated_channel = await db_instance.telegram_channels.find_one({"id": channel_id})
    if updated_channel:
        return TelegramChannel(**updated_channel)
    raise HTTPException(status_code=404, detail="Channel not found after update")

@api_router.delete("/telegram/channels/{channel_id}", response_model=dict)
async def delete_telegram_channel(channel_id: str):
    db_instance = check_db_connection()
    result = await db_instance.telegram_channels.delete_one({"id": channel_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Channel not found")
    return {"message": "Channel deleted successfully"}

# Video Lesson endpoints
@api_router.get("/video-lessons", response_model=List[VideoLesson])
async def get_video_lessons():
    db_instance = check_db_connection()
    lessons = await db_instance.video_lessons.find({"is_published": True}).sort("created_at", -1).to_list(100)
    return [VideoLesson(**lesson) for lesson in lessons]

@api_router.post("/video-lessons", response_model=VideoLesson)
async def create_video_lesson(lesson: VideoLesson):
    db_instance = check_db_connection()
    lesson_dict = lesson.dict()
    result = await db_instance.video_lessons.insert_one(lesson_dict)
    if result.inserted_id:
        return VideoLesson(**lesson_dict)
    raise HTTPException(status_code=500, detail="Failed to create video lesson")

@api_router.put("/video-lessons/{lesson_id}", response_model=VideoLesson)
async def update_video_lesson(lesson_id: str, lesson: VideoLesson):
    db_instance = check_db_connection()
    result = await db_instance.video_lessons.update_one(
        {"id": lesson_id},
        {"$set": lesson.dict(exclude_unset=True)}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    updated_lesson = await db_instance.video_lessons.find_one({"id": lesson_id})
    if updated_lesson:
        return VideoLesson(**updated_lesson)
    raise HTTPException(status_code=404, detail="Lesson not found after update")

@api_router.delete("/video-lessons/{lesson_id}", response_model=dict)
async def delete_video_lesson(lesson_id: str):
    db_instance = check_db_connection()
    result = await db_instance.video_lessons.delete_one({"id": lesson_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return {"message": "Lesson deleted successfully"}

# General endpoints
@api_router.get("/")
async def root():
    return {"message": "SMARTCHEM API - නදීක වර්ණකුල Chemistry Platform"}

@api_router.get("/stats")
async def get_stats():
    db_instance = check_db_connection()
    total_students = await db_instance.users.count_documents({"is_active": True})
    total_courses = await db_instance.courses.count_documents({"is_active": True})
    total_announcements = await db_instance.announcements.count_documents({"is_active": True})
    
    return {
        "total_students": total_students,
        "total_courses": total_courses,
        "total_announcements": total_announcements,
        "platform_name": "SMARTCHEM",
        "teacher": "නදීක වර්ණකුල (NADEEKA Warnakula)"
    }

async def initialize_sample_data():
    db_instance = check_db_connection()
    # Check if data already exists
    existing_teacher = await db_instance.teachers.find_one({})
    if existing_teacher:
        return {"message": "Sample data already exists"}
    
    # Create teacher profile
    teacher = Teacher(
        name="NADEEKA Warnakula",
        name_sinhala="නදීක වර්ණකුල",
        qualifications=[
            "B.SC. ENGINEERING (HON'S) UNIVERSITY OF MORATUWA",
            "Advanced Level Chemistry Teacher",
            "Chemistry Specialist"
        ],
        experience_years=8,
        specializations=["Advanced Level Chemistry", "Organic Chemistry", "Physical Chemistry"],
        image_url="/images/teacher-main.jpg",
        bio="Experienced chemistry teacher specializing in Advanced Level chemistry education across Sri Lanka."
    )
    
    await db_instance.teachers.insert_one(teacher.dict())
    
    # Create sample courses
    courses = [
        Course(
            title="2025 Theory Classes",
            title_sinhala="2025 න්‍යාය පන්ති",
            description="Complete theory coverage for 2025 A/L Chemistry",
            year="2025",
            type="Theory",
            teacher_id=teacher.id,
            duration="1 Year",
            schedule="Weekly classes"
        ),
        Course(
            title="2025 Revision Classes",
            title_sinhala="2025 පුනරාවර්තන පන්ති",
            description="Intensive revision for 2025 A/L Chemistry",
            year="2025",
            type="Revision",
            teacher_id=teacher.id,
            duration="6 Months",
            schedule="Bi-weekly classes"
        ),
        Course(
            title="2025 SPEEDY Revision",
            title_sinhala="2025 වේගවත් පුනරාවර්තනය",
            description="Quick revision program for 2025 A/L Chemistry",
            year="2025",
            type="SPEEDY",
            teacher_id=teacher.id,
            duration="3 Months",
            schedule="Daily classes"
        )
    ]
    
    for course in courses:
        await db_instance.courses.insert_one(course.dict())
    
    # Create sample testimonials
    testimonials = [
        Testimonial(
            student_name="Saman Perera",
            school="Ananda College",
            year="2024",
            content="Best chemistry teacher in Sri Lanka! Got A grade thanks to Sir's teaching.",
            rating=5,
            is_featured=True
        ),
        Testimonial(
            student_name="Amali Silva",
            school="Visakha Vidyalaya",
            year="2024", 
            content="Sir's teaching method is excellent. Chemistry became easy with his guidance.",
            rating=5,
            is_featured=True
        )
    ]
    
    for testimonial in testimonials:
        await db_instance.testimonials.insert_one(testimonial.dict())
    
    # Create sample announcements
    announcements = [
        Announcement(
            title="Registration Open for 2025 Classes",
            title_sinhala="2025 පන්ති සඳහා ලියාපදිංචි කිරීම ආරම්භයි",
            content="Registration is now open for 2025 A/L Chemistry classes. Limited seats available.",
            content_sinhala="2025 උ.පො.ස. රසායන විද්‍යා පන්ති සඳහා ලියාපදිංචි කිරීම ආරම්භ වී ඇත. සීමිත ආසන ප්‍රමාණයක් ඇත.",
            type="general",
            target_year="2025"
        ),
        Announcement(
            title="New Telegram Channel Launch",
            title_sinhala="නව ටෙලිග්‍රාම් නාලිකාව දියත් කිරීම",
            content="Join our new Telegram channel for daily updates and study materials.",
            content_sinhala="දෛනික යාවත්කාලීන කිරීම් සහ අධ්‍යයන ද්‍රව්‍ය සඳහා අපගේ නව ටෙලිග්‍රාම් නාලිකාවට සම්බන්ධ වන්න.",
            type="general"
        )
    ]
    
    for announcement in announcements:
        await db_instance.announcements.insert_one(announcement.dict())
    
    return {"message": "Sample data initialized successfully"}

# Include router
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()

# Main entry point for production hosting
if __name__ == "__main__":
    import uvicorn
    
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', 8000))
    log_level = os.environ.get('LOG_LEVEL', 'info').lower()
    
    uvicorn.run(
        "server:app",
        host=host,
        port=port,
        log_level=log_level,
        reload=False
    )