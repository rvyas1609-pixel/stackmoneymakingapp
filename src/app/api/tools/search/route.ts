import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')
    const tier = searchParams.get('tier')

    let where: any = { published: true }
    if (tier) where.tier = tier

    const [tools, total] = await Promise.all([
      prisma.aITool.findMany({
        where,
        skip,
        take: 50,
        orderBy: { rating: 'desc' },
      }),
      prisma.aITool.count({ where }),
    ])

    return NextResponse.json({
      data: tools,
      pagination: { total, skip },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    )
  }
}
