import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface SignUpRequest {
  name: string
  email: string
  password: string
  plan: 'free' | 'pro' | 'premium'
}

export async function POST(request: NextRequest) {
  try {
    const body: SignUpRequest = await request.json()
    const { name, email, password, plan } = body

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
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      )
    }

    // For now, store user data locally (in production, use Clerk or similar)
    // In a real app, you would:
    // 1. Hash the password
    // 2. Store in your database
    // 3. Send verification email
    
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          plan,
          subscription_status: plan === 'free' ? 'active' : 'pending_payment',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'Account created successfully',
        userId: newUser?.[0]?.id,
        plan,
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
