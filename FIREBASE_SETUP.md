# Firebase Setup Guide

This guide will help you set up Firebase for the Nadeeka Warnakula Chemistry Learning Platform.

## Prerequisites

1. A Google account
2. Node.js 14+ installed
3. Python 3.8+ installed

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter a project name (e.g., "nadeeka-warnakula")
4. Accept the terms and conditions
5. Enable Google Analytics if desired
6. Click "Create project"

## Step 2: Configure Firebase Authentication

1. In the Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Under the "Sign-in method" tab, enable:
   - Email/Password
   - Google (optional)
4. Click "Save"

## Step 3: Set up Firestore Database

1. In the Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Choose a location closest to your users
5. Click "Enable"

## Step 4: Set up Firebase Storage

1. In the Firebase Console, click "Storage" in the left sidebar
2. Click "Get started"
3. Review the security rules and click "Next"
4. Choose a location and click "Done"

## Step 5: Get Firebase Configuration

### For Web (Frontend)

1. Click the gear icon next to "Project Overview" and select "Project settings"
2. Under "Your apps", click the web icon (</>)
3. Register your app with a nickname (e.g., "nadeeka-warnakula-web")
4. Copy the Firebase configuration object

### For Admin (Backend)

1. In the "Service accounts" tab, click "Generate new private key"
2. Confirm by clicking "Generate key"
3. Save the JSON file securely - this is your service account key

## Step 6: Configure Environment Variables

### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-client-email%40your-project.iam.gserviceaccount.com

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# JWT Configuration
SECRET_KEY=smartchem_secret_key_2024_nadeeka_warnakula
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

### Frontend Configuration

Create a `.env` file in the `frontend` directory with the following variables:

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

## Step 7: Install Dependencies

### Backend

```bash
cd backend
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Step 8: Run the Application

### Start Firebase Backend Server

```bash
cd backend
python firebase/server_firebase.py
```

The backend will be available at http://localhost:8000

### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend will be available at http://localhost:3000

## Firebase Data Structure

The application uses the following Firestore collections:

- `users`: Student user profiles
- `admins`: Admin user profiles
- `teachers`: Teacher profiles
- `courses`: Course information
- `testimonials`: Student testimonials
- `announcements`: System announcements
- `support_messages`: Support messages
- `telegram_channels`: Telegram channel information
- `video_lessons`: Video lesson content

## Security Rules

For production, update your Firestore security rules in the Firebase Console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Public read access to courses, teachers, testimonials, announcements
    match /{collection}/{document} {
      allow read: if collection in ['courses', 'teachers', 'testimonials', 'announcements'];
      allow create, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Admin-only access to sensitive data
    match /{collection}/{document} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Firebase initialization error**: Check that all environment variables are correctly set
2. **Authentication failed**: Verify Firebase project settings and credentials
3. **Permission denied**: Check Firestore security rules
4. **Storage upload failed**: Verify Firebase Storage is enabled and configured

### Getting Help

If you encounter issues:
1. Check the Firebase Console for error logs
2. Verify all configuration values are correct
3. Ensure the service account key has proper permissions
4. Check the application logs for detailed error messages