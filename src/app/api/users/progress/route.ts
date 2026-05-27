import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const completedModules = await prisma.completedModule.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    })

    return NextResponse.json({ data: completedModules })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
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

    const { moduleId, moduleName } = await request.json()

    const completed = await prisma.completedModule.create({
      data: {
        userId,
        moduleId,
        moduleName,
      },
    }).catch(() => null)

    if (!completed) {
      return NextResponse.json(
        { error: 'Module already completed' },
        { status: 409 }
      )
    }

    return NextResponse.json({ data: completed }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark module as completed' },
      { status: 500 }
    )
  }
}
