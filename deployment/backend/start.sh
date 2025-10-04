#!/bin/bash

# Nadeeka Warnakula Backend Startup Script
echo "Starting Nadeeka Warnakula Backend Server..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Install dependencies if requirements.txt exists
if [ -f requirements.txt ]; then
    echo "Installing Python dependencies..."
    pip3 install -r requirements.txt
fi

# Start the server
echo "Starting FastAPI server on ${HOST:-0.0.0.0}:${PORT:-8000}..."
python3 server.py