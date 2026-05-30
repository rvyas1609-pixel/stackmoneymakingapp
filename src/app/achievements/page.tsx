"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Trophy, Star, Zap, Target, Lock, ChevronRight, TrendingUp, History, Shield } from "lucide-react";

const levelTitles: Record<number, string> = {
  1: "Hustler",
  2: "Grinder",
  3: "Builder",
  4: "Operator",
  5: "CEO",
  6: "Legend",
};

export default function AchievementsPage() {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/api/user")).data,
  });

  const { data: achievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => (await api.get("/api/achievements")).data,
  });

  const currentLevel = user?.level || 1;
  const xpInLevel = (user?.xp || 0) % 1000; // Mocked threshold
  const nextLevelXP = 1000;
  const progress = (xpInLevel / nextLevelXP) * 100;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-12">
        <header>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-black text-white mb-2 font-serif uppercase tracking-tight italic"
          >
            Mission <span className="text-gradient">Control</span>
          </motion.h1>
          <p className="text-text-secondary font-medium italic opacity-70 tracking-widest uppercase text-[10px]">Your status in the elite hierarchy.</p>
        </header>

        {/* Level Banner */}
        <Card className="bg-gradient-luxury border-none p-10 flex flex-col md:flex-row items-center gap-12 group overflow-hidden relative">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

           <div className="relative z-10">
              <div className="w-32 h-32 rounded-[2.5rem] bg-bg-primary border-4 border-gold/30 flex items-center justify-center shadow-gold-glow relative group-hover:scale-105 transition-transform duration-700">
                 <span className="text-6xl font-black text-white italic">{currentLevel}</span>
                 <div className="absolute -bottom-3 bg-gold text-bg-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Rank
                 </div>
              </div>
           </div>

           <div className="relative z-10 flex-1 space-y-6 text-center md:text-left w-full">
              <div>
                 <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{levelTitles[currentLevel] || "Mastermind"}</h2>
                    <Shield size={24} className="text-gold" fill="currentColor" />
                 </div>
                 <p className="text-sm text-white/70 font-medium leading-relaxed max-w-lg">
                    You are in the top 15% of all members this month. Unlock Level {currentLevel + 1} to gain exclusive access to the Advanced SaaS templates.
                 </p>
              </div>

              <div className="space-y-3">
                 <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span>Current Progress</span>
                    <span>{xpInLevel} / {nextLevelXP} XP</span>
                 </div>
                 <div className="w-full h-2.5 bg-bg-primary/50 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-premium shadow-gold-glow"
                    />
                 </div>
              </div>
           </div>

           <div className="relative z-10 flex flex-col items-center md:items-end gap-2 text-right">
              <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Total Experience</p>
              <p className="text-4xl font-black text-white tabular-nums">{user?.xp?.toLocaleString() || "0"}</p>
              <div className="flex items-center gap-2 text-green-400">
                 <TrendingUp size={16} />
                 <span className="text-xs font-bold font-mono">+450 this week</span>
              </div>
           </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Achievement Grid */}
           <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Proprietary Badges</h3>
                 <span className="text-[10px] font-black text-gold uppercase underline cursor-pointer">View Collection</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 {achievementsLoading ? (
                   [...Array(6)].map((_, i) => (
                     <div key={i} className="h-48 rounded-[2rem] bg-bg-card animate-pulse border border-border" />
                   ))
                 ) : (
                   achievements?.map((ach: any) => {
                     const isUnlocked = user?.achievements?.some((ua: any) => ua.achievementId === ach.id);
                     return (
                       <motion.div
                         key={ach.id}
                         whileHover={{ y: -5 }}
                         className={`relative p-8 rounded-[2rem] border flex flex-col items-center text-center transition-all duration-500 group ${
                           isUnlocked ? "bg-bg-card border-gold/30 shadow-gold-glow" : "bg-bg-card/30 border-border grayscale opacity-50"
                         }`}
                       >
                          <div className={`w-16 h-16 rounded-[1.5rem] mb-6 flex items-center justify-center text-3xl transition-transform duration-500 ${
                            isUnlocked ? "bg-gold/10 group-hover:rotate-12" : "bg-bg-primary"
                          }`}>
                             {ach.icon.startsWith('ti-') ? <span className="text-4xl">🏆</span> : ach.icon}
                          </div>
                          <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">{ach.title}</h4>
                          <p className="text-[10px] text-text-secondary font-medium leading-relaxed line-clamp-2 mb-6">{ach.description}</p>

                          <div className={`mt-auto px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            isUnlocked ? "bg-gold text-bg-primary" : "bg-bg-primary text-text-muted border border-border"
                          }`}>
                             {isUnlocked ? "Unlocked" : `+${ach.xpReward} XP`}
                          </div>
                       </motion.div>
                     );
                   })
                 )}
              </div>
           </div>

           {/* Activity Feed */}
           <div className="space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Experience Feed</h3>
                 <History size={16} className="text-text-muted" />
              </div>

              <Card className="p-0 overflow-hidden border-none bg-bg-card/30">
                 <div className="p-6 space-y-8">
                    {[
                      { action: "Completed Step 1: Niche Selection", xp: 50, time: "2h ago", icon: <Zap size={14} className="text-gold" /> },
                      { action: "Logged $250 in earnings", xp: 100, time: "5h ago", icon: <DollarSign size={14} className="text-green-400" /> },
                      { action: "Daily Login Streak (3 Days)", xp: 50, time: "8h ago", icon: <Flame size={14} className="text-orange-500" /> },
                      { action: "Asked Coach a tactical question", xp: 25, time: "1d ago", icon: <Bot size={14} className="text-blue-400" /> },
                      { action: "Downloaded Agency Contract", xp: 15, time: "2d ago", icon: <Lock size={14} className="text-purple-400" /> },
                    ].map((entry, i) => (
                      <div key={i} className="flex items-start gap-4 relative group">
                         {i < 4 && <div className="absolute left-[13px] top-6 bottom-[-16px] w-[1px] bg-border group-last:hidden" />}
                         <div className="w-7 h-7 rounded-full bg-bg-primary border border-border flex items-center justify-center relative z-10 group-hover:border-gold transition-colors">
                            {entry.icon}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-0.5">
                               <p className="text-xs font-bold text-white leading-tight truncate">{entry.action}</p>
                               <span className="text-[10px] font-black text-gold tabular-nums">+{entry.xp}</span>
                            </div>
                            <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">{entry.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-4 border-t border-border text-[9px] font-black text-text-muted uppercase tracking-[0.3em] hover:text-white transition-colors">
                    View Full Audit Log
                 </button>
              </Card>

              <Card className="bg-gold/5 border-gold/20 p-8 flex flex-col items-center text-center">
                 <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                    <Trophy size={28} className="text-gold" />
                 </div>
                 <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Weekly Leaderboard</h4>
                 <p className="text-[10px] text-text-secondary font-medium leading-relaxed mb-6">
                    You're 2,400 XP away from the top 3. Top performers this week win 0.01 BTC.
                 </p>
                 <Link href="/community/leaderboard" className="text-[10px] font-black text-gold uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
                    View Rankings <ChevronRight size={12} />
                 </Link>
              </Card>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
