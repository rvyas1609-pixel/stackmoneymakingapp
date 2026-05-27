import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest, getUserSubscription, hasAccessToFeature } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const subscription = await getUserSubscription(userId)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        achievements: true,
        savedPrompts: { include: { prompt: true } },
        savedResources: { include: { resource: true } },
        completedModules: true,
      },
    })

    return NextResponse.json({
      data: {
        user: {
          ...user,
          subscription,
        },
        features: {
          aiChat: hasAccessToFeature(subscription?.tier || 'free', 'starter'),
          roadmaps: hasAccessToFeature(subscription?.tier || 'free', 'pro'),
          communityAccess: hasAccessToFeature(subscription?.tier || 'free', 'starter'),
          analytics: hasAccessToFeature(subscription?.tier || 'free', 'pro'),
        },
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
