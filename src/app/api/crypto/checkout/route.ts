import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/user";
import axios from "axios";

const COINBASE_API_URL = "https://api.commerce.coinbase.com/charges";

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { tier, price } = await req.json();

    const response = await axios.post(
      COINBASE_API_URL,
      {
        name: `STACK ${tier.toUpperCase()} Membership`,
        description: `Premium access to STACK AI Money App - ${tier} tier`,
        pricing_type: "fixed_price",
        local_price: {
          amount: price,
          currency: "USD",
        },
        metadata: {
          userId: user.id,
          tier: tier,
        },
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?status=cancel`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CC-Api-Key": process.env.COINBASE_COMMERCE_API_KEY,
          "X-CC-Version": "2018-03-22",
        },
      }
    );

    return NextResponse.json({ url: response.data.data.hosted_url });
  } catch (error: any) {
    console.error("[CRYPTO_CHECKOUT_ERROR]", error.response?.data || error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
