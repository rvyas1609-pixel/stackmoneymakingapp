import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')

    const prompts = await prisma.prompt.findMany({
      skip,
      take: 50,
      orderBy: { createdAt: 'desc' },
      include: { pack: true },
    })

    const total = await prisma.prompt.count()

    return NextResponse.json({
      data: prompts,
      pagination: { total, skip },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    )
  }
}
