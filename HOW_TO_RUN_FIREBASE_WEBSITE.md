# How to Run the Firebase Website

This document explains how to run the Nadeeka Warnakula Chemistry Learning Platform with Firebase.

## Prerequisites

1. **Python 3.8+** installed
2. **Node.js 14+** installed
3. **Firebase Project** created (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions)

## Backend Setup

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Firebase Credentials

Create a `.env` file in the `backend` directory with your Firebase credentials:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# JWT Configuration
SECRET_KEY=your-super-secret-jwt-key
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# Server Configuration
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=production

# Logging
LOG_LEVEL=INFO

# Firebase Storage
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
```

### 3. Run the Backend Server

```bash
cd backend
python firebase/server_firebase.py
```

The backend will be available at http://localhost:8000

## Frontend Setup

### 1. Install Node Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Firebase Credentials

Create a `.env` file in the `frontend` directory with your Firebase web credentials:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_API_URL=http://localhost:8000/api
GENERATE_SOURCEMAP=false
REACT_APP_ENVIRONMENT=production

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 3. Run the Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will be available at http://localhost:3000

## Using the Website

### For Students

1. Visit http://localhost:3000/register to create a new account
2. Visit http://localhost:3000/login to log in
3. Access the student dashboard at http://localhost:3000/dashboard

### For Admins

1. Visit http://localhost:3000/admin/login to access the admin panel
2. Use admin credentials to log in
3. Manage courses, teachers, announcements, etc.

## API Documentation

Once the backend is running, visit http://localhost:8000/docs for interactive API documentation.

## Troubleshooting

### Common Issues

1. **Firebase Initialization Error**
   - Check that all Firebase environment variables are correctly set
   - Verify the service account key is valid
   - Ensure the Firebase project exists and is properly configured

2. **Port Already in Use**
   - Change the PORT environment variable
   - Kill the process using the port:
     ```bash
     # On Windows
     netstat -ano | findstr :8000
     taskkill /PID <pid> /F
     
     # On macOS/Linux
     lsof -i :8000
     kill -9 <pid>
     ```

3. **CORS Errors**
   - Check the CORS_ORIGINS environment variable
   - Ensure frontend and backend URLs match the configured origins

4. **Import Errors**
   - Ensure all Python dependencies are installed
   - Check that the Python path includes the backend directory

### Getting Help

If you encounter issues:
1. Check the console logs in both frontend and backend
2. Verify all environment variables are correctly configured
3. Ensure Firebase is properly set up
4. Refer to the documentation in [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

## Development

### Backend Development

The backend uses FastAPI with Firebase services. Key features:
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
- Firebase Context for state management
- Responsive design for all devices

## Deployment

For production deployment, see [DEPLOYMENT_FIREBASE.md](DEPLOYMENT_FIREBASE.md) for detailed instructions.