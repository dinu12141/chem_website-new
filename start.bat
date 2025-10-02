@echo off
title SMARTCHEM Application
echo ====================================================
echo            SMARTCHEM - Chemistry Learning Platform
echo ====================================================
echo.

echo Checking if Python is installed...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8 or higher
    pause
    exit /b
)

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js 14 or higher
    pause
    exit /b
)

echo Checking MongoDB connection...
python check_mongodb.py
if %errorlevel% neq 0 (
    echo.
    echo ❌ MongoDB is not running!
    echo Please install and start MongoDB before running this application
    echo Refer to MONGODB_INSTALLATION.md for instructions
    pause
    exit /b
)

echo.
echo Starting SMARTCHEM Application...
echo.
echo Backend URL: http://localhost:8000
echo Frontend URL: http://localhost:3000
echo.
echo Press Ctrl+C to stop the application
echo.

python start_application.py

pause