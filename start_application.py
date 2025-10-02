import subprocess
import sys
import os
import time
from check_mongodb import check_mongodb

def start_application():
    print("🚀 Starting SMARTCHEM Application")
    print("=" * 40)
    
    # Check MongoDB first
    print("1. Checking MongoDB connection...")
    if not check_mongodb():
        print("\n❌ Cannot start application without MongoDB!")
        print("Please install and start MongoDB first.")
        print("Refer to MONGODB_INSTALLATION.md for instructions.")
        return False
    
    print("\n2. Starting Backend Server...")
    try:
        # Change to backend directory
        backend_dir = os.path.join(os.getcwd(), "backend")
        if not os.path.exists(backend_dir):
            print("❌ Backend directory not found!")
            return False
            
        # Start backend server
        backend_process = subprocess.Popen(
            [sys.executable, "server.py"],
            cwd=backend_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        print("✅ Backend server started successfully!")
        print("   Backend URL: http://localhost:8000")
        
    except Exception as e:
        print(f"❌ Failed to start backend server: {e}")
        return False
    
    print("\n3. Starting Frontend Server...")
    try:
        # Change to frontend directory
        frontend_dir = os.path.join(os.getcwd(), "frontend")
        if not os.path.exists(frontend_dir):
            print("❌ Frontend directory not found!")
            return False
            
        # Start frontend server
        frontend_process = subprocess.Popen(
            ["npm", "start"],
            cwd=frontend_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        print("✅ Frontend server started successfully!")
        print("   Frontend URL: http://localhost:3000")
        
    except Exception as e:
        print(f"❌ Failed to start frontend server: {e}")
        return False
    
    print("\n" + "=" * 40)
    print("🎉 SMARTCHEM Application is now running!")
    print("   Backend: http://localhost:8000")
    print("   Frontend: http://localhost:3000")
    print("   API Docs: http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop the application")
    print("=" * 40)
    
    try:
        # Wait for processes
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping application...")
        try:
            backend_process.terminate()
            frontend_process.terminate()
            backend_process.wait(timeout=5)
            frontend_process.wait(timeout=5)
        except:
            backend_process.kill()
            frontend_process.kill()
        print("✅ Application stopped successfully!")
        return True

if __name__ == "__main__":
    start_application()