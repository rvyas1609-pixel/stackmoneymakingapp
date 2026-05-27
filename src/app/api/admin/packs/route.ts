import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const month = parseInt(searchParams.get('month') || new Date().getMonth() + 1 + '')
    const year = parseInt(searchParams.get('year') || new Date().getFullYear() + '')

    const packs = await prisma.promptPack.findMany({
      where: {
        month,
        year,
        published: true,
      },
      include: { prompts: true },
    })

    return NextResponse.json({ data: packs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch packs' },
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

    const { month, year } = await request.json()

    const pack = await prisma.promptPack.create({
      data: {
        title: `Prompt Pack - ${month}/${year}`,
        description: `Monthly prompt collection for ${month}/${year}`,
        month,
        year,
        tier: 'free',
        published: false,
      },
    })

    return NextResponse.json({ data: pack }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create pack' },
      { status: 500 }
    )
  }
}
