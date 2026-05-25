import { NextResponse } from 'next/server';

// Mock resources data
const RESOURCES = [
  {
    id: '1',
    title: 'Cold Email Template Pack',
    description: '20+ proven cold email templates that convert',
    category: 'email',
    type: 'notion',
    tags: ['sales', 'email', 'outreach'],
    downloads: 1200,
    saved: 340,
    tier: 'starter',
  },
  {
    id: '2',
    title: 'TikTok Content Calendar',
    description: '90-day content calendar with daily ideas',
    category: 'content',
    type: 'spreadsheet',
    tags: ['content', 'tiktok', 'planning'],
    downloads: 980,
    saved: 280,
    tier: 'pro',
  },
  {
    id: '3',
    title: 'Landing Page Templates',
    description: '5 high-converting landing page designs',
    category: 'design',
    type: 'figma',
    tags: ['sales', 'design', 'conversion'],
    downloads: 720,
    saved: 210,
    tier: 'pro',
  },
  {
    id: '4',
    title: 'Pricing Framework',
    description: 'How to price your services for maximum revenue',
    category: 'business',
    type: 'pdf',
    tags: ['pricing', 'business', 'money'],
    downloads: 650,
    saved: 180,
    tier: 'starter',
  },
  {
    id: '5',
    title: 'Client Contract Bundle',
    description: 'Legal templates for freelancers and agencies',
    category: 'legal',
    type: 'pdf',
    tags: ['legal', 'business', 'contracts'],
    downloads: 520,
    saved: 140,
    tier: 'elite',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (category) {
      const filtered = RESOURCES.filter((r) => r.category === category);
      return NextResponse.json({ data: filtered });
    }

    return NextResponse.json({ data: RESOURCES });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}
