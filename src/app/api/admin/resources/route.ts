import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')

    const resources = await prisma.resource.findMany({
      skip,
      take: 50,
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.resource.count()

    return NextResponse.json({
      data: resources,
      pagination: { total, skip },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}
