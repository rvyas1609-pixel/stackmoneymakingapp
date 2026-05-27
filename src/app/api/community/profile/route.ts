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

    const profile = await prisma.communityProfile.findUnique({
      where: { userId },
    })

    return NextResponse.json({ data: profile })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch community profile' },
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

    const { bio, website, twitter, publicProfile } = await request.json()

    const profile = await prisma.communityProfile.upsert({
      where: { userId },
      update: {
        bio,
        website,
        twitter,
        publicProfile: publicProfile !== undefined ? publicProfile : true,
      },
      create: {
        userId,
        bio,
        website,
        twitter,
        publicProfile: publicProfile !== undefined ? publicProfile : true,
      },
    })

    return NextResponse.json({ data: profile })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update community profile' },
      { status: 500 }
    )
  }
}
