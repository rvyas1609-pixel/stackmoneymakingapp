# 📋 Supabase Setup Guide

Follow these steps to set up your database on Supabase and connect it to your app.

## Step 1: Create a Supabase Account

1. Go to https://supabase.com
2. Click **"Start your project"** or **"Sign up"**
3. Choose **Sign up with email** or use GitHub/Google
4. Enter your email and password
5. Verify your email address
6. Click the verification link in your email

## Step 2: Create a New Project

1. After logging in, click **"New Project"**
2. Fill in the project details:
   - **Name**: `stack-app` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to you
   - **Pricing**: Select **Free** tier
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to initialize

## Step 3: Get Your Database Connection String

1. In your Supabase dashboard, click **"Settings"** (gear icon, bottom left)
2. Click **"Database"**
3. Under **Connection string**, find the **URI** tab
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. **Replace `[YOUR-PASSWORD]`** with the password you created in Step 2

**Example connection string:**
```
postgresql://postgres:MyStrongPassword123@db.abcdefgh.supabase.co:5432/postgres
```

## Step 4: Update Your App's Environment

1. Open `.env.local` in your project
2. Find the line:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/stack_app"
   ```
3. Replace it with your Supabase connection string:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
   ```

**Example:**
```env
# Database
DATABASE_URL="postgresql://postgres:MyStrongPassword123@db.abcdefgh.supabase.co:5432/postgres"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
# ... rest of your env vars
```

## Step 5: Sync Your Database Schema

1. Open **PowerShell** in your project directory
2. Run this command:
   ```powershell
   npm run prisma:push
   ```
3. When prompted, type `y` and press Enter to create the database

**Expected output:**
```
✔ Databases synchronized, 23 migrations in 2.5s
```

## Step 6: Verify the Setup

1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New Query"**
3. Run this query to see all your tables:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```
4. You should see tables like: `User`, `Playbook`, `Prompt`, `Resource`, etc.

✅ **Success!** Your database is set up!

## Step 7: Test Your Connection

1. Go back to your terminal
2. Run this command:
   ```powershell
   npm run prisma:studio
   ```
3. A browser window opens showing your database GUI
4. Click on any table to verify data (initially empty, which is normal)
5. Close the browser or press `Ctrl+C` in terminal to stop

## Step 8: Restart Your Dev Server

1. If your dev server is still running, press `Ctrl+C` to stop it
2. Start it again:
   ```powershell
   npm run dev
   ```
3. Visit http://localhost:3000 to see your app

---

## 🚨 Troubleshooting

### Error: "P1001: Can't reach database server"
- **Solution**: Check your connection string is correct (copy from Supabase again)
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Verify internet connection is working

### Error: "P3014: Prisma was unable to infer a schema"
- **Solution**: This usually means the schema is already synced
- Try running: `npm run prisma:generate`
- Then: `npm run prisma:push`

### Error: "Database already exists"
- **Solution**: This is normal on second run
- Just type `y` when prompted

### Can't access Supabase dashboard
- Clear browser cache and try again
- Try a different browser
- Check if Supabase is down: https://status.supabase.com

---

## 📊 Next Steps

### Populate Your Database

Once connected, you can seed data. Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Add sample playbooks
  await prisma.playbook.create({
    data: {
      title: 'Make Money with AI',
      slug: 'make-money-ai',
      description: 'Learn to leverage AI for income',
      category: 'AI',
      difficulty: 'beginner',
      income: '$500-$5000/month',
      steps: {
        create: [
          {
            order: 1,
            title: 'Learn Prompt Engineering',
            description: 'Master AI prompt creation'
          }
        ]
      }
    }
  })
  
  console.log('✅ Database seeded!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
```

Then run:
```powershell
npx prisma db seed
```

---

## 🔐 Security Tips

1. **Never share your DATABASE_URL** - Keep it in `.env.local` (not version control)
2. **Use strong passwords** - Supabase generates strong ones automatically
3. **Add IP whitelist** (optional):
   - Settings → Database → Connection pooling
   - Add your IP address for extra security
4. **Rotate password regularly** - Settings → Database → Reset password

---

## 📚 Useful Supabase Links

- **Dashboard**: https://supabase.com/dashboard
- **Docs**: https://supabase.com/docs
- **SQL Editor**: Edit data directly in browser
- **API Docs**: Auto-generated REST API docs
- **Logs**: View database connection logs

---

## ✅ You're Done!

Your app is now connected to a **production-ready PostgreSQL database**. You can:
- Store user data
- Create complex queries
- Scale automatically (Supabase handles it)
- Use real-time features (advanced)

**Next**: Add Clerk auth keys, Stripe keys, and deploy to Vercel!
