import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dashboard = await prisma.analyticsDashboard.findFirst({
      where: {
        date: {
          gte: today,
        },
      },
      orderBy: { date: 'desc' },
    })

    // If not found, calculate current metrics
    if (!dashboard) {
      const [totalUsers, activeUsers] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        }),
      ])

      const calculatedDashboard = {
        totalUsers,
        activeUsers,
        mrr: 0,
        churnRate: 0,
        date: new Date(),
      }

      return NextResponse.json({ data: calculatedDashboard })
    }

    return NextResponse.json({ data: dashboard })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { totalUsers, activeUsers, mrr, churnRate } = await request.json()

    const dashboard = await prisma.analyticsDashboard.create({
      data: {
        totalUsers,
        activeUsers,
        mrr,
        churnRate,
        date: new Date(),
      },
    })

    return NextResponse.json({ data: dashboard }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create dashboard' },
      { status: 500 }
    )
  }
}
