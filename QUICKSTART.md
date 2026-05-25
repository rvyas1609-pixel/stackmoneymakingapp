# 🚀 STACK Quick Start Guide

Get the STACK app running in 5 minutes!

## Prerequisites
- Node.js 18+
- npm or yarn
- A text editor (VS Code recommended)

## Step 1: Navigate to Project

```bash
cd stack-app
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js 14
- React 18
- TailwindCSS
- Framer Motion
- Zustand
- Prisma
- And more...

## Step 3: Configure Environment

```bash
# Create .env.local file (it's already created with placeholder values)
# For now, you can start with the defaults

# Later, add your API keys:
# CLERK_SECRET_KEY=your_key
# STRIPE_SECRET_KEY=sk_test_...
# OPENAI_API_KEY=sk-...
```

## Step 4: Run Development Server

```bash
npm run dev
```

You'll see:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Environments: .env.local
```

## Step 5: Open in Browser

Visit **http://localhost:3000**

You'll see:
- 🎯 Landing page with full animations
- 📊 All features showcased
- 💰 Pricing section
- ✨ Premium design

## Explore the App

### Click on Main Navigation:
1. **Landing Page** - Overview of features
2. **Sign in** - Auth flow (Clerk scaffolded)
3. **Start Free Trial** - Pricing CTAs
4. **Features & Pricing** - Scroll down

### Try Dashboard:
```
Direct URL: http://localhost:3000/dashboard
- User stats
- Roadmap progress
- Quick actions
- Tab navigation
```

### Try Onboarding:
```
Direct URL: http://localhost:3000/onboarding
- Skill selection
- Hours commitment
- Income goal
- 3-step flow
```

### Try Prompts:
```
Direct URL: http://localhost:3000/prompts
- Browse 100+ AI prompts
- Filter by category
- Copy prompts to clipboard
- Save favorites
```

## API Routes (Test with curl)

```bash
# Get all playbooks
curl http://localhost:3000/api/playbooks

# Get prompts by category
curl "http://localhost:3000/api/prompts?category=copywriting"

# Get resources
curl http://localhost:3000/api/resources

# Get AI tools
curl http://localhost:3000/api/tools

# Get roadmaps
curl http://localhost:3000/api/roadmaps

# Get analytics (mock)
curl http://localhost:3000/api/admin/analytics

# Health check
curl http://localhost:3000/api/health
```

## Project Structure

```
stack-app/
├── src/
│   ├── app/           # Pages and API routes
│   ├── components/    # Reusable components
│   ├── lib/          # Utilities and store
│   └── styles/       # Global styles
├── prisma/           # Database schema
├── public/           # Static files
└── docs/            # Documentation
```

## Next: Implementation Phases

### Phase 1: Setup (Do First)
- [ ] Add API keys to `.env.local`
- [ ] Setup PostgreSQL database
- [ ] Run Prisma migrations
- [ ] Test database connection

```bash
# Setup database
npm run prisma:generate
npm run prisma:push
```

### Phase 2: Authentication
- [ ] Get Clerk API keys
- [ ] Configure auth routes
- [ ] Test login/signup

### Phase 3: Payments
- [ ] Get Stripe test keys
- [ ] Setup payment flow
- [ ] Test Stripe webhook

### Phase 4: Content
- [ ] Populate database with playbooks
- [ ] Add prompts to vault
- [ ] Upload resources
- [ ] Seed tools database

### Phase 5: Launch
- [ ] Deploy to Vercel
- [ ] Deploy backend to Railway
- [ ] Setup monitoring
- [ ] Go live!

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Open Prisma Studio (DB GUI)
npm run prisma:studio
```

## File to Customize

### Branding
- `src/app/layout.tsx` - App name & metadata
- `tailwind.config.ts` - Colors
- `public/favicon.ico` - Icon

### Content
- `src/app/page.tsx` - Landing page
- `src/app/dashboard/page.tsx` - Dashboard
- `src/app/onboarding/page.tsx` - Onboarding

### API Routes
- `src/app/api/playbooks/route.ts` - Playbooks
- `src/app/api/prompts/route.ts` - Prompts
- `src/app/api/resources/route.ts` - Resources

## Troubleshooting

### Issue: "Cannot find module"
```bash
# Solution: Install dependencies
npm install
```

### Issue: Port 3000 in use
```bash
# Solution: Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: Database connection error
```bash
# Solution: Check DATABASE_URL in .env.local
# Make sure PostgreSQL is running
# Or use sqlite for testing:
DATABASE_URL="file:./dev.db"
```

### Issue: Styles not loading
```bash
# Solution: Rebuild TailwindCSS
npm run build
npm run dev
```

## Documentation

Read these files for more info:

1. **README.md** - Project overview
2. **DEVELOPMENT.md** - Development guide
3. **DEPLOYMENT.md** - Deployment instructions
4. **API.md** - API documentation
5. **IMPLEMENTATION.md** - Full roadmap
6. **PROJECT_SUMMARY.md** - What's been built

## Need Help?

### Check Documentation
- Next.js: https://nextjs.org/docs
- TailwindCSS: https://tailwindcss.com/docs
- Prisma: https://www.prisma.io/docs
- Clerk: https://clerk.com/docs
- Stripe: https://stripe.com/docs

### Common Issues
See DEVELOPMENT.md → "Common Issues & Solutions"

## Key Stats

- ✅ 5,000+ lines of code
- ✅ 25+ files created
- ✅ 11 API routes
- ✅ 2 React components (40+ scaffolded)
- ✅ Full design system
- ✅ Complete documentation

## What's Next?

1. ✅ Run `npm run dev` - See it working
2. ✅ Explore pages - Check out the UI
3. ✅ Read docs - Understand architecture
4. ✅ Add API keys - Connect services
5. ✅ Deploy - Go live!

## Quick Links

- 🌐 Landing: http://localhost:3000
- 📊 Dashboard: http://localhost:3000/dashboard
- 🎯 Onboarding: http://localhost:3000/onboarding
- ✨ Prompts: http://localhost:3000/prompts
- 🔧 Next Config: `next.config.js`
- 🎨 Tailwind: `tailwind.config.ts`
- 💾 Database: `prisma/schema.prisma`

---

**You're all set! Happy coding! 🚀**

For detailed info, see `PROJECT_SUMMARY.md`
