import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
})

const PLANS = {
  free: { name: 'Free', price: 0, features: ['Basic playbooks', '10 prompts/month'] },
  starter: { name: 'Starter', price: 29, features: ['All playbooks', 'Unlimited prompts', 'Resources'] },
  pro: { name: 'Pro', price: 79, features: ['Starter + Roadmaps', 'AI Chat', 'Community access'] },
  elite: { name: 'Elite', price: 199, features: ['Pro + Priority support', 'Custom roadmaps', 'Monthly calls'] },
}

export async function GET() {
  try {
    return NextResponse.json({ data: PLANS })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromRequest(request)
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { planId, email } = await request.json()

    if (!planId || !email) {
      return NextResponse.json(
        { error: 'Missing planId or email' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // If upgrading from free
    if (!user.subscription?.stripeId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { userId },
      })

      await prisma.subscription.update({
        where: { id: user.subscription!.id },
        data: {
          customerId: customer.id,
          tier: planId,
          status: 'active',
        },
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: user.subscription?.customerId || undefined,
      customer_email: !user.subscription?.customerId ? email : undefined,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `STACK ${PLANS[planId as keyof typeof PLANS]?.name || 'Plan'}`,
              description: 'Monthly subscription',
            },
            unit_amount: (PLANS[planId as keyof typeof PLANS]?.price || 0) * 100,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pricing`,
    })

    return NextResponse.json({
      data: {
        sessionId: session.id,
        url: session.url,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Checkout error:', message)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
