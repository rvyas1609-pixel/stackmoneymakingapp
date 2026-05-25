import { NextResponse } from 'next/server';

// Mock analytics endpoint
export async function GET() {
  try {
    const analytics = {
      metrics: {
        totalUsers: 5284,
        activeUsers: 3421,
        newUsersThisMonth: 892,
        mrr: 124500,
        arr: 1494000,
        churnRate: 3.2,
        avgLTV: 450,
        avgCAC: 35,
      },
      subscriptions: {
        free: 2100,
        starter: 1850,
        pro: 1000,
        elite: 334,
      },
      features: {
        promptsSaved: 15420,
        resourcesDownloaded: 8932,
        playbooksCompleted: 3421,
        averageXP: 3240,
      },
      growth: [
        { date: '2024-01-01', users: 1200, revenue: 8400 },
        { date: '2024-01-15', users: 2150, revenue: 18900 },
        { date: '2024-02-01', users: 3100, revenue: 32500 },
        { date: '2024-02-15', users: 4200, revenue: 58200 },
        { date: '2024-03-01', users: 5284, revenue: 124500 },
      ],
    };

    return NextResponse.json({ data: analytics });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
