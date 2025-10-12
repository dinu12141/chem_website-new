# Firebase Deployment Guide

This guide provides instructions for deploying the Nadeeka Warnakula Chemistry Learning Platform with Firebase.

## Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Firebase Project** created and configured
3. **Domain Name** (optional but recommended)
4. **SSL Certificate** (if using custom domain)

## Backend Deployment

### 1. Prepare Firebase Configuration

1. Create a service account key in the Firebase Console
2. Download the JSON key file
3. Set the following environment variables in your deployment environment:

```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_CERT_URL=your-cert-url
FIREBASE_STORAGE_BUCKET=your-storage-bucket
```

### 2. Deploy to Cloud Provider

#### Option A: Google Cloud Run (Recommended)

1. Build the Docker image:
   ```bash
   cd backend
   docker build -t nadeeka-warnakula-firebase .
   ```

2. Push to Google Container Registry:
   ```bash
   docker tag nadeeka-warnakula-firebase gcr.io/YOUR_PROJECT_ID/nadeeka-warnakula-firebase
   docker push gcr.io/YOUR_PROJECT_ID/nadeeka-warnakula-firebase
   ```

3. Deploy to Cloud Run:
   ```bash
   gcloud run deploy nadeeka-warnakula-firebase \
     --image gcr.io/YOUR_PROJECT_ID/nadeeka-warnakula-firebase \
     --platform managed \
     --region YOUR_REGION \
     --allow-unauthenticated \
     --set-env-vars FIREBASE_PROJECT_ID=your-project-id,FIREBASE_PRIVATE_KEY_ID=your-private-key-id,...
   ```

#### Option B: Heroku

1. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Set environment variables:
   ```bash
   heroku config:set FIREBASE_PROJECT_ID=your-project-id
   heroku config:set FIREBASE_PRIVATE_KEY_ID=your-private-key-id
   # ... set all other environment variables
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

#### Option C: AWS Elastic Beanstalk

1. Install EB CLI:
   ```bash
   pip install awsebcli
   ```

2. Initialize EB application:
   ```bash
   eb init
   ```

3. Set environment variables:
   ```bash
   eb setenv FIREBASE_PROJECT_ID=your-project-id
   eb setenv FIREBASE_PRIVATE_KEY_ID=your-private-key-id
   # ... set all other environment variables
   ```

4. Deploy:
   ```bash
   eb deploy
   ```

## Frontend Deployment

### 1. Build the Application

```bash
cd frontend
npm run build
```

### 2. Deploy to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase Hosting:
   ```bash
   firebase init hosting
   ```

4. Configure `firebase.json`:
   ```json
   {
     "hosting": {
       "public": "build",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

5. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

### 3. Alternative Deployment Options

#### Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

#### Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy
   ```

## Environment Configuration

### Backend Environment Variables

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com

# CORS Configuration
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com

# JWT Configuration
SECRET_KEY=your-super-secret-jwt-key
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# Server Configuration
HOST=0.0.0.0
PORT=8080
ENVIRONMENT=production

# Logging
LOG_LEVEL=INFO

# Firebase Storage
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
```

### Frontend Environment Variables

```env
# Backend API
REACT_APP_BACKEND_URL=https://your-backend-url.com
REACT_APP_API_URL=https://your-backend-url.com/api

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

# Environment
REACT_APP_ENVIRONMENT=production
GENERATE_SOURCEMAP=false
```

## Security Considerations

### 1. Firebase Security Rules

Update your Firestore security rules in the Firebase Console:

```javascript
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
    match /admins/{document} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
    
    match /support_messages/{document} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

### 2. Storage Security Rules

```javascript
service firebase.storage {
  match /b/{bucket}/o {
    // Public read access for uploaded content
    match /{allPaths=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```

## Monitoring and Logging

### 1. Firebase Console

Monitor your application through the Firebase Console:
- Real-time database usage
- Authentication metrics
- Storage usage
- Performance monitoring

### 2. Google Cloud Logging

Enable detailed logging for your deployed services:
- Request logs
- Error logs
- Performance metrics

### 3. Error Tracking

Implement error tracking with services like:
- Sentry
- Bugsnag
- Google Cloud Error Reporting

## Scaling Considerations

### 1. Automatic Scaling

Firebase services automatically scale based on demand:
- Firestore scales to handle millions of requests per second
- Firebase Authentication handles high-volume authentication
- Firebase Storage automatically scales with usage

### 2. Performance Optimization

- Implement pagination for large data sets
- Use Firestore indexes for complex queries
- Cache frequently accessed data
- Optimize image sizes for storage

### 3. Cost Management

Monitor usage to manage costs:
- Set up billing alerts
- Monitor Firestore reads/writes
- Track Firebase Authentication usage
- Monitor Storage usage

## Backup and Recovery

### 1. Automated Backups

Firebase automatically backs up your data:
- Daily backups of Firestore data
- Version history for documents
- Point-in-time recovery

### 2. Manual Backups

Export data using Firebase CLI:
```bash
firebase firestore:export gs://your-storage-bucket/backups/
```

### 3. Disaster Recovery

- Maintain service account keys securely
- Document environment configurations
- Regularly test deployment procedures
- Keep a rollback plan

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify service account key permissions
   - Check environment variable configuration
   - Ensure Firebase project is correctly configured

2. **Database Connection Issues**
   - Verify Firestore rules
   - Check network connectivity
   - Ensure proper authentication

3. **Storage Upload Failures**
   - Verify storage bucket permissions
   - Check file size limits
   - Ensure proper CORS configuration

### Getting Help

1. Check Firebase Console for error logs
2. Review application logs in your deployment platform
3. Consult Firebase documentation
4. Reach out to Firebase support for billing or account issues

## Maintenance

### Regular Tasks

1. **Security Updates**
   - Regularly update dependencies
   - Review and update security rules
   - Rotate service account keys periodically

2. **Performance Monitoring**
   - Monitor usage patterns
   - Optimize queries based on usage
   - Review and adjust indexes

3. **Cost Optimization**
   - Monitor billing regularly
   - Optimize data access patterns
   - Clean up unused data

### Version Updates

When updating the application:

1. Test in staging environment first
2. Backup current deployment
3. Deploy incrementally
4. Monitor for issues post-deployment

## Conclusion

The Firebase deployment provides a robust, scalable, and managed solution for the Nadeeka Warnakula Chemistry Learning Platform. By following this guide, you can successfully deploy and maintain the application with minimal operational overhead.