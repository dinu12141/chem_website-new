# SMARTCHEM Admin Credentials

## Default Admin Account

After initializing the application, a default admin account will be created automatically:

- **Username**: `admin`
- **Password**: `smartchem2025`

## How Admin Authentication Works

1. **Admin Registration**: Admin accounts are created in the database with hashed passwords
2. **Admin Login**: Admins authenticate using username and password
3. **Token Generation**: Upon successful login, a JWT token is generated
4. **Session Management**: Token is stored in sessionStorage on the client side
5. **Route Protection**: Admin routes are protected and validate the token
6. **Logout**: Session is cleared when admin logs out

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens with expiration
- Token validation on protected routes
- Secure storage in sessionStorage (cleared on browser close)
- Admin-specific API endpoints

## Changing Default Credentials

### Method 1: Environment Variables
Set these environment variables before starting the application:
```bash
ADMIN_USERNAME=your_admin_username
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_secure_password
```

### Method 2: Manual Database Update
1. Connect to MongoDB
2. Update the admin document in the `admins` collection
3. Make sure to hash the password using bcrypt

## API Endpoints

### Admin Authentication
- `POST /api/auth/admin/register` - Register new admin (protected)
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/admin/me` - Get current admin info
- `POST /api/auth/admin/logout` - Admin logout

### Admin Functions
- `GET /api/admin/users` - Get all users
- `GET /api/support/messages` - Get support messages
- `POST /api/courses` - Create course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course
- And more admin-specific endpoints...

## First Login Steps

1. Navigate to `/admin/login`
2. Enter the default credentials:
   - Username: `admin`
   - Password: `smartchem2025`
3. Click "Sign In"
4. You will be redirected to the Admin Dashboard
5. **Important**: Change the default password immediately after first login

## Troubleshooting

### Login Issues
- Ensure the backend server is running
- Check that MongoDB is accessible
- Verify the default admin was created during startup
- Check browser console for any errors

### Forgot Password
Since this is a demo application, there is no password reset functionality.
To reset the password:
1. Delete the admin document from the MongoDB `admins` collection
2. Restart the backend server to recreate the default admin
3. Login with the default credentials again

### Session Issues
- If you're redirected to the login page unexpectedly, your session may have expired
- Try logging in again
- Ensure your browser is not clearing sessionStorage prematurely