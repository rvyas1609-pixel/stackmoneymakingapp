# STACK API Documentation

## Overview
This document describes all API endpoints available in the STACK application.

## Base URL
```
http://localhost:3000/api          # Development
https://api.stack.app              # Production
```

## Authentication
Most endpoints require Clerk authentication. Include the user's auth token in the header:
```
Authorization: Bearer <clerk_token>
```

---

## Content Endpoints

### Playbooks

#### List All Playbooks
```
GET /api/playbooks
```

**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "title": "AI Content Agency",
      "slug": "ai-content-agency",
      "description": "Create social media content for businesses",
      "difficulty": "Beginner",
      "range": "$800–2,500/mo",
      "timeCommitment": "10 hrs/week"
    }
  ]
}
```

#### Get Single Playbook
```
GET /api/playbooks?slug=ai-content-agency
```

### Prompts

#### List All Prompts
```
GET /api/prompts
```

#### Filter by Category
```
GET /api/prompts?category=copywriting
```

**Query Parameters:**
- `category` - Filter by category (copywriting, video, marketing, automation, business, money)
- `limit` - Limit results (default: 20, max: 100)
- `offset` - Pagination offset

**Categories:**
- `copywriting` - Writing and copywriting prompts
- `video` - Video content prompts
- `marketing` - Marketing and growth prompts
- `automation` - Workflow automation prompts
- `business` - Business strategy prompts
- `money` - Income and financial prompts
- `research` - Research and analysis prompts

### Resources

#### List All Resources
```
GET /api/resources
```

#### Filter by Category
```
GET /api/resources?category=templates
```

**Query Parameters:**
- `category` - Filter by category (templates, scripts, frameworks, designs, legal)
- `type` - Filter by type (notion, figma, pdf, excel, doc)
- `tier` - Filter by tier (free, starter, pro, elite)

### AI Tools

#### List All Tools
```
GET /api/tools
```

#### Filter by Category
```
GET /api/tools?category=AI
```

**Query Parameters:**
- `category` - Filter by category (AI, Automation, Design, Content, etc.)

### Roadmaps

#### List All Roadmaps
```
GET /api/roadmaps
```

#### Get Single Roadmap
```
GET /api/roadmaps?slug=zero-to-1k
```

---

## User Endpoints

### User Profile

#### Get Profile
```
GET /api/user/profile
```

**Response:**
```json
{
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "username": "username",
    "tier": "pro",
    "xp": 2450,
    "level": 3,
    "primarySkill": "content",
    "incomeGoal": 3000
  }
}
```

#### Update Profile
```
PUT /api/user/profile
Content-Type: application/json

{
  "username": "newusername",
  "primarySkill": "writing",
  "incomeGoal": 5000
}
```

### Saved Content

#### Save Prompt
```
POST /api/user/save-prompt
Content-Type: application/json

{
  "promptId": "prompt_123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "saved_123",
    "userId": "user_123",
    "promptId": "prompt_123",
    "createdAt": "2024-03-20T10:00:00Z"
  }
}
```

#### Save Resource
```
POST /api/user/save-resource
Content-Type: application/json

{
  "resourceId": "resource_123"
}
```

#### Get Saved Prompts
```
GET /api/user/saved-prompts
```

#### Get Saved Resources
```
GET /api/user/saved-resources
```

#### Remove Saved Prompt
```
DELETE /api/user/save-prompt/prompt_123
```

### Achievements

#### Get User Achievements
```
GET /api/user/achievements
```

#### Unlock Achievement
```
POST /api/user/achievements
Content-Type: application/json

{
  "achievementId": "achievement_123"
}
```

---

## Community Endpoints

### Messages

#### Get Messages
```
GET /api/community/messages?channel=wins
```

**Query Parameters:**
- `channel` - Channel to fetch from (wins, accountability, tools, questions, etc.)
- `limit` - Number of messages (default: 20)
- `offset` - Pagination offset

#### Post Message
```
POST /api/community/messages
Content-Type: application/json

{
  "channel": "wins",
  "content": "Just made my first $500!"
}
```

#### React to Message
```
POST /api/community/messages/message_123/react
Content-Type: application/json

{
  "emoji": "🔥"
}
```

---

## Admin Endpoints

### Analytics

#### Get Dashboard Analytics
```
GET /api/admin/analytics
```

**Response:**
```json
{
  "data": {
    "metrics": {
      "totalUsers": 5284,
      "activeUsers": 3421,
      "mrr": 124500,
      "churnRate": 3.2
    },
    "subscriptions": {
      "free": 2100,
      "starter": 1850,
      "pro": 1000,
      "elite": 334
    }
  }
}
```

### Content Management

#### Create Playbook
```
POST /api/admin/content/playbooks
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "title": "New Playbook",
  "description": "Description",
  "difficulty": "Beginner",
  "tier": "starter",
  "content": "Content here"
}
```

#### Update Playbook
```
PUT /api/admin/content/playbooks/playbook_123
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

#### Delete Playbook
```
DELETE /api/admin/content/playbooks/playbook_123
```

---

## Subscription Endpoints

### Create Checkout Session
```
POST /api/subscription/create-session
Content-Type: application/json

{
  "tier": "pro",
  "successUrl": "https://yourdomain.com/success",
  "cancelUrl": "https://yourdomain.com/billing"
}
```

**Response:**
```json
{
  "data": {
    "sessionId": "cs_test_123",
    "url": "https://checkout.stripe.com/..."
  }
}
```

### Get Subscription
```
GET /api/subscription/current
```

### Cancel Subscription
```
POST /api/subscription/cancel
```

### Update Subscription
```
POST /api/subscription/update
Content-Type: application/json

{
  "tier": "elite"
}
```

---

## AI Endpoints

### Chat with AI Coach
```
POST /api/ai/chat
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "How do I price my freelance services?"
    }
  ],
  "system": "You are a wealth coach..."
}
```

**Response:**
```json
{
  "data": {
    "content": "Your pricing is likely too low...",
    "model": "claude-3",
    "stop_reason": "end_turn"
  }
}
```

### Generate Content
```
POST /api/ai/generate
Content-Type: application/json

{
  "prompt": "Generate 5 TikTok hooks about...",
  "type": "social_content",
  "model": "gpt-4"
}
```

---

## Webhook Endpoints

### Stripe Webhook
```
POST /api/webhooks/stripe
```

Stripe sends events to this endpoint. Handle:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

### Discord Webhook
```
POST /api/webhooks/discord
```

---

## Error Responses

### Standard Error Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `429` - Too Many Requests (Rate Limiting)
- `500` - Server Error

### Error Examples

**Unauthorized:**
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED",
  "status": 401
}
```

**Not Found:**
```json
{
  "error": "Resource not found",
  "code": "NOT_FOUND",
  "status": 404
}
```

**Validation Error:**
```json
{
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "status": 422,
  "details": {
    "email": "Invalid email format"
  }
}
```

---

## Rate Limiting

- **Free tier:** 100 requests/hour
- **Starter tier:** 500 requests/hour
- **Pro tier:** 2,000 requests/hour
- **Elite tier:** Unlimited

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
```

---

## Authentication Examples

### Clerk Authentication
```javascript
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  const { userId } = getAuth(request);
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // User is authenticated
  return new Response('Success');
}
```

### Client-side Usage
```typescript
const response = await fetch('/api/user/profile', {
  headers: {
    'Authorization': `Bearer ${authToken}`,
  },
});
```

---

## Testing API Endpoints

### Using curl
```bash
# Get all playbooks
curl https://localhost:3000/api/playbooks

# Create new message
curl -X POST https://localhost:3000/api/community/messages \
  -H "Content-Type: application/json" \
  -d '{"channel":"wins","content":"Made $500!"}'
```

### Using Thunder Client / Postman
1. Import API collection
2. Set environment variables
3. Add auth headers
4. Test endpoints

---

## SDK / Client Library

Install npm package:
```bash
npm install stack-api-client
```

Usage:
```typescript
import { StackClient } from 'stack-api-client';

const client = new StackClient({
  baseUrl: 'https://api.stack.app',
  apiKey: 'your_api_key',
});

// Fetch playbooks
const playbooks = await client.playbooks.list();

// Save prompt
await client.user.savePrompt('prompt_123');

// Send chat message
const response = await client.ai.chat([
  { role: 'user', content: 'How do I start?' }
]);
```

---

## Changelog

### Version 1.0.0
- Initial API release
- Core endpoints for playbooks, prompts, resources
- User profile endpoints
- Subscription management
- AI chat integration
- Analytics dashboard

---

For support: api-support@stack.app
