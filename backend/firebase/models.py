from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Firebase models that mirror the existing MongoDB models

class FirebaseUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    phone_number: str
    whatsapp_number: str = ""
    id_number: str
    al_year: str
    school_name: str
    register_number: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class FirebaseAdmin(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    email: EmailStr
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class FirebaseTeacher(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    name_sinhala: str
    qualifications: List[str]
    experience_years: int
    specializations: List[str]
    image_url: str
    bio: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class FirebaseCourse(BaseModel):
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

class FirebaseTestimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: str
    school: str
    year: str
    content: str
    rating: int = Field(..., ge=1, le=5)
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_featured: bool = False

class FirebaseAnnouncement(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    title_sinhala: str
    content: str
    content_sinhala: str
    type: str  # general, urgent, exam, class
    target_year: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class FirebaseSupportMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_resolved: bool = False

class FirebaseTelegramChannel(BaseModel):
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

class FirebaseVideoLesson(BaseModel):
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