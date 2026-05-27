import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const roadmap = await prisma.roadmap.findUnique({
      where: { id: params.id },
      include: { milestones: true },
    })

    if (!roadmap || !roadmap.published) {
      return NextResponse.json(
        { error: 'Roadmap not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: roadmap })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch roadmap' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { title, description, published } = data

    const roadmap = await prisma.roadmap.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(published !== undefined && { published }),
      },
      include: { milestones: true },
    })

    return NextResponse.json({ data: roadmap })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update roadmap' },
      { status: 500 }
    )
  }
}
