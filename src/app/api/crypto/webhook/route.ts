import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("X-CC-Webhook-Signature");
  const webhookSecret = process.env.COINBASE_COMMERCE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse("Webhook signature or secret missing", { status: 400 });
  }

  // Verify signature
  const hash = crypto
    .createHmac("sha256", webhookSecret)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body).event;
  const { metadata, id: chargeId } = event.data;
  const userId = metadata.userId;
  const tier = metadata.tier;

  if (event.type === "charge:confirmed" || event.type === "charge:resolved") {
    // Calculate end date (30 days from now)
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30);

    await prisma.subscription.upsert({
      where: { userId: userId },
      update: {
        paymentId: chargeId,
        tier: tier,
        status: "active",
        currentPeriodEnd: currentPeriodEnd,
        paymentProvider: "coinbase",
      },
      create: {
        userId: userId,
        paymentId: chargeId,
        tier: tier,
        status: "active",
        currentPeriodEnd: currentPeriodEnd,
        paymentProvider: "coinbase",
      },
    });

    // Award bonus XP for upgrading
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: 1000 },
      },
    });
  }

  return new NextResponse("Webhook Received", { status: 200 });
}
