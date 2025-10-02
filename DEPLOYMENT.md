# SMARTCHEM Platform - Deployment Guide

## 🚀 Quick Start

The SMARTCHEM platform is now ready for hosting with complete Docker containerization and deployment scripts.

### Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git

### One-Command Deployment

```bash
./deploy.sh start
```

This will:
- Build all Docker images
- Start MongoDB, Backend, and Frontend services
- Initialize sample data
- Make the platform available at:
  - **Frontend**: http://localhost:3000
  - **Backend API**: http://localhost:8000
  - **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
smartchem/
├── backend/                 # FastAPI Backend
│   ├── server.py           # Main server file
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile         # Backend container config
│   ├── start.sh           # Backend startup script
│   ├── .env               # Backend environment variables
│   └── init-mongo.js      # MongoDB initialization
├── frontend/               # React Frontend
│   ├── src/               # React source code
│   ├── public/            # Static assets
│   ├── package.json       # Node.js dependencies
│   ├── Dockerfile         # Frontend container config
│   ├── start.sh           # Frontend startup script
│   └── .env               # Frontend environment variables
├── docker-compose.yml      # Multi-container configuration
├── deploy.sh              # Deployment automation script
└── DEPLOYMENT.md          # This file
```

## 🛠️ Manual Setup

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URL and other settings
   ```

4. **Start the backend**:
   ```bash
   python server.py
   # OR
   ./start.sh
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   yarn install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your backend URL
   ```

4. **Start the frontend**:
   ```bash
   # Development mode
   yarn start
   
   # Production mode
   yarn build && yarn serve
   # OR
   ./start.sh
   ```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

### Individual Container Deployment

**Backend**:
```bash
cd backend
docker build -t smartchem-backend .
docker run -p 8000:8000 --env-file .env smartchem-backend
```

**Frontend**:
```bash
cd frontend
docker build -t smartchem-frontend .
docker run -p 3000:3000 smartchem-frontend
```

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=smartchem

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# JWT Configuration
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=43200

# Server Configuration
HOST=0.0.0.0
PORT=8000
ENVIRONMENT=production
LOG_LEVEL=INFO
```

### Frontend Environment Variables

Create `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_API_URL=http://localhost:8000/api
GENERATE_SOURCEMAP=false
REACT_APP_ENVIRONMENT=production
```

## 🚀 Production Deployment Options

### 1. Cloud Hosting (AWS, GCP, Azure)

1. **Deploy with Docker Compose**:
   - Upload the entire project to your cloud server
   - Update environment variables with production URLs
   - Run `./deploy.sh start`

2. **Environment Configuration**:
   ```bash
   # Update backend/.env
   MONGO_URL=mongodb://your-mongo-host:27017
   CORS_ORIGINS=https://yourdomain.com
   
   # Update frontend/.env
   REACT_APP_BACKEND_URL=https://api.yourdomain.com
   ```

### 2. Heroku Deployment

**Backend (Heroku)**:
```bash
# In backend directory
heroku create smartchem-api
heroku addons:create mongolab
heroku config:set SECRET_KEY=your-secret-key
git subtree push --prefix backend heroku main
```

**Frontend (Netlify/Vercel)**:
```bash
# Build the frontend
yarn build

# Deploy build folder to Netlify/Vercel
# Set environment variables in hosting platform
```

### 3. VPS/Dedicated Server

```bash
# Clone the repository
git clone <your-repo-url>
cd smartchem

# Update production URLs in .env files
# Install Docker and Docker Compose
# Run deployment
./deploy.sh start
```

## 📊 Monitoring & Maintenance

### Health Checks

The platform includes built-in health checks:

- **Backend**: `GET /api/` - Returns API status
- **Frontend**: Accessible at root URL
- **Database**: MongoDB health check via backend

### Logging

```bash
# View all logs
./deploy.sh logs

# View specific service logs
./deploy.sh logs backend
./deploy.sh logs frontend
./deploy.sh logs mongodb
```

### Database Backup

```bash
# Create backup
./deploy.sh backup

# Backups are stored in ./backups/ directory
```

### Service Management

```bash
# Check service status
./deploy.sh status

# Restart services
./deploy.sh restart

# Stop services
./deploy.sh stop

# Clean up (removes all containers and data)
./deploy.sh clean
```

## 🔒 Security Considerations

1. **Change default secrets** in production
2. **Use HTTPS** for production deployment
3. **Configure firewall** to restrict database access
4. **Regular backups** of MongoDB data
5. **Update dependencies** regularly

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**:
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :8000
   lsof -i :27017
   ```

2. **Permission errors**:
   ```bash
   # Make scripts executable
   chmod +x deploy.sh
   chmod +x backend/start.sh
   chmod +x frontend/start.sh
   ```

3. **Database connection issues**:
   ```bash
   # Check MongoDB is running
   docker-compose ps
   # Check logs
   docker-compose logs mongodb
   ```

4. **API connection issues**:
   - Verify backend URL in frontend `.env`
   - Check CORS settings in backend
   - Ensure both services are running

### Getting Help

- Check service logs: `./deploy.sh logs`
- Verify service status: `./deploy.sh status`
- Review environment variables in `.env` files
- Ensure all ports are available

## 🎉 Success!

Your SMARTCHEM platform is now ready for hosting! The platform includes:

✅ Complete backend API with authentication  
✅ Professional React frontend  
✅ Docker containerization  
✅ Automated deployment scripts  
✅ Production-ready configuration  
✅ Health checks and monitoring  
✅ Database initialization  
✅ Comprehensive documentation  

Access your platform at:
- **Student Portal**: http://localhost:3000
- **API Documentation**: http://localhost:8000/docs
- **Admin Features**: Available through the API

## 📞 Support

For technical support or questions about deployment, please refer to the API documentation at `/docs` or check the application logs.