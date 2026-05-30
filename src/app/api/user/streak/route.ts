import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { checkAndUpdateStreak } from "@/lib/streak";

export async function POST() {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const result = await checkAndUpdateStreak(user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[STREAK_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
