import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface SignUpRequest {
  name: string
  email: string
  password: string
  plan?: 'free' | 'starter' | 'pro' | 'elite'
}

export async function POST(request: NextRequest) {
  try {
    const body: SignUpRequest = await request.json()
    const { name, email, password, plan = 'free' } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    }).catch(() => null)

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      )
    }

    // Create new user with subscription
    const newUser = await prisma.user.create({
      data: {
        email,
        username: email.split('@')[0],
        displayName: name,
        clerkId: `user_${Date.now()}`,
        subscription: {
          create: {
            tier: plan,
            status: 'active',
          },
        },
      },
      include: { subscription: true },
    })

    return NextResponse.json(
      {
        message: 'Account created successfully',
        userId: newUser.id,
        email: newUser.email,
        displayName: newUser.displayName,
        subscription: newUser.subscription,
      },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Signup error:', message)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
