@echo off
echo Starting Nadeeka Warnakula with Firebase...

echo Starting Firebase Backend Server...
cd backend
start "Firebase Backend" python firebase/server_firebase.py

timeout /t 5

echo Starting Frontend...
cd ../frontend
start "Frontend" npm start

echo.
echo Firebase version of Nadeeka Warnakula is starting up!
echo Backend will be available at http://localhost:8000
echo Frontend will be available at http://localhost:3000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause >nul