'use client'

import Link from 'next/link'
import { useState } from 'react'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect to get started',
    features: [
      'Basic playbooks',
      '10 prompts/month',
      'Community access',
      'Email support',
    ],
    cta: 'Get Started',
    href: '/auth/sign-up?plan=free',
  },
  {
    name: 'Starter',
    price: '$29',
    description: 'For serious learners',
    features: [
      'All playbooks',
      'Unlimited prompts',
      'Resources library',
      'Roadmaps',
      'Discord community',
      'Email support',
    ],
    cta: 'Start Free Trial',
    href: '/auth/sign-up?plan=starter',
    recommended: true,
  },
  {
    name: 'Pro',
    price: '$79',
    description: 'For professionals',
    features: [
      'Starter features',
      'AI Chat access',
      'Private roadmaps',
      'Analytics dashboard',
      'Priority support',
      '1-on-1 coaching (monthly)',
    ],
    cta: 'Start Free Trial',
    href: '/auth/sign-up?plan=pro',
  },
  {
    name: 'Elite',
    price: '$199',
    description: 'For go-getters',
    features: [
      'Pro features',
      'Unlimited AI credits',
      'Custom playbooks',
      'Weekly check-ins',
      'Private Slack community',
      'Direct access to founders',
    ],
    cta: 'Schedule Call',
    href: '/auth/sign-up?plan=elite',
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-bg/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-bg font-serif font-bold text-lg">
              S
            </div>
            <span className="font-serif text-xl font-bold text-text-primary italic">
              STACK
            </span>
          </Link>
          <Link href="/auth/sign-in" className="px-6 py-2 rounded-lg bg-gold text-bg font-semibold hover:opacity-90 transition">
            Sign in
          </Link>
        </div>
      </nav>

      {/* Pricing Section */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-text-primary mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Choose the perfect plan to accelerate your income potential
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex gap-4 bg-surface border border-border p-1 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-semibold transition ${
                  billingCycle === 'monthly'
                    ? 'bg-gold text-bg'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-semibold transition ${
                  billingCycle === 'yearly'
                    ? 'bg-gold text-bg'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Yearly <span className="ml-1 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            {PLANS.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-xl border transition-all duration-300 hover:shadow-2xl ${
                  plan.recommended
                    ? 'border-gold bg-gold/5 md:scale-105 shadow-lg'
                    : 'border-border bg-surface'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-bg px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                  <p className="text-text-secondary text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gold">{plan.price}</span>
                    <span className="text-text-secondary">/month</span>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition mb-8 ${
                      plan.recommended
                        ? 'bg-gold text-bg hover:bg-gold/90'
                        : 'bg-border text-text-primary hover:bg-border/50'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {/* Features */}
                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-gold text-xl mt-1">✓</span>
                        <span className="text-text-secondary text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {[
                {
                  q: 'Can I cancel anytime?',
                  a: 'Yes! Cancel your subscription at any time. No questions asked.',
                },
                {
                  q: 'Do you offer discounts for annual billing?',
                  a: 'Yes! Get 20% off when you pay annually instead of monthly.',
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Absolutely! All paid plans come with a 7-day free trial.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards through Stripe. Completely secure.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-text-primary mb-2">{faq.q}</h3>
                  <p className="text-text-secondary">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Ready to start earning?</h2>
            <Link
              href="/auth/sign-up"
              className="inline-block bg-gold hover:bg-gold/90 text-bg font-bold py-4 px-8 rounded-lg transition"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
