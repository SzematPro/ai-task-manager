#!/bin/bash

# AI Task Manager Deployment Script
# This script handles deployment to various platforms

set -e

DEPLOYMENT_TARGET=${1:-"vercel"}

echo "🚀 Deploying AI Task Manager to $DEPLOYMENT_TARGET..."

case $DEPLOYMENT_TARGET in
  "vercel")
    echo "📦 Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo "📦 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    vercel --prod
    ;;
    
  "docker")
    echo "🐳 Building Docker image..."
    docker build -t ai-task-manager .
    
    echo "🚀 Starting containers..."
    docker-compose up -d
    
    echo "✅ Application is running at http://localhost:3000"
    ;;
    
  "aws")
    echo "☁️  Deploying to AWS..."
    
    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        echo "❌ AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    # Build the application
    npm run build
    
    # Deploy using AWS Amplify or other AWS services
    echo "📦 Building for AWS deployment..."
    # Add AWS-specific deployment commands here
    ;;
    
  *)
    echo "❌ Unknown deployment target: $DEPLOYMENT_TARGET"
    echo "Available targets: vercel, docker, aws"
    exit 1
    ;;
esac

echo "✅ Deployment complete!"
