#!/bin/bash
echo "Building Shambil Pride Academy Server..."

# Navigate to server directory
cd server

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build TypeScript
echo "Building TypeScript..."
npm run build

echo "Build complete!"