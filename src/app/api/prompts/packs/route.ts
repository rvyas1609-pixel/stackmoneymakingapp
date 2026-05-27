import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month') || new Date().getMonth() + 1
    const year = searchParams.get('year') || new Date().getFullYear()

    const packs = await prisma.promptPack.findMany({
      where: {
        month: parseInt(month as string),
        year: parseInt(year as string),
        published: true,
      },
      include: { prompts: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: packs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prompt packs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, tier, month, year, prompts } = await request.json()

    const pack = await prisma.promptPack.create({
      data: {
        title,
        description,
        tier,
        month,
        year,
        published: false,
        prompts: {
          create: prompts || [],
        },
      },
      include: { prompts: true },
    })

    return NextResponse.json({ data: pack }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create prompt pack' },
      { status: 500 }
    )
  }
}
