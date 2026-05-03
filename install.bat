@echo off
echo =============================================
echo  Restaurant App - Installing Dependencies
echo =============================================

echo.
echo [1/2] Installing Backend dependencies...
cd backend
call npm install
cd ..

echo.
echo [2/2] Installing Frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo =============================================
echo  Installation Complete!
echo =============================================
echo.
echo  To start the app:
echo  1. Terminal 1: cd backend  ^&^& npm start
echo  2. Terminal 2: cd frontend ^&^& npm start
echo.
echo  Make sure MongoDB is running first!
echo =============================================
pause
