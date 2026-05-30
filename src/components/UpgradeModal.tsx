"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Wallet, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface UpgradeModalProps {
  onClose: () => void;
}

export const UpgradeModal = ({ onClose }: UpgradeModalProps) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(259200); // 3 days in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hrs}h ${mins}m ${secs}s`;
  };

  const tiers = [
    {
      name: "Starter",
      price: "19",
      features: ["All Weekly Playbooks", "300+ AI Prompts", "Resource Library"],
      button: "Go Starter",
      highlight: false,
    },
    {
      name: "Pro",
      price: "49",
      features: ["Everything in Starter", "Unlimited AI Mentor", "Monthly Masterclasses", "Income Tracker"],
      button: "Go Pro Now",
      highlight: true,
      badge: "Most Popular",
    },
    {
      name: "Elite",
      price: "149",
      features: ["Everything in Pro", "1-on-1 Mentorship", "Private Elite Discord", "Early Access"],
      button: "Apply for Elite",
      highlight: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl bg-bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-text-secondary hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left: Info */}
          <div className="lg:w-1/3 p-12 bg-bg-elevated/50 border-r border-border">
            <div className="w-16 h-16 rounded-2xl bg-gradient-premium flex items-center justify-center mb-8 shadow-gold-glow">
              <Star size={32} className="text-bg-primary" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 font-serif leading-tight">
              Unlock Your <span className="text-gradient">Empire</span>
            </h2>
            <p className="text-text-secondary mb-10 leading-relaxed">
              Join 12,400+ members already scaling their income with STACK.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-bg-card border border-border overflow-hidden flex-shrink-0">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">"STACK paid for itself in 48 hours. Just landed my first $2k client."</p>
                  <p className="text-xs text-gold font-black uppercase mt-1">Alex K. • $8,400 Earned</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gold/5 border border-gold/20">
                <div className="flex items-center gap-2 text-gold mb-1">
                  <Clock size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Limited Time Offer</span>
                </div>
                <p className="text-sm font-bold text-white">Price increases in:</p>
                <p className="text-xl font-black text-gold font-mono">{formatTime(timeLeft)}</p>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                  <Check size={18} />
               </div>
               <span className="text-xs font-bold text-text-secondary">30-Day Money Back Guarantee</span>
            </div>
          </div>

          {/* Right: Tiers */}
          <div className="lg:w-2/3 p-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 rounded-3xl border flex flex-col h-full transition-all duration-300 ${
                  tier.highlight
                    ? "bg-bg-primary border-gold shadow-gold-glow scale-105 z-10"
                    : "bg-bg-card border-border hover:border-white/20"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-bg-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-white">${tier.price}</span>
                  <span className="text-xs text-text-secondary font-bold">/mo</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[11px] font-medium text-text-secondary">
                      <Check size={14} className="text-gold shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => router.push(`/auth/sign-up?tier=${tier.name.toLowerCase()}`)}
                  className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
                    tier.highlight
                      ? "btn-premium"
                      : "bg-bg-elevated text-white hover:bg-bg-elevated/70"
                  }`}
                >
                  {tier.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
