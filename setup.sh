#!/bin/bash

# STACK App Setup Script
# This script sets up the entire development environment

echo "🚀 STACK App Setup"
echo "=================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ NPM version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local 2>/dev/null || cat > .env.local << 'EOF'
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stack_app"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# AI APIs
OPENAI_API_KEY=sk-your_key
ANTHROPIC_API_KEY=sk-ant-your_key
GOOGLE_GENERATIVE_AI_KEY=your_key

# Discord
DISCORD_BOT_TOKEN=your_token
DISCORD_SERVER_ID=your_id
DISCORD_WEBHOOK_URL=your_url

# Email
RESEND_API_KEY=your_key

# App Config
NEXT_PUBLIC_APP_NAME=STACK
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
EOF
    echo "✅ .env.local created. Please fill in your API keys."
else
    echo "✅ .env.local already exists"
fi

echo ""

# Setup Prisma
echo "🔧 Setting up Prisma..."
npm run prisma:generate
if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated"
else
    echo "⚠️  Failed to generate Prisma client"
fi

echo ""

# Check if PostgreSQL is running
echo "🔍 Checking database connection..."
if npm run prisma:push > /dev/null 2>&1; then
    echo "✅ Database connection successful"
else
    echo "⚠️  Could not connect to database. Make sure PostgreSQL is running."
    echo "   Connection string: $(grep DATABASE_URL .env.local)"
fi

echo ""

# Build check
echo "🏗️  Running build check..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "⚠️  Build has errors. Run 'npm run build' to see details."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Setup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Fill in your API keys in .env.local"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "💡 Tips:"
echo "   - Check README.md for full documentation"
echo "   - Check DEVELOPMENT.md for development guide"
echo "   - Check DEPLOYMENT.md for deployment guide"
echo ""
echo "Happy coding! 🚀"
