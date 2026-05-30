import { GoogleGenerativeAI } from "@google/generative-ai";
import { getOrCreateUser } from "@/lib/user";
import { NextResponse } from "next/server";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const tier = user.subscription?.tier || "free";

    // AI Coach is a Pro/Elite feature
    if (tier === "free" || tier === "starter") {
      return new NextResponse("Pro membership required for AI Coach.", { status: 403 });
    }

    const body = await req.json();
    const validated = z.object({ messages: z.array(MessageSchema).min(1).max(50) }).safeParse(body);

    if (!validated.success) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    let { messages } = validated.data;

    // Context management: slice if conversation gets too large
    const totalLength = messages.reduce((acc, m) => acc + m.content.length, 0);
    if (totalLength > 40000) messages = messages.slice(-15);

    const systemPrompt = `You are the STACK AI Coach. Personality: direct, entrepreneurial, Gen-Z native.
         Focus on: Digital leverage, AI agency scaling, high-ticket sales.
         User Profile: Name: ${user.username}, Goal: $${user.incomeGoal}/mo, Skill: ${user.primarySkill || "General"}.
         Be concise and actionable.`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt
    });

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
            const chunkText = chunk.text();
            controller.enqueue(encoder.encode(chunkText));
          }
        } catch (e) {
          console.error("Stream generation error:", e);
          controller.enqueue(encoder.encode("\n[AI Connection Interrupted]"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, { headers: { "Content-Type": "text/plain" } });
  } catch (error: any) {
    console.error("[AI_COACH_ERROR]", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
