import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
        preferences: true,
        communityProfile: true,
        achievements: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: user })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Get user error:', message)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { displayName, username, profileImage, primarySkill, weeklyHours, incomeGoal } = data

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(displayName && { displayName }),
        ...(username && { username }),
        ...(profileImage && { profileImage }),
        ...(primarySkill && { primarySkill }),
        ...(weeklyHours && { weeklyHours }),
        ...(incomeGoal && { incomeGoal }),
      },
      include: { subscription: true },
    })

    return NextResponse.json({ data: user })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Update user error:', message)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
