"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Zap, Flame, DollarSign, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LeaderboardPage() {
  const [rankingType, setRankingType] = useState("total"); // "total", "xp", "streak"

  const { data: users, isLoading } = useQuery({
    queryKey: ["leaderboard", rankingType],
    queryFn: async () => (await api.get(`/api/income?type=leaderboard&ranking=${rankingType}`)).data,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/api/user")).data,
  });

  const tabs = [
    { id: "total", label: "Income", icon: DollarSign },
    { id: "xp", label: "Experience", icon: Zap },
    { id: "streak", label: "Streaks", icon: Flame },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "elite": return "text-purple-400 border-purple-400/30 bg-purple-400/10";
      case "pro": return "text-gold border-gold/30 bg-gold/10";
      case "starter": return "text-blue-400 border-blue-400/30 bg-blue-400/10";
      default: return "text-text-muted border-border bg-bg-primary";
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Leaderboard</h1>
            <p className="text-text-secondary font-medium">The elite 1% making moves in the AI economy.</p>
          </div>

          <Link href="/dashboard/income" className="btn-premium flex items-center gap-2">
             Verify Your Income
             <ArrowUpRight size={18} />
          </Link>
        </header>

        <div className="flex bg-bg-card p-1.5 rounded-2xl border border-border w-fit">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setRankingType(tab.id)}
               className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                 rankingType === tab.id ? "bg-gold text-bg-primary shadow-gold-glow" : "text-text-secondary hover:text-white"
               }`}
             >
               <tab.icon size={14} />
               {tab.label}
             </button>
           ))}
        </div>

        <Card className="p-0 overflow-hidden border-none shadow-2xl bg-bg-card/50 backdrop-blur-md">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-border bg-bg-elevated/30">
                       <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Rank</th>
                       <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Member</th>
                       <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Tier</th>
                       <th className="px-8 py-5 text-[10px] font-black text-text-muted uppercase tracking-[0.2em] text-right">
                          {rankingType === "total" ? "Total Earned" : rankingType === "xp" ? "Total XP" : "Streak"}
                       </th>
                    </tr>
                 </thead>
                 <tbody>
                    {isLoading ? (
                      [1,2,3,4,5].map(i => <tr key={i} className="animate-pulse border-b border-border/50 h-16" />)
                    ) : (
                      users?.map((u: any, i: number) => (
                        <tr
                          key={u.id}
                          className={`border-b border-border/50 hover:bg-white/5 transition-colors group ${u.id === user?.id ? "bg-gold/5" : ""}`}
                        >
                           <td className="px-8 py-5">
                              {i < 3 ? (
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                                  i === 0 ? "bg-gold text-bg-primary" : i === 1 ? "bg-slate-300 text-bg-primary" : "bg-orange-400 text-bg-primary"
                                }`}>
                                   {i + 1}
                                </div>
                              ) : <span className="w-8 text-center text-xs font-black text-text-muted">{i + 1}</span>}
                           </td>
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center font-bold text-xs">
                                    {u.username?.[0]}
                                 </div>
                                 <span className="font-bold text-white group-hover:text-gold transition-colors">{u.username}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getTierColor(u.subscription?.tier)}`}>
                                 {u.subscription?.tier || 'free'}
                              </span>
                           </td>
                           <td className="px-8 py-5 text-right font-black text-white italic">
                              {rankingType === "total" ? `$${u.totalIncome.toLocaleString()}` : rankingType === "xp" ? `${u.xp.toLocaleString()} XP` : `${u.streakDays} Days`}
                           </td>
                        </tr>
                      ))
                    )}
                 </tbody>
              </table>
           </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
