# Chemistry Website Deployment Guide

## Requirements
- MongoDB (version 4.4+)
- Python 3.8+
- Node.js 14+

## Setup Instructions

### 1. Database Setup
- Install MongoDB if not already installed
- Start MongoDB service
- Database will be automatically initialized when backend starts

### 2. Backend Setup
- Navigate to the `backend` directory
- Install dependencies: `pip install -r requirements.txt`
- Start the backend server: `python server.py`
- Backend will run on http://localhost:8000

### 3. Frontend Setup
- The frontend is pre-built and ready to serve
- You can serve it using any static file server
- For testing, you can use: `npx serve -s frontend`
- Frontend will be available at http://localhost:3000

## API Documentation
- API documentation is available at http://localhost:8000/docs when the backend is running