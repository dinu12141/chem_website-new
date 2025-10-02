# SMARTCHEM Startup Script for PowerShell

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "           SMARTCHEM - Chemistry Learning Platform" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking if Python is installed..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Python not found"
    }
    Write-Host "✅ $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.8 or higher" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "Checking if Node.js is installed..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Node.js not found"
    }
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js 14 or higher" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
try {
    python check_mongodb.py
    if ($LASTEXITCODE -ne 0) {
        throw "MongoDB not accessible"
    }
    Write-Host "✅ MongoDB is running and accessible!" -ForegroundColor Green
} catch {
    Write-Host "❌ MongoDB is not running!" -ForegroundColor Red
    Write-Host "Please install and start MongoDB before running this application" -ForegroundColor Red
    Write-Host "Refer to MONGODB_INSTALLATION.md for instructions" -ForegroundColor Red
    pause
    exit 1
}

Write-Host ""
Write-Host "Starting SMARTCHEM Application..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Backend URL: http://localhost:8000" -ForegroundColor Green
Write-Host "Frontend URL: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Yellow
Write-Host ""

python start_application.py

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")