# STACK Deployment Guide

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Tests passing
- [ ] No console errors or warnings
- [ ] API rate limiting configured
- [ ] Security headers added
- [ ] SSL certificate ready
- [ ] Backup strategy implemented

## Deployment Options

## Option 1: Vercel (Recommended for Frontend)

### Step 1: Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel auto-detects Next.js

### Step 2: Environment Variables
In Vercel Project Settings:
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=clerk_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
```

### Step 3: Deploy
```bash
git push origin main
# Vercel automatically deploys
```

## Option 2: Railway (Backend + Database)

### Step 1: Create New Project
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"

### Step 2: Add Services
- **PostgreSQL** - Database
- **Node.js** - Backend (if using separate backend)

### Step 3: Configure Environment
In Railway project variables:
```
DATABASE_URL=${{ Postgres.DATABASE_PRIVATE_URL }}
NODE_ENV=production
PORT=8080
```

### Step 4: Deploy
```bash
railway up
```

## Option 3: Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Build application
COPY . .
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:password@db:5432/stack
      NODE_ENV: production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: stack
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy Docker
```bash
docker-compose up -d
```

## Database Setup

### PostgreSQL on Railway
1. Add PostgreSQL service to Railway project
2. Railway automatically provides DATABASE_URL
3. Run migrations:
```bash
npm run prisma:migrate -- --name initial
npm run prisma:push
```

### PostgreSQL on AWS RDS
1. Create RDS instance
2. Set DATABASE_URL:
```
postgresql://user:password@instance.rds.amazonaws.com:5432/stack
```
3. Allow inbound traffic from your app

## Stripe Webhook Setup

### Get Webhook Signing Secret
1. Go to Stripe Dashboard
2. Navigate to Developers → Webhooks
3. Create new endpoint
4. Set Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
5. Select events: `customer.subscription.*`, `payment_intent.*`
6. Copy signing secret
7. Set `STRIPE_WEBHOOK_SECRET` in environment

## Monitoring Setup

### Error Tracking (Sentry)
```bash
npm install @sentry/nextjs
```

In `next.config.js`:
```javascript
const withSentryConfig = require("@sentry/nextjs/withSentryConfig");

module.exports = withSentryConfig(nextConfig, {
  org: "your-org",
  project: "stack-app",
});
```

### Analytics (PostHog)
```bash
npm install posthog-js
```

### Logging (Pino)
```bash
npm install pino pino-pretty
```

## Security Checklist

### Environment Security
- [ ] Rotate all API keys monthly
- [ ] Use strong database passwords
- [ ] Enable SSL/TLS for all connections
- [ ] Use CORS headers properly
- [ ] Implement rate limiting

### Application Security
- [ ] Enable Helmet middleware
- [ ] Add CSRF protection
- [ ] Validate all inputs
- [ ] Sanitize output
- [ ] Use Content Security Policy

### Database Security
- [ ] Regular backups (daily)
- [ ] Test restore procedures
- [ ] Use connection pooling
- [ ] Enable query logging
- [ ] Encrypt sensitive fields

### Example Security Middleware
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

## CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Performance Optimization for Production

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={false}
/>
```

### Compression
Vercel automatically compresses with Gzip/Brotli

### Caching Strategy
```typescript
// Cache static assets for 1 year
export const revalidate = 31536000;

// Cache dynamic content for 1 hour
export const revalidate = 3600;
```

### Database Query Optimization
```typescript
// Add indexes on frequently queried fields
prisma.schema:
model User {
  id String @id @default(cuid())
  email String @unique @@index([email])
  clerkId String @unique @@index([clerkId])
}
```

## Scaling Strategy

### Vertical Scaling
- Increase database compute/memory
- Upgrade Vercel to pro plan
- Use edge functions for latency

### Horizontal Scaling
- Use database read replicas
- Implement Redis caching
- Distribute uploads to CDN

### Caching Layer
```typescript
// Redis caching example
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Get or set cache
async function getCachedData(key: string) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  const fresh = await fetchData();
  await redis.setex(key, 3600, JSON.stringify(fresh));
  return fresh;
}
```

## Monitoring & Alerts

### Key Metrics to Monitor
- Page load time
- API response time
- Database query time
- Error rate
- Uptime percentage
- Memory usage
- CPU usage

### Setup Alerts
```yaml
# Example alert thresholds
- Alert if error rate > 1%
- Alert if response time > 2s
- Alert if database CPU > 80%
- Alert if disk usage > 90%
```

## Rollback Procedure

### If deployment fails:
1. Check error logs
2. Revert to previous version: `git revert HEAD`
3. Fix issue locally
4. Test thoroughly
5. Re-deploy

### Database Rollback
```bash
# If migration causes issues
npm run prisma:migrate resolve -- --rolled-back <migration-name>
npm run prisma:migrate deploy
```

## Post-Deployment

### 1. Verify
- [ ] Visit website - check no errors
- [ ] Test login flow
- [ ] Test payment flow
- [ ] Check API endpoints
- [ ] Monitor error logs

### 2. Announce
- [ ] Email users about deployment
- [ ] Post on social media
- [ ] Update status page
- [ ] Document changes

### 3. Monitor
- [ ] Watch error rates
- [ ] Monitor performance
- [ ] Check user feedback
- [ ] Review analytics

## Troubleshooting

### Issue: 502 Bad Gateway
- Check server logs
- Verify database connection
- Restart server

### Issue: Slow performance
- Check database queries
- Review Lighthouse score
- Analyze Network tab
- Check cache hit rates

### Issue: Payment failures
- Verify Stripe webhook
- Check API keys
- Review error logs
- Test with Stripe test mode

## Cost Optimization

- Use Vercel's free tier for small projects
- Use PostgreSQL free tier up to 100MB
- Optimize images to reduce bandwidth
- Use CDN for static assets
- Implement database query optimization
- Monitor third-party API costs

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://railway.app/docs
- Stripe Docs: https://stripe.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs

---

Good luck with deployment! 🚀
