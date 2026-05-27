import { NextRequest } from 'next/server'
import { prisma } from './prisma'

export async function getUserFromRequest(request: NextRequest): Promise<string | null> {
  try {
    // Try to get user ID from multiple sources
    // 1. Authorization header (Bearer token)
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7)
      // For now, we'll use a simple approach - in production use JWT verification
      const user = await prisma.user.findFirst({
        where: { id: token },
      })
      if (user) return user.id
    }

    // 2. Cookie (for browser requests)
    const cookie = request.cookies.get('userId')
    if (cookie?.value) {
      return cookie.value
    }

    // 3. X-User-ID header (for development)
    const userIdHeader = request.headers.get('x-user-id')
    if (userIdHeader) {
      return userIdHeader
    }

    return null
  } catch (error) {
    console.error('Error getting user from request:', error)
    return null
  }
}

export async function getUserSubscription(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  })
  return user?.subscription
}

export function hasAccessToFeature(tier: string, featureRequiredTier: string): boolean {
  const tierHierarchy: Record<string, number> = {
    free: 0,
    starter: 1,
    pro: 2,
    elite: 3,
  }

  const userTierLevel = tierHierarchy[tier] || 0
  const requiredTierLevel = tierHierarchy[featureRequiredTier] || 0

  return userTierLevel >= requiredTierLevel
}
