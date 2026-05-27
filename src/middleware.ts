import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/((?!auth).*):path*',
  ],
}

export function middleware(request: NextRequest) {
  // Get userId from various sources
  const userId = 
    request.cookies.get('userId')?.value ||
    request.headers.get('x-user-id') ||
    request.headers.get('authorization')?.replace('Bearer ', '')

  // For development, allow requests through
  if (!userId && process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // For production, require authentication for protected routes
  if (!userId && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  // Pass userId to headers for use in API routes
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', userId || '')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
