import { NextResponse } from 'next/server';

// Mock data - in production, fetch from database
const PLAYBOOKS = [
  {
    id: '1',
    title: 'AI Content Agency',
    slug: 'ai-content-agency',
    description: 'Create social media content for businesses using AI tools.',
    icon: 'camera',
    category: 'content',
    difficulty: 'Beginner',
    range: '$800–2,500/mo',
    timeCommitment: '10 hrs/week',
    tier: 'starter',
    views: 1200,
    saved: 340,
  },
  {
    id: '2',
    title: 'Digital Product Seller',
    slug: 'digital-products',
    description: 'Create templates and sell them forever for passive income.',
    icon: 'package',
    category: 'products',
    difficulty: 'Beginner',
    range: '$500–5,000/mo',
    timeCommitment: '5 hrs/week',
    tier: 'starter',
    views: 980,
    saved: 280,
  },
  {
    id: '3',
    title: 'AI-Powered Freelancer',
    slug: 'ai-freelancer',
    description: 'Use AI to deliver client work 10x faster than competitors.',
    icon: 'briefcase',
    category: 'freelance',
    difficulty: 'Intermediate',
    range: '$1,000–4,000/mo',
    timeCommitment: '15 hrs/week',
    tier: 'pro',
    views: 850,
    saved: 220,
  },
  {
    id: '4',
    title: 'Paid Newsletter',
    slug: 'paid-newsletter',
    description: 'Go micro-niche and charge subscribers for exclusive content.',
    icon: 'mail',
    category: 'newsletter',
    difficulty: 'Beginner',
    range: '$500–10,000/mo',
    timeCommitment: '8 hrs/week',
    tier: 'pro',
    views: 720,
    saved: 190,
  },
  {
    id: '5',
    title: 'Paid Community',
    slug: 'paid-community',
    description: 'Build a private community around one clear outcome.',
    icon: 'users',
    category: 'community',
    difficulty: 'Intermediate',
    range: '$1,000–8,000/mo',
    timeCommitment: '12 hrs/week',
    tier: 'elite',
    views: 650,
    saved: 160,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const playbook = PLAYBOOKS.find((p) => p.slug === slug);
      if (!playbook) {
        return NextResponse.json(
          { error: 'Playbook not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ data: playbook });
    }

    return NextResponse.json({ data: PLAYBOOKS });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch playbooks' },
      { status: 500 }
    );
  }
}
