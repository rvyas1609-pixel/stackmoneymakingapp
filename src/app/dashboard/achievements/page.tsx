"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Trophy, Star, Zap, Target, Lock } from "lucide-react";

export default function AchievementsPage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/user");
      return data;
    },
  });

  const allAchievements = [
    { title: "First Win", desc: "Log your first income entry.", icon: "💰", xp: 100, unlocked: true },
    { title: "AI Apprentice", desc: "Complete 3 playbook modules.", icon: "📚", xp: 250, unlocked: true },
    { title: "Consistent Hustler", desc: "Maintain a 7-day streak.", icon: "🔥", xp: 500, unlocked: false },
    { title: "Scale King", desc: "Reach $5,000 in total earnings.", icon: "👑", xp: 1000, unlocked: false },
    { title: "Elite Stacker", desc: "Unlock a Pro playbook.", icon: "💎", xp: 250, unlocked: false },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header>
          <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Achievements</h1>
          <p className="text-text-secondary font-medium">Earn XP and unlock exclusive rewards as you scale.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <Card className="md:col-span-2 lg:col-span-3 bg-gradient-luxury border-none p-10 flex flex-col md:flex-row items-center gap-12">
              <div className="relative">
                 <div className="w-32 h-32 rounded-full border-4 border-gold/30 flex items-center justify-center bg-bg-primary shadow-gold-glow">
                    <span className="text-5xl font-black text-white">{user?.level || 1}</span>
                 </div>
                 <div className="absolute -bottom-2 -right-2 p-2 rounded-lg bg-gold text-bg-primary">
                    <Trophy size={20} />
                 </div>
              </div>

              <div className="flex-1 space-y-4">
                 <h2 className="text-3xl font-black text-white uppercase tracking-wider">Level {user?.level || 1} Mastermind</h2>
                 <p className="text-white/70 max-w-lg font-medium">You're in the top 5% of all stackers this month. Keep pushing to unlock the Elite AI Tools suite.</p>

                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white">
                       <span>XP Progress</span>
                       <span>{user?.xp || 0} / {(user?.level || 1) * 1000} XP</span>
                    </div>
                    <div className="w-full h-3 bg-bg-primary/30 rounded-full overflow-hidden">
                       <div className="h-full bg-white" style={{ width: `${((user?.xp || 0) % 1000) / 10}%` }} />
                    </div>
                 </div>
              </div>
           </Card>

           {allAchievements.map((ach, i) => (
             <Card key={i} className={`group ${!ach.unlocked ? "opacity-60" : ""}`}>
                <div className="flex items-center justify-between mb-6">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${ach.unlocked ? "bg-gold/10 group-hover:scale-110 transition-transform" : "bg-bg-elevated grayscale"}`}>
                      {ach.icon}
                   </div>
                   {!ach.unlocked && <Lock size={16} className="text-text-muted" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{ach.title}</h3>
                <p className="text-xs text-text-secondary mb-6 font-medium leading-relaxed">{ach.desc}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                   <div className="flex items-center gap-1 text-gold">
                      <Zap size={14} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{ach.xp} XP</span>
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${ach.unlocked ? "text-green-400" : "text-text-muted"}`}>
                      {ach.unlocked ? "Unlocked" : "Locked"}
                   </span>
                </div>
             </Card>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
