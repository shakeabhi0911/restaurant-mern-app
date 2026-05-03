#!/bin/bash
echo "============================================="
echo " Restaurant App - Installing Dependencies"
echo "============================================="

echo ""
echo "[1/2] Installing Backend dependencies..."
cd backend && npm install && cd ..

echo ""
echo "[2/2] Installing Frontend dependencies..."
cd frontend && npm install && cd ..

echo ""
echo "============================================="
echo " Installation Complete!"
echo "============================================="
echo ""
echo " To start the app:"
echo " Terminal 1: cd backend  && npm start"
echo " Terminal 2: cd frontend && npm start"
echo ""
echo " Make sure MongoDB is running first!"
echo "============================================="
