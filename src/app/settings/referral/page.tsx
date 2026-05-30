"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Copy, Check, Users, Gift, Star, Share2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ReferralPage() {
  const [isCopied, setIsCopied] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/api/user")).data,
  });

  const referralLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/sign-up?ref=${user?.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const stats = [
    { label: "Total Referred", value: "0", icon: Users, color: "text-blue-400" },
    { label: "Converted", value: "0", icon: Star, color: "text-gold" },
    { label: "Bonus Earned", value: "0 XP", icon: Gift, color: "text-green-400" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <header>
          <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Referral Program</h1>
          <p className="text-text-secondary font-medium">Turn your network into an income stream. Share STACK and earn rewards.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="flex items-center gap-5">
              <div className={`p-4 rounded-xl bg-bg-primary ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-premium opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
             <div className="w-20 h-20 rounded-3xl bg-gradient-premium flex items-center justify-center mb-8 shadow-gold-glow">
                <Share2 size={40} className="text-bg-primary" />
             </div>
             <h2 className="text-3xl font-black text-white mb-4 italic">Invite Your Inner Circle</h2>
             <p className="text-text-secondary mb-10 leading-relaxed font-medium">
               Give your friends a path to financial freedom. When they join, you get 500 XP.
               Refer 10 friends to unlock a lifetime 20% commission on their subscriptions.
             </p>

             <div className="w-full flex items-center gap-3 bg-bg-primary border border-border p-5 rounded-2xl mb-6">
                <code className="flex-1 text-sm text-text-primary overflow-x-auto whitespace-nowrap scrollbar-none font-mono text-left">
                   {referralLink}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-3 rounded-xl bg-bg-elevated text-text-secondary hover:text-gold transition-colors flex-shrink-0"
                >
                  {isCopied ? <Check size={20} /> : <Copy size={20} />}
                </button>
             </div>
             <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Share your unique link anywhere</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <Card>
              <h3 className="text-xl font-bold text-white mb-6">Rewards Tiers</h3>
              <div className="space-y-6">
                 {[
                   { level: "Bronze", target: "3 Referrals", reward: "1 Month Free Pro", current: false },
                   { level: "Silver", target: "10 Referrals", reward: "Lifetime 20% Commission", current: false },
                   { level: "Gold", target: "50 Referrals", reward: "Elite Mastermind Invite", current: false },
                 ].map((tier, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-bg-primary/50">
                      <div>
                         <p className="text-xs font-black text-gold uppercase tracking-widest">{tier.level}</p>
                         <p className="text-sm font-bold text-white">{tier.target}</p>
                      </div>
                      <p className="text-xs font-medium text-text-secondary">{tier.reward}</p>
                   </div>
                 ))}
              </div>
           </Card>

           <Card className="flex flex-col items-center justify-center text-center p-10 bg-gradient-luxury border-none">
              <div className="w-16 h-16 rounded-full bg-bg-primary/30 flex items-center justify-center mb-6">
                 <Gift size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight uppercase">Leaderboard Bonus</h3>
              <p className="text-sm text-white/70 mb-8 font-medium">Top 3 referrers this month get an extra $500 in BTC.</p>
              <button className="px-8 py-3 rounded-xl bg-white text-bg-primary font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">
                 View Rankings
              </button>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
