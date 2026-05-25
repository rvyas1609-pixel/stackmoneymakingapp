# STACK — Gen-Z AI Money Membership App

A premium subscription-based web app helping Gen-Z users make money online using AI tools, automation, and digital leverage.

## Features

### Core Features
- 📖 **Weekly Playbooks** - New money-making methods with step-by-step guides
- ✨ **Prompt Vault** - 1,000+ AI prompts for every use case
- 🛠 **Resource Library** - Templates, scripts, and frameworks
- 🤖 **AI Tools Database** - Every tool with tutorials and income angles
- 🎯 **Personal Roadmaps** - Your path from $0 to $1K, $5K, $10K/month
- 👥 **Private Community** - Discord with 5,000+ creators
- 🏆 **Gamification** - XP, levels, achievements, leaderboards
- 🤖 **AI Mentor** - Ask anything about making money

### Monetization
- Free tier with limited access
- Starter ($19/mo) - Weekly guides + prompt access
- Pro ($49/mo) - Full vault + monthly calls
- Elite ($149/mo) - Private mastermind + mentorship

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Query** - Data fetching

### Backend
- **Next.js API Routes** - Serverless backend
- **PostgreSQL** - Database
- **Prisma** - ORM
- **Redis** - Caching

### Auth & Payments
- **Clerk** - Authentication
- **Stripe** - Subscriptions

### AI & Services
- **Claude API** - AI mentor
- **OpenAI API** - Content generation
- **Discord.js** - Community integration
- **Resend** - Emails

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- API keys for:
  - Clerk (Authentication)
  - Stripe (Payments)
  - Anthropic (Claude API)
  - OpenAI
  - Discord (Bot token)

### Installation

1. **Clone and install dependencies:**
```bash
cd stack-app
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
```

Fill in all required API keys in `.env.local`

3. **Setup database:**
```bash
# Generate Prisma client
npm run prisma:generate

# Create database tables
npm run prisma:push

# Or run migrations
npm run prisma:migrate
```

4. **Run development server:**
```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
stack-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── dashboard/            # Main app
│   │   ├── onboarding/           # Onboarding flow
│   │   ├── api/                  # API routes
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── PlaybookCard.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── store.ts              # Zustand store
│   │   ├── api.ts                # API utilities
│   │   ├── types.ts              # TypeScript types
│   │   └── ...
│   └── middleware.ts             # Auth middleware
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/
├── .env.local                    # Environment variables
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
└── package.json
```

## API Routes

### Playbooks
- `GET /api/playbooks` - List all playbooks
- `GET /api/playbooks?slug=slug-name` - Get specific playbook

### Prompts
- `GET /api/prompts` - List all prompts
- `GET /api/prompts?category=copywriting` - Filter by category

### Resources
- `GET /api/resources` - List all resources
- `GET /api/resources?category=templates` - Filter by category

### User
- `POST /api/user/save-prompt` - Save prompt
- `POST /api/user/save-resource` - Save resource
- `POST /api/user/complete-module` - Complete module

### Subscription
- `POST /api/subscription/create-session` - Create Stripe session
- `POST /api/subscription/webhook` - Stripe webhook

## Deployment

### Frontend (Vercel)
```bash
# Deploy to Vercel
vercel deploy
```

### Backend (Railway/Render)
1. Connect GitHub repository
2. Add environment variables
3. Deploy

## Features Roadmap

### Phase 1 (Now)
- ✅ Landing page
- ✅ Authentication
- ✅ Dashboard
- ✅ Playbooks

### Phase 2 (Next)
- [ ] Stripe integration
- [ ] Prompt vault
- [ ] Resource library
- [ ] AI mentor chatbot

### Phase 3
- [ ] Discord integration
- [ ] Community features
- [ ] Gamification system
- [ ] Admin dashboard

### Phase 4
- [ ] Marketplace
- [ ] Live workshops
- [ ] Affiliate system
- [ ] Mobile app

## Customization

### Branding
- Update `NEXT_PUBLIC_APP_NAME` in `.env.local`
- Modify colors in `tailwind.config.ts`
- Update metadata in `src/app/layout.tsx`

### Content
- Add playbooks to database via admin panel
- Create prompts and resources
- Upload AI tools

### Features
- Toggle subscription tiers in `stripe.config.ts`
- Customize gamification rules in `lib/gamification.ts`
- Modify email templates in `templates/`

## Performance

- **Optimized images** with Next.js Image component
- **Code splitting** by route
- **CSS-in-JS** with Tailwind
- **Database indexing** on frequently queried fields
- **Redis caching** for popular content

## SEO

- Server-side rendering
- Dynamic sitemaps
- Meta tags and Open Graph
- Structured data (JSON-LD)
- Sitemap.xml generation

## Analytics

- Track user engagement
- Monitor conversion funnel
- Measure retention
- Calculate LTV/CAC
- Dashboard at `/admin/analytics`

## Contributing

Pull requests welcome. For major changes, open an issue first.

## License

MIT

## Support

- Email: support@stack.app
- Discord: [Join Community]
- Twitter: @stackapp

## Inspiration & References

- Product design: Apple, Linear, Arc Browser
- Motion: Framer, GSAP
- Community: Discord, Slack
- Content: Netflix, MasterClass, Duolingo
- SaaS: Stripe, Notion, Figma

---

**Built for Gen-Z creators and hustlers who actually want to make money.**

Version 1.0 - May 2025
