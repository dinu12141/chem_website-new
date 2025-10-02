# SMARTCHEM - Chemistry Learning Platform

## Prerequisites

Before running the application, you need to have:

1. **Python 3.8+** installed
2. **Node.js 14+** installed
3. **MongoDB** installed and running

## Installation

### 1. Install MongoDB

Follow the instructions in [MONGODB_INSTALLATION.md](MONGODB_INSTALLATION.md) to install and set up MongoDB.

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### 1. Start MongoDB

Make sure MongoDB is running:
- On Windows: `net start MongoDB`
- On macOS/Linux: `mongod`

You can verify MongoDB is running by executing:
```bash
python check_mongodb.py
```

### 2. Start Backend Server

```bash
cd backend
python server.py
```

The backend will be available at http://localhost:8000

### 3. Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will be available at http://localhost:3000

## Common Issues and Solutions

### Registration Fails with "Registration failed" Message

This usually happens when MongoDB is not running. Check:

1. MongoDB is installed and running
2. The backend can connect to MongoDB (check backend logs)
3. The database "smartchem" is accessible

### Database Connection Issues

If you see database connection errors:

1. Verify MongoDB is running: `python check_mongodb.py`
2. Check the [.env](file:///c%3A/Users/samsung/OneDrive/Desktop/Chem%20Site/chem_website-new/backend/.env) file in the backend directory has correct MONGO_URL
3. Ensure no other application is using port 27017

## Project Structure

```
├── backend/              # FastAPI backend
│   ├── server.py         # Main application file
│   ├── .env             # Environment variables
│   └── requirements.txt  # Python dependencies
├── frontend/             # React frontend
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── package.json      # Node.js dependencies
└── README.md            # This file
```

## Development

### Backend Development

The backend uses FastAPI with MongoDB. Key features:
- User authentication (registration, login)
- Course management
- Teacher profiles
- Testimonials
- Announcements
- Support messages
- Telegram channels
- Video lessons

### Frontend Development

The frontend uses React with:
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Responsive design for all devices

## API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation.

## Support

For issues with the application:
1. Check the console logs in both frontend and backend
2. Verify all prerequisites are installed and running
3. Refer to the troubleshooting section above

# SMARTCHEM Platform 🧪

**නදීක වර්ණකුල Chemistry Learning Platform**

A comprehensive educational platform for Advanced Level Chemistry students in Sri Lanka, featuring modern web technologies and professional design.

## ✨ Features

- **🎓 Student Registration System** with auto-generated register numbers (SC2024XXX format)
- **📚 Complete Course Management** for A/L Chemistry classes
- **👨‍🏫 Teacher Profile Integration** with qualifications and experience
- **📢 Announcements System** with year-specific targeting
- **💬 Student Testimonials** showcase
- **📱 Mobile-Responsive Design** with dark theme and orange accents
- **🔐 JWT Authentication** with secure user management
- **🌐 Multi-language Support** (English & Sinhala)

## 🚀 Quick Start

### Option 1: Docker Deployment (Recommended)

```bash
# Clone and deploy in one command
git clone <repository-url>
cd smartchem-platform
./deploy.sh start
```

Access the platform:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Option 2: Manual Setup

**Backend**:
```bash
cd backend
pip3 install -r requirements.txt
python3 server.py
```

**Frontend**:
```bash
cd frontend
yarn install
yarn start
```

## 📁 Project Structure

```
smartchem-platform/
├── 🔧 backend/              # FastAPI Backend
│   ├── server.py           # Main API server
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment config
├── 🎨 frontend/             # React Frontend
│   ├── src/               # React components
│   ├── public/            # Static assets
│   └── package.json       # Node dependencies
├── 🐳 docker-compose.yml    # Container orchestration
├── 🚀 deploy.sh            # Deployment script
└── 📖 DEPLOYMENT.md        # Detailed deployment guide
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database with Motor async driver
- **JWT Authentication** - Secure token-based auth
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - Modern UI library
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management

### DevOps
- **Docker & Docker Compose** - Containerization
- **MongoDB** - Database with automatic initialization
- **Health Checks** - Service monitoring
- **Automated Deployment** - One-command setup

## 📱 Pages & Features

1. **🏠 Home** - Teacher showcase with pb.lk style design
2. **📖 Our Story** - Teacher background and qualifications
3. **📚 Classes** - Available courses and schedules
4. **⭐ Testimonials** - Student success stories
5. **📱 Telegram** - Community integration
6. **🆘 Support** - Help and contact information
7. **🔐 Login/Register** - Student authentication
8. **📊 Dashboard** - Student portal with courses and announcements
9. **📢 Announcements** - Latest updates and notices

## 🎯 Student Registration Flow

1. **Registration Form** with validation
2. **Auto-generated Register Number** (SC2025XXX format)
3. **A/L Year Selection** (2024, 2025, 2026)
4. **Success Page** displaying credentials
5. **Email Verification** (configurable)

## 🔧 Configuration

### Environment Variables

**Backend** (`.env`):
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=smartchem
SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:3000
```

**Frontend** (`.env`):
```env
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_API_URL=http://localhost:8000/api
```

## 🚀 Deployment Options

### 1. Local Development
```bash
npm run install:all
npm run start:backend    # Terminal 1
npm run start:frontend   # Terminal 2
```

### 2. Docker Compose
```bash
docker-compose up -d
```

### 3. Production Hosting
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed hosting instructions.

## 📊 API Endpoints

- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - Student login
- `GET /api/auth/me` - Current user info
- `GET /api/courses` - Available courses
- `GET /api/announcements` - Latest announcements
- `GET /api/testimonials` - Student testimonials
- `GET /api/stats` - Platform statistics

## 🔒 Security Features

- **JWT Token Authentication**
- **Password Hashing** with bcrypt
- **Input Validation** with Pydantic
- **CORS Configuration**
- **SQL Injection Protection**
- **XSS Protection**

## 📱 Mobile Responsive

- **Tailwind CSS** responsive design
- **Mobile-first** approach
- **Touch-friendly** interfaces
- **Optimized images** and assets

## 🌐 Internationalization

- **English** - Primary interface
- **Sinhala** - Teacher names, course titles, announcements
- **Unicode Support** - Proper Sinhala rendering

## 📈 Performance

- **Optimized React Build**
- **Lazy Loading** components
- **Image Optimization**
- **Database Indexing**
- **Caching Strategies**

## 🎨 Design System

- **Dark Theme** with orange accents (#f97316)
- **Professional Typography** (Inter + Noto Sans Sinhala)
- **Consistent Spacing** and layout
- **Accessible Colors** and contrast
- **Modern UI Components**

## 🧪 Testing

The platform has been thoroughly tested with:
- ✅ Student registration flow
- ✅ Authentication system
- ✅ Course enrollment
- ✅ Mobile responsiveness
- ✅ API functionality
- ✅ Database operations

## 📞 Support

For technical support or questions:
- Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide
- Review API documentation at `/docs`
- Check service logs with `./deploy.sh logs`

## 🏆 Success Metrics

The SMARTCHEM platform has achieved:
- ✅ **100% Feature Completion** - All requirements implemented
- ✅ **Professional Design** - pb.lk style homepage
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Production Ready** - Docker containerization
- ✅ **Secure Authentication** - JWT with proper validation
- ✅ **Database Integration** - MongoDB with sample data
- ✅ **Automated Deployment** - One-command setup

## 🎉 Ready for Hosting!

The SMARTCHEM platform is now **100% ready for hosting** with:

- 🐳 **Docker containerization** for easy deployment
- 🚀 **Automated deployment scripts** for one-command setup
- 📝 **Comprehensive documentation** for hosting providers
- 🔧 **Production configuration** with environment variables
- 🗄️ **Database initialization** with sample data
- 📊 **Health checks** and monitoring
- 🔒 **Security best practices** implemented

**Deploy now with**: `./deploy.sh start`

---

**Built with ❤️ for Sri Lankan A/L Chemistry students**
