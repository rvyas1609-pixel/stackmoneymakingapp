import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventType = searchParams.get('eventType')
    const startDate = searchParams.get('startDate')

    let where: any = {}
    if (eventType) where.eventType = eventType
    if (startDate) {
      where.createdAt = {
        gte: new Date(startDate),
      }
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 1000,
    })

    return NextResponse.json({ data: events })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, eventType, metadata } = await request.json()

    const event = await prisma.event.create({
      data: {
        userId,
        eventType,
        metadata: metadata || {},
      },
    })

    return NextResponse.json({ data: event }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
