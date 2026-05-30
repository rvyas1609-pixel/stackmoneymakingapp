"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, ShieldCheck, Zap, ArrowRight, Shield } from "lucide-react";
import { CryptoPaymentModal } from "@/components/CryptoPaymentModal";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: 29,
    description: "For the dedicated side-hustler.",
    features: [
      "All 65+ Weekly Playbooks",
      "Full Prompt Vault (1,000+)",
      "Resource Library Access",
      "Community Wins Channel",
      "Weekly Research Reports",
    ],
    highlight: false,
    cta: "Start Stacking",
  },
  {
    name: "Pro",
    price: 79,
    description: "Scale your income with AI leverage.",
    features: [
      "Everything in Starter",
      "Unlimited AI Mentor (Gemini)",
      "Advanced Learning Roadmaps",
      "Monthly Live Masterclasses",
      "Exclusive Tool Discounts",
      "Priority Support",
    ],
    highlight: true,
    badge: "Most Popular",
    cta: "Go Pro Now",
  },
  {
    name: "Elite",
    price: 149,
    description: "The ultimate mastermind experience.",
    features: [
      "Everything in Pro",
      "1-on-1 Monthly Strategy Call",
      "Private Elite Discord Channel",
      "Done-For-You Templates",
      "Early Access to New Methods",
      "Stack Elite Welcome Kit",
    ],
    highlight: false,
    cta: "Apply for Elite",
  },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedTier, setSelectedTier] = useState<any>(null);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar />

      <main className="pt-32 pb-32">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8"
          >
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
             </span>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Investment Portfolio Tiers</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 font-serif leading-none italic tracking-tighter">
            Choose Your <span className="text-gradient">Empire Path</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto font-medium mb-12">
            Unlock the exact systems, tools, and mentorship used by the top 1% to generate passive income.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-6">
            <span className={`text-sm font-bold uppercase tracking-widest ${billing === 'monthly' ? 'text-white' : 'text-text-muted'}`}>Monthly</span>
            <button
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className="w-16 h-8 rounded-full bg-bg-elevated p-1 flex items-center relative border border-border"
            >
               <motion.div
                 animate={{ x: billing === 'monthly' ? 0 : 32 }}
                 className="w-6 h-6 rounded-full bg-gold shadow-gold-glow"
               />
            </button>
            <div className="flex items-center gap-2">
               <span className={`text-sm font-bold uppercase tracking-widest ${billing === 'yearly' ? 'text-white' : 'text-text-muted'}`}>Yearly</span>
               <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">Save 20%</span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {tiers.map((tier, i) => (
             <motion.div
               key={tier.name}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
                <Card className={`relative h-full flex flex-col p-10 transition-all duration-500 group ${
                  tier.highlight ? "border-gold bg-bg-card shadow-gold-glow scale-105 z-10" : "hover:border-white/20"
                }`}>
                   {tier.badge && (
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gold text-bg-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                        {tier.badge}
                     </div>
                   )}

                   <div className="mb-10">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight italic mb-2">{tier.name}</h3>
                      <p className="text-sm text-text-secondary font-medium">{tier.description}</p>
                   </div>

                   <div className="flex items-baseline gap-2 mb-10">
                      <span className="text-6xl font-black text-white italic tracking-tighter">
                         ${billing === 'yearly' ? Math.round(tier.price * 0.8) : tier.price}
                      </span>
                      <span className="text-text-muted font-bold uppercase text-xs tracking-widest">/mo</span>
                   </div>

                   <div className="space-y-4 mb-12 flex-1">
                      {tier.features.map((feature, j) => (
                        <div key={j} className="flex items-start gap-3">
                           <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check size={12} className="text-gold" strokeWidth={4} />
                           </div>
                           <span className="text-sm font-medium text-text-secondary leading-tight group-hover:text-white transition-colors">{feature}</span>
                        </div>
                      ))}
                   </div>

                   <button
                     onClick={() => setSelectedTier(tier)}
                     className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 flex items-center justify-center gap-3 ${
                       tier.highlight ? "btn-premium" : "bg-bg-elevated text-white hover:bg-bg-elevated/70 border border-border"
                     }`}
                   >
                      {tier.cta}
                      <ArrowRight size={18} />
                   </button>
                </Card>
             </motion.div>
           ))}
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter font-serif">Frequently Asked <span className="text-gold">Questions</span></h2>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {[
                { q: "Is the payment secure?", a: "Yes, we use the blockchain for all transactions. Payments are direct wallet-to-wallet, meaning no middlemen and maximum security for your funds." },
                { q: "What cryptocurrencies do you accept?", a: "We currently accept SOL (Solana), ETH (Ethereum/USDC/USDT), BTC (Bitcoin), and Base (ETH/USDC). More networks coming soon." },
                { q: "How long does activation take?", a: "Transactions are usually verified within 1 hour. In rare cases, manual verification can take up to 24 hours. You'll gain access immediately after verification." },
                { q: "Can I cancel my subscription?", a: "Membership is currently based on 1-month or 1-year access. There are no recurring auto-charges. You simply top up your access when it expires." },
              ].map((faq, i) => (
                <Card key={i} className="p-8 hover:border-gold/30 transition-all group">
                   <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                      <Zap size={20} className="text-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                      {faq.q}
                   </h4>
                   <p className="text-sm text-text-secondary leading-relaxed font-medium pl-8 border-l border-border">{faq.a}</p>
                </Card>
              ))}
           </div>
        </section>

        {/* Security Bar */}
        <div className="mt-32 border-y border-border py-12 bg-bg-card/30">
           <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={32} className="text-gold" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">SSL SECURED</span>
              </div>
              <div className="flex items-center gap-3">
                 <Shield size={32} className="text-gold" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">BLOCKCHAIN VERIFIED</span>
              </div>
              <div className="flex items-center gap-3">
                 <Star size={32} className="text-gold" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">30-DAY GUARANTEE</span>
              </div>
           </div>
        </div>
      </main>

      <footer className="py-20 border-t border-border text-center">
         <p className="text-xs font-bold text-text-muted uppercase tracking-widest">&copy; 2025 STACK AI OS. Join the elite.</p>
      </footer>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedTier && (
          <CryptoPaymentModal
            tier={selectedTier}
            billing={billing}
            onClose={() => setSelectedTier(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
