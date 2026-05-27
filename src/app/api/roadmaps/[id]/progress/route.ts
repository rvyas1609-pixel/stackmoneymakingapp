import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(request: NextRequest, _: { params: { id: string } }) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { milestoneId } = await request.json()

    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
    })

    if (!milestone) {
      return NextResponse.json(
        { error: 'Milestone not found' },
        { status: 404 }
      )
    }

    // Record completion
    await prisma.completedModule.create({
      data: {
        userId,
        moduleId: milestone.id,
        moduleName: milestone.title,
      },
    }).catch(() => null)

    return NextResponse.json({
      data: { completed: true, milestone },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark milestone complete' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const completed = await prisma.completedModule.findMany({
      where: {
        userId,
        moduleId: { startsWith: params.id },
      },
    })

    return NextResponse.json({ data: completed })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
