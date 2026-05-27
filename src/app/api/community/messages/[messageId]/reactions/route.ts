import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(request: NextRequest, { params }: { params: { messageId: string } }) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { reaction } = await request.json()

    const message = await prisma.message.findUnique({
      where: { id: params.messageId },
    })

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }

    const newReactions = [...(message.reactions || []), reaction]
    
    const updated = await prisma.message.update({
      where: { id: params.messageId },
      data: {
        reactions: newReactions,
      },
    })

    return NextResponse.json({ data: updated })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add reaction' },
      { status: 500 }
    )
  }
}
