# STACK Development Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your keys
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Architecture Overview

### Frontend
- **Next.js App Router** - File-based routing
- **React Server Components** - For better performance
- **Client Components** - For interactivity
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### State Management
- **Zustand** - Lightweight global state
- **React Query** - Server state management
- **Local Storage** - Persistent user preferences

### Backend
- **Next.js API Routes** - Serverless endpoints
- **Prisma ORM** - Type-safe database
- **PostgreSQL** - Main database
- **Redis** - Caching layer (optional)

### Authentication
- **Clerk** - User authentication
- **Google OAuth** - Social login
- **Discord OAuth** - Community integration

## File Structure Explained

```
src/
├── app/                     # Pages and layouts
│   ├── page.tsx            # Landing page
│   ├── layout.tsx          # Root layout
│   ├── api/                # API routes
│   ├── dashboard/          # Main app
│   ├── onboarding/         # User onboarding
│   ├── auth/               # Auth pages
│   ├── playbooks/          # Playbook pages
│   ├── prompts/            # Prompt pages
│   └── admin/              # Admin dashboard
├── components/              # Reusable components
│   ├── PlaybookCard.tsx
│   ├── PromptCard.tsx
│   └── ...
├── lib/                     # Utilities
│   ├── store.ts            # Zustand stores
│   ├── api.ts              # API client
│   ├── types.ts            # TypeScript types
│   └── db.ts               # Database utils
└── styles/                  # Global styles
    └── globals.css

prisma/
├── schema.prisma           # Database schema
└── migrations/             # Migration files
```

## Development Workflow

### 1. Creating a New Page
```typescript
// src/app/new-page/page.tsx
'use client';

export default function NewPage() {
  return (
    <div className="min-h-screen bg-bg">
      <h1 className="text-4xl text-text-primary">Page Title</h1>
    </div>
  );
}
```

### 2. Creating an API Route
```typescript
// src/app/api/endpoint/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    return NextResponse.json({ data: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
```

### 3. Using Zustand Store
```typescript
import { useAuthStore } from '@/lib/store';

export function MyComponent() {
  const { userId, setUser } = useAuthStore();

  return (
    <button onClick={() => setUser({ userId: '123' })}>
      {userId ? 'Logout' : 'Login'}
    </button>
  );
}
```

### 4. Database Operations with Prisma
```typescript
import { prisma } from '@/lib/db';

// Create
const user = await prisma.user.create({
  data: { email: 'user@example.com' },
});

// Read
const users = await prisma.user.findMany();

// Update
await prisma.user.update({
  where: { id: '1' },
  data: { email: 'newemail@example.com' },
});

// Delete
await prisma.user.delete({
  where: { id: '1' },
});
```

## Database Schema

### Key Models
- **User** - User accounts and profiles
- **Subscription** - Stripe subscription data
- **Playbook** - Money-making guides
- **Prompt** - AI prompts vault
- **Resource** - Templates and tools
- **AITool** - Tool database
- **Message** - Community messages
- **Achievement** - User achievements

## API Endpoints

### Content
- `GET /api/playbooks` - List playbooks
- `GET /api/prompts` - List prompts
- `GET /api/resources` - List resources
- `GET /api/tools` - List AI tools
- `GET /api/roadmaps` - List roadmaps

### User
- `POST /api/user/save-prompt` - Save prompt
- `POST /api/user/save-resource` - Save resource
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile

### Admin
- `GET /api/admin/analytics` - Get analytics
- `POST /api/admin/content` - Create content
- `PUT /api/admin/content/:id` - Update content

### Webhooks
- `POST /api/webhooks/stripe` - Stripe events

## Styling Guidelines

### Color Scheme
```css
--bg: #0C0C0B;              /* Main background */
--surface: #141413;          /* Surface/card background */
--card: #1C1C1A;             /* Card background */
--text-primary: #F2F0E8;    /* Main text */
--text-secondary: #8A8880;  /* Secondary text */
--text-tertiary: #3E3C3A;   /* Tertiary text */
--gold: #C8A869;             /* Accent color */
--green: #34C792;            /* Success color */
--blue: #6B9EFF;             /* Info color */
--red: #FF6B6B;              /* Error color */
```

### Common Classes
```html
<!-- Glassmorphism card -->
<div class="p-6 rounded-lg border border-border glass hover-lift">
  Content
</div>

<!-- Gradient button -->
<button class="px-6 py-2 bg-gradient-gold text-bg rounded-lg hover:opacity-90">
  Click me
</button>

<!-- Text styles -->
<h1 class="font-serif text-4xl font-bold italic">Heading</h1>
<p class="text-text-secondary">Secondary text</p>
```

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={false}
/>
```

### Code Splitting
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <div>Loading...</div>,
});
```

### Data Fetching
```typescript
// Server-side (fast, recommended)
async function getData() {
  const res = await fetch('http://localhost:3000/api/data', {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });
  return res.json();
}

// Client-side with React Query
const { data, isLoading } = useQuery({
  queryKey: ['data'],
  queryFn: () => fetch('/api/data').then(r => r.json()),
});
```

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

## Deployment

### Vercel (Frontend)
```bash
# Deploy automatically on push
git push origin main

# Or manual deployment
vercel deploy --prod
```

### Environment Variables for Production
```
NEXT_PUBLIC_APP_URL=https://stack.app
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
CLERK_SECRET_KEY=...
```

## Monitoring & Analytics

### Key Metrics
- Page load time
- Time to interactive
- Conversion rate
- User retention
- MRR (Monthly Recurring Revenue)
- Churn rate
- Customer LTV

### Tools
- Vercel Analytics
- PostHog (Product analytics)
- Sentry (Error tracking)
- Supabase Dashboard (Database)

## Common Issues & Solutions

### Issue: "Cannot find module 'xyz'"
**Solution:** Run `npm install` and ensure all dependencies are installed

### Issue: Database connection error
**Solution:** Check DATABASE_URL in .env.local and ensure PostgreSQL is running

### Issue: Clerk authentication not working
**Solution:** Verify CLERK_SECRET_KEY and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

### Issue: Styles not applying
**Solution:** Ensure Tailwind CSS is properly configured in tailwind.config.ts

## Getting Help

- **Documentation:** https://nextjs.org, https://prisma.io
- **Community:** GitHub Discussions, Discord
- **Issues:** Report on GitHub

## Next Steps

1. Set up development environment
2. Create initial API routes
3. Build database schema
4. Implement authentication
5. Create UI components
6. Connect everything
7. Deploy to production

---

Happy coding! 🚀
