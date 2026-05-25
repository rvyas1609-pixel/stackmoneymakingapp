import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface SignInRequest {
  email: string
  password: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SignInRequest = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    // In production, verify password hash
    // For now, just check if user exists
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // In production, create JWT token
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')

    return NextResponse.json(
      {
        message: 'Sign in successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          plan: user.plan,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Sign in error:', message)
    return NextResponse.json(
      { error: 'Sign in failed' },
      { status: 500 }
    )
  }
}
