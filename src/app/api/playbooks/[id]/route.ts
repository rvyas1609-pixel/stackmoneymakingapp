import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const playbook = await prisma.playbook.findUnique({
      where: { id: params.id },
      include: { steps: true },
    })

    if (!playbook || !playbook.published) {
      return NextResponse.json(
        { error: 'Playbook not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: playbook })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch playbook' },
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
    const { title, description, published, tier } = data

    const playbook = await prisma.playbook.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(published !== undefined && { published }),
        ...(tier && { tier }),
      },
      include: { steps: true },
    })

    return NextResponse.json({ data: playbook })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update playbook' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.playbook.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Playbook deleted' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete playbook' },
      { status: 500 }
    )
  }
}
