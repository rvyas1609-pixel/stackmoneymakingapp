import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Clear auth cookies and localStorage (done on client side)
    const response = NextResponse.json({ message: 'Logged out successfully' })
    
    // Clear cookies
    response.cookies.set('userId', '', { maxAge: 0 })
    response.cookies.set('userEmail', '', { maxAge: 0 })
    
    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}
