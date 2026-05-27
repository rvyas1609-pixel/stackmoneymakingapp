import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { hustleId } = await request.json()

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const favorites = user.favoriteHustles || []
    if (!favorites.includes(hustleId)) {
      favorites.push(hustleId)
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { favoriteHustles: favorites },
    })

    return NextResponse.json({ data: { favoriteHustles: updated.favoriteHustles } })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save favorite' },
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

    const { hustleId } = await request.json()

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const favorites = (user.favoriteHustles || []).filter(id => id !== hustleId)

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { favoriteHustles: favorites },
    })

    return NextResponse.json({ data: { favoriteHustles: updated.favoriteHustles } })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove favorite' },
      { status: 500 }
    )
  }
}
