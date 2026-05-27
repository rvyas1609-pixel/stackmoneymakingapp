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

    const achievements = await prisma.achievement.findMany({
      where: { userId },
      orderBy: { unlockedAt: 'desc' },
    })

    return NextResponse.json({ data: achievements })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, description, icon, xpReward } = await request.json()

    const achievement = await prisma.achievement.create({
      data: {
        userId,
        title,
        description,
        icon,
        xpReward,
      },
    }).catch(() => null)

    if (!achievement) {
      return NextResponse.json(
        { error: 'Achievement already exists' },
        { status: 409 }
      )
    }

    // Award XP
    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: xpReward } },
    })

    return NextResponse.json({ data: achievement }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create achievement' },
      { status: 500 }
    )
  }
}
