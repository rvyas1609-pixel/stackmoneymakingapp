import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const channel = searchParams.get('channel') || 'wins'

    const messages = await prisma.message.findMany({
      where: { channel },
      include: { user: { select: { id: true, displayName: true, profileImage: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ data: messages })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
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

    const { channel, content } = await request.json()

    if (!channel || !content) {
      return NextResponse.json(
        { error: 'Channel and content are required' },
        { status: 400 }
      )
    }

    const message = await prisma.message.create({
      data: {
        userId,
        channel,
        content,
      },
      include: { user: { select: { id: true, displayName: true, profileImage: true } } },
    })

    return NextResponse.json({ data: message }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    )
  }
}
