import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { tier, transactionHash, amount, network } = await req.json();

    if (!transactionHash) {
      return new NextResponse("Transaction hash is required", { status: 400 });
    }

    // In a production app, you would verify the transaction hash on-chain here
    // For now, we'll store it for manual verification by an admin

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        paymentId: transactionHash,
        tier: tier,
        status: "pending_verification",
        paymentProvider: `manual_wallet_${network}`,
      },
      create: {
        userId: user.id,
        paymentId: transactionHash,
        tier: tier,
        status: "pending_verification",
        paymentProvider: `manual_wallet_${network}`,
      },
    });

    // Award initial XP for attempting to upgrade
    await prisma.user.update({
      where: { id: user.id },
      data: {
        xp: { increment: 100 },
      },
    });

    return NextResponse.json({ success: true, message: "Transaction submitted for verification." });
  } catch (error) {
    console.error("[CRYPTO_SUBMIT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
