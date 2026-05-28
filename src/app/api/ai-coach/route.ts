import { GoogleGenerativeAI } from "@google/generative-ai";
import { getOrCreateUser } from "@/lib/user";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check subscription tier
    if (user.subscription?.tier === "free") {
      return new NextResponse("Pro subscription required", { status: 403 });
    }

    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are the STACK AI Coach, a world-class entrepreneur and AI expert.
      Your goal is to help users of the STACK app make money online using AI tools and digital leverage.
      Be direct, encouraging, and provide actionable step-by-step advice.
      Focus on playbooks like AI Content Agencies, YouTube Automation, and SaaS building.
      User Profile: Skill: ${user.primarySkill}, Goal: $${user.incomeGoal}/mo, Hours: ${user.weeklyHours}/week.`,
    });

    // Format messages for Gemini
    // Gemini expects an array of { role: 'user' | 'model', parts: [{ text: string }] }
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const latestMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessageStream(latestMessage);

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          controller.enqueue(new TextEncoder().encode(chunkText));
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error) {
    console.error("[GEMINI_COACH_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
