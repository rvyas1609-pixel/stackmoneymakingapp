"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Trophy, Zap, History, Shield, TrendingUp, ChevronRight } from "lucide-react";

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
  const xpInLevel = (user?.xp || 0) % 1000;
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
                    You are climbing the hierarchy. Keep executing tasks to reach {levelTitles[currentLevel + 1] || "Legend"} status.
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
           </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {achievementsLoading ? (
             [1,2,3,4].map(i => <div key={i} className="h-48 bg-bg-card animate-pulse rounded-[2rem]" />)
           ) : (
             achievements?.map((ach: any) => (
               <Card key={ach.id} className="p-8 border-border hover:border-gold/30 transition-all flex items-center gap-8">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-gold/10 flex items-center justify-center text-4xl">
                     🏆
                  </div>
                  <div>
                     <h4 className="text-xl font-black text-white uppercase italic mb-1">{ach.title}</h4>
                     <p className="text-sm text-text-secondary font-medium mb-4">{ach.description}</p>
                     <div className="inline-flex px-3 py-1 rounded-full bg-bg-primary border border-border text-[9px] font-black uppercase tracking-widest text-gold">
                        +{ach.xpReward} XP Reward
                     </div>
                  </div>
               </Card>
             ))
           )}
        </div>
      </div>
    </DashboardLayout>
  );
}
