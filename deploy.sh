#!/bin/bash

# SMARTCHEM Platform Deployment Script
set -e

echo "🚀 Starting SMARTCHEM Platform Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Parse command line arguments
COMMAND=${1:-"start"}

case $COMMAND in
    "start")
        print_status "Starting SMARTCHEM platform..."
        
        # Create environment files if they don't exist
        if [ ! -f backend/.env ]; then
            print_warning "Backend .env file not found. Creating from example..."
            cp backend/.env.example backend/.env
        fi
        
        if [ ! -f frontend/.env ]; then
            print_warning "Frontend .env file not found. Creating from example..."
            cp frontend/.env.example frontend/.env
        fi
        
        # Build and start services
        print_status "Building Docker images..."
        docker-compose build
        
        print_status "Starting services..."
        docker-compose up -d
        
        print_status "Waiting for services to be ready..."
        sleep 10
        
        # Initialize sample data
        print_status "Initializing sample data..."
        curl -X POST http://localhost:8000/api/initialize-data || print_warning "Failed to initialize sample data (service might not be ready yet)"
        
        print_success "SMARTCHEM platform is now running!"
        print_status "Frontend: http://localhost:3000"
        print_status "Backend API: http://localhost:8000"
        print_status "API Documentation: http://localhost:8000/docs"
        ;;
        
    "stop")
        print_status "Stopping SMARTCHEM platform..."
        docker-compose down
        print_success "SMARTCHEM platform stopped."
        ;;
        
    "restart")
        print_status "Restarting SMARTCHEM platform..."
        docker-compose down
        docker-compose up -d
        sleep 10
        print_success "SMARTCHEM platform restarted!"
        ;;
        
    "logs")
        SERVICE=${2:-""}
        if [ -z "$SERVICE" ]; then
            print_status "Showing logs for all services..."
            docker-compose logs -f
        else
            print_status "Showing logs for $SERVICE..."
            docker-compose logs -f $SERVICE
        fi
        ;;
        
    "status")
        print_status "Checking service status..."
        docker-compose ps
        ;;
        
    "clean")
        print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            print_status "Cleaning up..."
            docker-compose down -v --rmi all
            docker system prune -f
            print_success "Cleanup completed."
        else
            print_status "Cleanup cancelled."
        fi
        ;;
        
    "backup")
        print_status "Creating database backup..."
        BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
        mkdir -p $BACKUP_DIR
        docker-compose exec mongodb mongodump --db smartchem --out /tmp/backup
        docker cp smartchem-mongodb:/tmp/backup $BACKUP_DIR/
        print_success "Backup created in $BACKUP_DIR"
        ;;
        
    *)
        echo "Usage: $0 {start|stop|restart|logs|status|clean|backup}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the SMARTCHEM platform"
        echo "  stop    - Stop the SMARTCHEM platform"
        echo "  restart - Restart the SMARTCHEM platform"
        echo "  logs    - Show logs (optionally specify service: backend, frontend, mongodb)"
        echo "  status  - Show service status"
        echo "  clean   - Remove all containers, images, and volumes"
        echo "  backup  - Create database backup"
        echo ""
        echo "Examples:"
        echo "  $0 start"
        echo "  $0 logs backend"
        echo "  $0 status"
        exit 1
        ;;
esac