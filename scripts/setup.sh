#!/bin/bash

# AI Task Manager Setup Script
# This script sets up the development environment for the AI Task Manager

set -e

echo "🚀 Setting up AI Task Manager..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating environment file..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local with your actual environment variables:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - OPENAI_API_KEY"
    echo ""
    echo "📖 See README.md for detailed setup instructions."
fi

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

# Run linting
echo "🧹 Running linting..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your environment variables"
echo "2. Set up your Supabase project and run the schema"
echo "3. Get your OpenAI API key"
echo "4. Run 'npm run dev' to start the development server"
echo ""
echo "📖 For detailed instructions, see README.md"
