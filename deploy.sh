#!/bin/bash
# Deployment script for watcher
echo "Starting deployment..."
cd /var/www/watcher.aporto.tech || exit

# Pull latest changes from GitHub
echo "Pulling from GitHub..."
git pull origin main

# Navigate to Next.js app directory
cd my-app || exit

# Install dependencies
echo "Installing dependencies..."
npm install

# Build Next.js
echo "Building Next.js app..."
npm run build

# Restart or start application using PM2 on port 3008
echo "Restarting application..."
pm2 restart watcher-app || pm2 start npm --name "watcher-app" -- start

echo "Deployment finished successfully!"
