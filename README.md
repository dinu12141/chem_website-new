# Nadeeka Warnakula - Chemistry Learning Platform

## Prerequisites

Before running the application, you need to have:

1. **Python 3.8+** installed
2. **Node.js 14+** installed
3. **MongoDB** installed and running

## Installation

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### MongoDB Version

1. Start MongoDB

Make sure MongoDB is running:
- On Windows: `net start MongoDB`
- On macOS/Linux: `mongod`

You can verify MongoDB is running by executing:
```bash
python check_mongodb.py
```

2. Start Backend Server

```bash
cd backend
python server.py
```

The backend will be available at http://localhost:8000

3. Start Frontend Development Server

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
3. The database "nadeeka_warnakula" is accessible

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
├── README.md            # This file
└── MONGODB_INSTALLATION.md  # MongoDB setup guide
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

# Nadeeka Warnakula 🧪

**නදීක වර්ණකුල Chemistry Learning Platform**

Advanced Level Chemistry education platform by Nadeeka Warnakula for Sri Lankan students, featuring modern web technologies and professional design.

## ✨ Features

- **🎓 Student Registration System** with auto-generated register numbers (SC2024XXX format)
- **🔐 Secure Authentication** with JWT tokens
- **📱 Responsive Design** works on all devices
- **📚 Course Management** for A/L Chemistry classes
- **👨‍🏫 Teacher Profiles** with qualifications and experience
- **⭐ Student Testimonials** showcasing success stories
- **📢 Announcements** for important updates
- **💬 Support System** for student inquiries
- **📱 Telegram Integration** for community building
- **🎥 Video Lessons** for comprehensive learning
- **🎨 Modern UI/UX** with smooth animations and transitions
- **🌙 Dark Mode** for comfortable viewing
- **📊 Admin Dashboard** for content management

## 🎯 Target Audience

This platform is designed for Advanced Level Chemistry students in Sri Lanka, particularly those preparing for their A/L examinations under the Sri Lankan education system.

## 👨‍🏫 About Nadeeka Warnakula

Nadeeka Warnakula is an experienced Advanced Level Chemistry teacher in Sri Lanka with a proven track record of helping students achieve excellent results in their examinations.

## 📞 Contact

For support or inquiries, please use the contact form on the website or reach out through the provided support channels.

---
© 2024 Nadeeka Warnakula Chemistry Learning Platform. All rights reserved.
