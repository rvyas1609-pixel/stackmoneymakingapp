"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UpgradeModal } from "./UpgradeModal";
import { Lock } from "lucide-react";

interface UpgradeGateProps {
  requiredTier: "starter" | "pro" | "elite";
  featureName: string;
  userTier: string;
  children: React.ReactNode;
  preview?: boolean;
}

export const UpgradeGate = ({
  requiredTier,
  featureName,
  userTier,
  children,
  preview = false,
}: UpgradeGateProps) => {
  const [showModal, setShowModal] = useState(false);
  const [hitCount, setHitCount] = useState(0);

  const tiers = { free: 0, starter: 1, pro: 2, elite: 3 };
  const hasAccess = tiers[userTier as keyof typeof tiers] >= tiers[requiredTier];

  useEffect(() => {
    if (!hasAccess) {
      const count = parseInt(localStorage.getItem(`gate_hits_${featureName}`) || "0");
      localStorage.setItem(`gate_hits_${featureName}`, (count + 1).toString());
      setHitCount(count + 1);
    }
  }, [hasAccess, featureName]);

  if (hasAccess) return <>{children}</>;

  return (
    <div className="relative group overflow-hidden rounded-3xl h-full w-full">
      {/* Background/Preview */}
      <div className={`filter ${preview ? "blur-[20px] grayscale opacity-30" : "opacity-0"} pointer-events-none select-none transition-all duration-700`}>
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 bg-bg-primary/40 backdrop-blur-sm group-hover:bg-bg-primary/20 transition-all duration-500">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="max-w-md w-full glass-elevated p-8 text-center border-gold/20 hover:border-gold/50 shadow-gold-glow transition-all duration-500"
        >
          <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-gold" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-serif italic tracking-tight">Unlock {featureName}</h2>
          <p className="text-text-secondary text-sm mb-8 font-medium">
            This high-value asset is reserved for <span className="text-gold font-black underline uppercase">{requiredTier}</span> members.
          </p>

          <div className="space-y-4 mb-10 text-left">
            {[
              "Proprietary scaling tactics",
              "Elite AI prompt stacks",
              "Direct $10K/mo community access",
            ].map((v, i) => (
              <div key={i} className="flex items-center gap-3 text-xs font-bold text-white/90">
                <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <Check size={10} strokeWidth={4} />
                </div>
                {v}
              </div>
            ))}
          </div>

          <div className="bg-bg-primary/80 rounded-2xl p-5 mb-8 border border-border flex items-center justify-between">
            <div className="text-left">
               <p className="text-[10px] text-text-muted font-black uppercase tracking-widest line-through">$99/mo</p>
               <p className="text-3xl font-black text-white">$49<span className="text-sm font-bold text-text-secondary">/mo</span></p>
            </div>
            <div className="text-right">
               <p className="text-[10px] text-gold font-black uppercase tracking-[0.2em] animate-pulse">Save 50%</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full btn-premium py-4 text-sm font-black uppercase tracking-widest shadow-gold-glow"
          >
            Upgrade & Unlock Now
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-6 h-6 rounded-full border border-bg-primary overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" />
                 </div>
               ))}
            </div>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
              Join 12,400+ members winning
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && <UpgradeModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  );
};

const Check = ({ size, className, strokeWidth }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
