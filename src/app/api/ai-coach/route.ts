import { GoogleGenerativeAI } from "@google/generative-ai";
import { getOrCreateUser } from "@/lib/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Simple in-memory analytics
export const aiUsageStats = { totalRequests: 0 };

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    // 1. Tier Enforcement
    const tier = user.subscription?.tier || "free";
    if (tier === "free") {
      return new NextResponse("AI Coach is a Pro feature. Upgrade to unlock.", { status: 403 });
    }

    const body = await req.json();
    let { messages } = z.object({ messages: z.array(MessageSchema).min(1).max(50) }).parse(body);

    // 2. Token/Char counting & Context Slicing
    const totalChars = messages.reduce((acc, m) => acc + m.content.length, 0);
    if (totalChars > 50000) {
      messages = messages.slice(-20); // Keep conversation focused
    }

    // 3. Tier-Based System Context
    const systemInstruction = tier === "starter"
      ? "You are a basic AI Coach. Provide general productivity advice. Do NOT give specific income strategies or financial breakdowns."
      : `You are the STACK Elite Mentor. Provide hyper-specific income strategies, tool stacks, and $10K/mo blueprints.
         User: ${user.username}, Goal: $${user.incomeGoal}/mo. Use real numbers.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction
    });

    aiUsageStats.totalRequests++;

    const history = messages.slice(0, -1).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(messages[messages.length - 1].content);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(encoder.encode(chunk.text()));
          }
        } catch (e) {
          controller.enqueue(encoder.encode("⚠️ AI connection interrupted. Please try again."));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, { headers: { "Content-Type": "text/plain" } });
  } catch (error: any) {
    if (error.message?.includes("quota")) return new NextResponse("AI Quota Exceeded", { status: 429 });
    return new NextResponse("AI Coach Offline", { status: 500 });
  }
}
