import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import crypto from "crypto";

// In-memory rate limiter (For production, use Redis)
const rateLimitMap = new Map<string, { attempts: number; resetTime: number }>();

const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number"),
  referralCode: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  // 1. Rate Limiting Check
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (limit && now < limit.resetTime) {
    if (limit.attempts >= 5) {
      return new NextResponse("Too many attempts. Try again in 1 hour.", { status: 429 });
    }
  }

  try {
    const body = await req.json();
    const validation = SignupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
    }

    const { name, email, password, referralCode } = validation.data;

    // 2. Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      // Increment rate limit on failure
      rateLimitMap.set(ip, {
        attempts: (limit?.attempts || 0) + 1,
        resetTime: limit?.resetTime || now + 3600000
      });
      return new NextResponse("User already exists", { status: 409 });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Handle Referral
    let referredById = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({ where: { referralCode } });
      if (referrer) referredById = referrer.id;
    }

    // 5. Create User
    const user = await prisma.user.create({
      data: {
        clerkId: `user_${crypto.randomUUID()}`,
        email,
        username: name,
        passwordHash,
        referralCode: `STACK-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
        referredById,
        subscription: {
          create: { tier: "free", status: "active" }
        }
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        referralCode: true,
        createdAt: true
      }
    });

    if (referredById) {
      // Bonus logic for the referrer
      // You can move this to an background job or award it now
      // await awardReferralBonus(referredById);
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
