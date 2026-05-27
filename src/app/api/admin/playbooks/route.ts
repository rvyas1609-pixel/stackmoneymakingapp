import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')
    const tier = searchParams.get('tier')

    let where: any = { published: true }
    if (tier) where.tier = tier

    const playbooks = await prisma.playbook.findMany({
      where,
      skip,
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: { steps: true },
    })

    const total = await prisma.playbook.count({ where })

    return NextResponse.json({
      data: playbooks,
      pagination: { total, skip },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch playbooks' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, slug, icon, category, difficulty, range, timeCommitment, content, steps, tools, tier } = await request.json()

    const playbook = await prisma.playbook.create({
      data: {
        title,
        description,
        slug,
        icon,
        category,
        difficulty,
        range,
        timeCommitment,
        content,
        tools: tools || [],
        tier: tier || 'starter',
        published: false,
        steps: {
          create: steps || [],
        },
      },
      include: { steps: true },
    })

    return NextResponse.json({ data: playbook }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create playbook' },
      { status: 500 }
    )
  }
}
