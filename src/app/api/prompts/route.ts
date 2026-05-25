import { NextResponse } from 'next/server';

// Mock prompt data
const PROMPTS = [
  {
    id: '1',
    title: 'Side Hustle Finder',
    content: 'I have [skill], [X hrs/week] available, and want to make [$X/month]. Give me 3 specific side hustles with exact first steps.',
    category: 'income',
    tags: ['income', 'business', 'entrepreneurship'],
    useCount: 340,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Cold DM that Converts',
    content: 'Write me a cold DM to [type of business] offering [my service]. Make it hyper-specific to their pain point, max 4 lines.',
    category: 'copywriting',
    tags: ['sales', 'outreach', 'copywriting'],
    useCount: 820,
    rating: 4.9,
  },
  {
    id: '3',
    title: 'TikTok Hook Factory',
    content: 'Give me 10 TikTok opening hooks for content about [topic]. Use different emotional triggers: curiosity, FOMO, controversy, and aspiration.',
    category: 'video',
    tags: ['social', 'tiktok', 'content'],
    useCount: 1200,
    rating: 4.7,
  },
  {
    id: '4',
    title: 'Pricing Strategy',
    content: 'I offer [service] and currently charge [price]. Analyze whether I\'m undercharging. Give me a justified new price with reasoning.',
    category: 'business',
    tags: ['pricing', 'business', 'monetization'],
    useCount: 560,
    rating: 4.8,
  },
  {
    id: '5',
    title: 'Budget Optimizer',
    content: 'My monthly income is [X] and expenses are: [list]. Find where I\'m leaking money and give me a plan to free up [Y] more per month.',
    category: 'money',
    tags: ['finance', 'budgeting', 'saving'],
    useCount: 420,
    rating: 4.6,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (category) {
      const filtered = PROMPTS.filter((p) => p.category === category);
      return NextResponse.json({ data: filtered });
    }

    return NextResponse.json({ data: PROMPTS });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}
