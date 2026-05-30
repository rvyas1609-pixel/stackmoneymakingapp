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

          <Link href="/income" className="btn-premium flex items-center gap-2">
             Verify Your Income
             <ArrowUpRight size={18} />
          </Link>
        </header>

        <div className="flex bg-bg-card p-1 rounded-2xl border border-border w-fit">
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
              <table className="w-full text-left">
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
                    <AnimatePresence mode="wait">
                       {isLoading ? (
                         [...Array(5)].map((_, i) => (
                           <tr key={i} className="animate-pulse border-b border-border/50">
                              <td colSpan={4} className="px-8 py-6 h-16 bg-bg-primary/20" />
                           </tr>
                         ))
                       ) : (
                         users?.map((u: any, i: number) => (
                           <motion.tr
                             key={u.id}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: i * 0.03 }}
                             className={`border-b border-border/50 hover:bg-white/5 transition-colors group ${u.id === user?.id ? "bg-gold/5" : ""}`}
                           >
                              <td className="px-8 py-5">
                                 <div className="flex items-center gap-3">
                                    {i < 3 ? (
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                                        i === 0 ? "bg-gold text-bg-primary shadow-gold-glow" : i === 1 ? "bg-slate-300 text-bg-primary" : "bg-orange-400 text-bg-primary"
                                      }`}>
                                         {i + 1}
                                      </div>
                                    ) : (
                                      <span className="w-8 text-center text-xs font-black text-text-muted">{i + 1}</span>
                                    )}
                                 </div>
                              </td>
                              <td className="px-8 py-5">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-bg-elevated">
                                       {u.profileImage ? <img src={u.profileImage} alt="" /> : <div className="w-full h-full flex items-center justify-center font-bold text-xs">{u.username?.[0]}</div>}
                                    </div>
                                    <span className="font-bold text-white group-hover:text-gold transition-colors">{u.username}</span>
                                 </div>
                              </td>
                              <td className="px-8 py-5">
                                 <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getTierColor(u.subscription?.tier)}`}>
                                    {u.subscription?.tier || 'free'}
                                 </span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                 <span className="font-black text-white tabular-nums">
                                    {rankingType === "total" ? `$${u.totalIncome.toLocaleString()}` : rankingType === "xp" ? `${u.xp.toLocaleString()} XP` : `${u.streakDays} Days`}
                                 </span>
                              </td>
                           </motion.tr>
                         ))
                       )}
                    </AnimatePresence>
                 </tbody>
              </table>
           </div>
        </Card>

        {/* Floating User Rank */}
        {!isLoading && users?.find((u: any) => u.id === user?.id) === undefined && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="sticky bottom-8 left-0 right-0 z-50 px-8 py-6 rounded-[2rem] bg-gold text-bg-primary shadow-2xl flex items-center justify-between"
          >
             <div className="flex items-center gap-6">
                <span className="text-xs font-black uppercase tracking-widest">Your Ranking</span>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full border-2 border-bg-primary/20 overflow-hidden">
                      <img src={user?.profileImage} alt="" />
                   </div>
                   <span className="text-xl font-black italic">#1,248</span>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Progress</p>
                <p className="text-xl font-black tabular-nums">
                   {rankingType === "total" ? `$${user?.totalIncome.toLocaleString()}` : rankingType === "xp" ? `${user?.xp.toLocaleString()} XP` : `${user?.streakDays} Days`}
                </p>
             </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
