import { NextResponse } from 'next/server';

const TOOLS = [
  {
    id: '1',
    name: 'Claude 3',
    slug: 'claude-3',
    description: 'Advanced AI for writing, coding, and analysis',
    pricing: 'Free + Paid',
    categories: ['AI', 'Writing', 'Coding'],
    incomeAngle: 'Use for copywriting, content creation, automation',
    rating: 4.9,
    reviews: 2340,
  },
  {
    id: '2',
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'AI image generation for designs and content',
    pricing: '$10-600/month',
    categories: ['AI', 'Design', 'Content'],
    incomeAngle: 'Create products to sell, agency service, thumbnails',
    rating: 4.8,
    reviews: 1890,
  },
  {
    id: '3',
    name: 'Zapier',
    slug: 'zapier',
    description: 'Automation between apps without coding',
    pricing: 'Free + Paid',
    categories: ['Automation', 'Workflow'],
    incomeAngle: 'Build automation for clients, sell automation templates',
    rating: 4.7,
    reviews: 3200,
  },
  {
    id: '4',
    name: 'Gumroad',
    slug: 'gumroad',
    description: 'Sell digital products easily',
    pricing: '10% commission',
    categories: ['Ecommerce', 'Sales'],
    incomeAngle: 'Sell templates, guides, courses, ebooks',
    rating: 4.6,
    reviews: 1540,
  },
  {
    id: '5',
    name: 'Beehiiv',
    slug: 'beehiiv',
    description: 'Newsletter platform with monetization',
    pricing: 'Free + Paid',
    categories: ['Content', 'Email'],
    incomeAngle: 'Build paid newsletter with high margins',
    rating: 4.8,
    reviews: 1200,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (category) {
      const filtered = TOOLS.filter((tool) =>
        tool.categories.includes(category)
      );
      return NextResponse.json({ data: filtered });
    }

    return NextResponse.json({ data: TOOLS });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}
