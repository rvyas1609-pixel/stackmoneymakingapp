import { NextResponse } from 'next/server';

// Mock roadmaps data
const ROADMAPS = [
  {
    id: '1',
    title: 'From $0 to $1K/month',
    slug: 'zero-to-1k',
    description: 'Your complete 90-day blueprint',
    duration: 90,
    difficulty: 'Beginner',
    milestones: [
      { day: 1, title: 'Setup & Niche Selection', desc: 'Choose your niche and build presence' },
      { day: 7, title: 'First Outreach', desc: 'Reach out to 10 potential clients' },
      { day: 14, title: 'First Lead', desc: 'Get your first qualified lead' },
      { day: 21, title: 'Close First Client', desc: 'Land first paying customer' },
      { day: 30, title: '$X Revenue', desc: 'Hit your first revenue milestone' },
      { day: 60, title: 'Second Client', desc: 'Add another paying client' },
      { day: 90, title: '$1K MRR', desc: 'Hit your first thousand' },
    ],
  },
  {
    id: '2',
    title: 'From $1K to $5K/month',
    slug: 'one-to-five-k',
    description: 'Scale to multiple revenue streams',
    duration: 90,
    difficulty: 'Intermediate',
    milestones: [
      { day: 1, title: 'Audit Current Income', desc: 'Document all revenue sources' },
      { day: 7, title: 'Pricing Review', desc: 'Increase rates by 20%' },
      { day: 14, title: 'Add Second Service', desc: 'Introduce complementary offering' },
      { day: 30, title: '$2K MRR', desc: 'Double your income' },
      { day: 60, title: 'Build Passive Stream', desc: 'Start selling digital products' },
      { day: 90, title: '$5K MRR', desc: 'Achieve 5x growth' },
    ],
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const roadmap = ROADMAPS.find((r) => r.slug === slug);
      if (!roadmap) {
        return NextResponse.json(
          { error: 'Roadmap not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ data: roadmap });
    }

    return NextResponse.json({ data: ROADMAPS });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch roadmaps' },
      { status: 500 }
    );
  }
}
