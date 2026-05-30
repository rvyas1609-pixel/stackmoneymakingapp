import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const { tier, billing, chain } = await req.json();

    // In a production app, you might use a service like Coinbase Commerce API
    // or generate a unique address per transaction.
    // For this direct wallet system, we'll return the payment details.

    const basePrices: Record<string, number> = {
      starter: 29,
      pro: 79,
      elite: 149
    };

    let amount = basePrices[tier] || 0;
    if (billing === "yearly") {
      amount = Math.round(amount * 12 * 0.8);
    }

    return NextResponse.json({
      success: true,
      amount: amount,
      chain: chain,
      address: process.env[`NEXT_PUBLIC_WALLET_${chain}`] || "0x...",
    });
  } catch (error) {
    console.error("[CRYPTO_CHECKOUT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
