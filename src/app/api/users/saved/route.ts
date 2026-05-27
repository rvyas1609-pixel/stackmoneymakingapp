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

    const savedPrompts = await prisma.savedPrompt.findMany({
      where: { userId },
      include: { prompt: true },
      orderBy: { createdAt: 'desc' },
    })

    const savedResources = await prisma.savedResource.findMany({
      where: { userId },
      include: { resource: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      data: {
        prompts: savedPrompts.map(sp => sp.prompt),
        resources: savedResources.map(sr => sr.resource),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch saved items' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { itemId, itemType } = await request.json()

    if (itemType === 'prompt') {
      await prisma.savedPrompt.deleteMany({
        where: {
          userId,
          promptId: itemId,
        },
      })
    } else if (itemType === 'resource') {
      await prisma.savedResource.deleteMany({
        where: {
          userId,
          resourceId: itemId,
        },
      })
    }

    return NextResponse.json({ message: 'Item removed from saved' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove saved item' },
      { status: 500 }
    )
  }
}
