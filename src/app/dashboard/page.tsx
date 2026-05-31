"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight, Star, Zap, TrendingUp, Shield, Trophy } from "lucide-react";
import { DashboardErrorBoundary } from "@/components/ErrorBoundary";
import { StreakWidget } from "@/components/dashboard/StreakWidget";

export default function DashboardPage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/api/user");
      return data;
    },
  });

  const { data: playbooks } = useQuery({
    queryKey: ["playbooks"],
    queryFn: async () => (await api.get("/api/playbooks")).data,
  });

  const { data: incomeEntries } = useQuery({
    queryKey: ["income"],
    queryFn: async () => (await api.get("/api/income")).data,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardErrorBoundary>
        <div className="space-y-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black text-white mb-2 font-serif italic tracking-tighter">
                Welcome back, <span className="text-gradient">{user?.username}</span>
              </h1>
              <p className="text-text-secondary font-medium italic opacity-70 tracking-widest uppercase text-[10px]">
                Your AI Money Operating System is Online.
              </p>
            </div>
            <div className="flex items-center gap-4">
               <div className="px-4 py-2 rounded-xl bg-bg-card border border-border flex items-center gap-2">
                  <Shield size={16} className="text-gold" fill="currentColor" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{user?.subscription?.tier || 'free'} member</span>
               </div>
            </div>
          </header>

          <StatsCards
            income={user?.totalIncome || 0}
            xp={user?.xp || 0}
            streak={user?.streakDays || 0}
            level={user?.level || 1}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Action Area */}
            <div className="lg:col-span-2 space-y-10">
              <StreakWidget
                streak={user?.streakDays || 0}
                lastActive={user?.lastActive}
                tier={user?.subscription?.tier || "free"}
              />

              <section className="space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Featured Playbook</h3>
                    <Link href="/dashboard/playbooks" className="text-[10px] font-black text-gold uppercase underline">View All 65+ Methods</Link>
                 </div>
                 <Card className="relative overflow-hidden group p-10 border-gold/20">
                   <div className="absolute inset-0 bg-gradient-luxury opacity-10 group-hover:opacity-20 transition-opacity" />
                   <div className="relative z-10">
                     <div className="flex items-center justify-between mb-8">
                       <div className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-widest">
                         High-Ticket Scaling
                       </div>
                       <div className="flex items-center gap-1 text-gold">
                         <Star size={14} fill="currentColor" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Masterclass</span>
                       </div>
                     </div>

                     <h2 className="text-4xl font-black text-white mb-4 italic tracking-tighter uppercase">
                       {playbooks?.[0]?.title || "The AI Content Agency"}
                     </h2>
                     <p className="text-text-secondary mb-10 max-w-lg font-medium leading-relaxed">
                       {playbooks?.[0]?.description || "Learn how to leverage Claude 3.5 and Midjourney to build a high-ticket content agency in 30 days."}
                     </p>

                     <Link href={`/dashboard/playbooks/${playbooks?.[0]?.slug || 'ai-content-agency'}`} className="btn-premium inline-flex items-center gap-3 py-4 px-10">
                       <Play size={18} fill="currentColor" />
                       Start Learning
                     </Link>
                   </div>
                 </Card>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                        <Zap size={20} />
                     </div>
                     <CardTitle className="text-lg">Daily Protocol</CardTitle>
                  </div>
                  <div className="space-y-5">
                    {[
                      "Complete 1 Playbook Module",
                      "Log today's verified income",
                      "Ask AI Coach a tactical question",
                    ].map((goal, i) => (
                      <div key={i} className="flex items-center gap-4 text-sm font-bold text-text-primary group cursor-pointer">
                        <div className="w-6 h-6 rounded-lg border border-border flex items-center justify-center transition-all group-hover:border-gold">
                          <div className="w-2.5 h-2.5 rounded-sm bg-gold opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                        {goal}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-8">
                   <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                         <Trophy size={20} />
                      </div>
                      <CardTitle className="text-lg">Next Status</CardTitle>
                   </div>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Level {user?.level + 1} Unlocks</span>
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{user?.xp % 1000} / 1000 XP</span>
                    </div>
                    <div className="w-full h-2.5 bg-bg-primary rounded-full overflow-hidden border border-border">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(user?.xp % 1000) / 10}%` }}
                        className="h-full bg-gradient-premium shadow-gold-glow"
                      />
                    </div>
                    <p className="mt-4 text-[10px] font-bold text-text-muted uppercase italic text-center">Elite AI Tools Database Access</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar Area */}
            <div className="space-y-10">
              <section className="space-y-6">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Recent Wins</h3>
                <Card className="p-0 overflow-hidden border-none bg-bg-card/50">
                  <div className="p-6 space-y-8">
                    {incomeEntries?.slice(0, 3).map((win: any, i: number) => (
                      <div key={i} className="flex gap-5 relative group">
                        {i < 2 && <div className="absolute left-[15px] top-8 bottom-[-20px] w-[1px] bg-border" />}
                        <div className="w-8 h-8 rounded-full bg-bg-primary border border-border flex items-center justify-center relative z-10 group-hover:border-gold transition-colors">
                           <TrendingUp size={14} className="text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">{win.source}</p>
                          <p className="text-sm font-bold text-green-400">+$ {win.amount.toLocaleString()}</p>
                          <p className="text-[8px] text-text-muted mt-1 uppercase font-black tracking-widest">Verified 2m ago</p>
                        </div>
                      </div>
                    ))}
                    {(!incomeEntries || incomeEntries.length === 0) && (
                      <div className="text-center py-10">
                         <p className="text-xs font-bold text-text-muted uppercase">No verified wins yet.</p>
                         <Link href="/dashboard/income" className="text-[10px] font-black text-gold uppercase mt-2 inline-block hover:underline">Log first win</Link>
                      </div>
                    )}
                  </div>
                  <Link href="/dashboard/community/leaderboard" className="w-full py-4 block text-center border-t border-border bg-bg-elevated/30 text-[10px] font-black text-text-muted uppercase tracking-[0.3em] hover:text-white transition-colors">
                     View Global Rankings
                  </Link>
                </Card>
              </section>

              <Card className="bg-gradient-premium border-none text-bg-primary p-8 shadow-gold-glow">
                <div className="flex items-center gap-4 mb-6">
                   <div className="p-3 rounded-2xl bg-bg-primary/20">
                      <Zap size={24} fill="currentColor" />
                   </div>
                   <h4 className="text-xl font-black italic uppercase tracking-tight leading-none">Upgrade to Pro</h4>
                </div>
                <p className="text-sm font-bold opacity-80 leading-relaxed mb-10">
                   Unlock the Gemini 1.5 Elite Coach, 1000+ proprietary prompts, and the $10K scaling roadmap.
                </p>
                <Link href="/pricing" className="w-full py-4 rounded-2xl bg-bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                  View Tiers
                  <ArrowRight size={16} />
                </Link>
              </Card>

              <Card className="p-8">
                 <h4 className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-6">Quick Shortcuts</h4>
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Coach', href: '/dashboard/ai-coach', icon: '🤖' },
                      { label: 'Prompts', href: '/dashboard/prompts', icon: '✨' },
                      { label: 'Tools', href: '/dashboard/tools', icon: '🛠' },
                      { label: 'Roadmap', href: '/dashboard/roadmap', icon: '🗺' },
                    ].map((s) => (
                      <Link key={s.label} href={s.href}>
                         <div className="p-4 rounded-2xl border border-border bg-bg-primary/50 flex flex-col items-center gap-2 hover:border-gold/30 transition-all hover:-translate-y-1">
                            <span className="text-xl">{s.icon}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-text-muted">{s.label}</span>
                         </div>
                      </Link>
                    ))}
                 </div>
              </Card>
            </div>
          </div>
        </div>
      </DashboardErrorBoundary>
    </DashboardLayout>
  );
}
