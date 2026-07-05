@echo off
echo ===============================
echo Starting Custom E-Commerce App
echo ===============================

:: Go to this folder
cd /d "%~dp0"

:: Show IP address
echo.
echo Your network details (look for IPv4 Address):
ipconfig

echo.
echo Opening browser at http://localhost:3000
echo.

:: Start server
start cmd /k "npm start"

:: Wait a bit and open browser
