import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const users = await prisma.user.findMany({
      where: {
        communityProfile: {
          publicProfile: true,
        },
      },
      select: {
        id: true,
        displayName: true,
        profileImage: true,
        xp: true,
        communityProfile: true,
      },
      orderBy: { xp: 'desc' },
      take: limit,
      skip: offset,
    })

    const totalCount = await prisma.user.count({
      where: {
        communityProfile: {
          publicProfile: true,
        },
      },
    })

    return NextResponse.json({
      data: users,
      pagination: {
        total: totalCount,
        limit,
        offset,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
