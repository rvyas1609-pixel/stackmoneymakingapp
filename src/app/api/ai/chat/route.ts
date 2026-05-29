import { NextResponse } from 'next/server';

// Mock AI chat endpoint
export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      );
    }

    // Mock response - in production, call Claude/OpenAI API
    const mockResponses = [
      "Here's my advice on making money online: Start with one skill, go deep, and monetize early. Don't wait for perfection.",
      'Your pricing is likely too low. Most creators undercharge by 30-50%. Raise your rates and see what happens.',
      'Build in public. Share your wins, fails, and process. It builds trust and brings opportunities naturally.',
      'The best income model is the one you actually execute. Stop overthinking and start shipping.',
      'Automation is your unfair advantage. Most creators ignore it. Learn Zapier, Make, or similar tools.',
    ];

    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    return NextResponse.json({
      data: {
        content: response,
        model: 'gemini-1.5-flash',
        stop_reason: 'end_turn',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'AI request failed' },
      { status: 500 }
    );
  }
}
