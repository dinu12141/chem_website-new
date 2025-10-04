#!/bin/bash

# Nadeeka Warnakula Frontend Startup Script
echo "Starting Nadeeka Warnakula Frontend Application..."

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    yarn install
fi

# Build for production if BUILD_MODE is production
if [ "$BUILD_MODE" = "production" ]; then
    echo "Building React application for production..."
    yarn build
    
    # Serve the built application
    if command -v serve &> /dev/null; then
        echo "Starting production server with serve..."
        npx serve -s build -l 3000
    else
        echo "Installing serve package..."
        npm install -g serve
        npx serve -s build -l 3000
    fi
else
    echo "Starting React development server..."
    yarn start
fi