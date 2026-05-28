"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight, Star } from "lucide-react";

export default function DashboardPage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await api.get("/api/user");
      return data;
    },
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
      <div className="space-y-10">
        <header>
          <h1 className="text-4xl font-black text-white mb-2 font-serif">
            Welcome back, <span className="text-gradient">{user?.username}</span>
          </h1>
          <p className="text-text-secondary font-medium">
            Here's what's happening with your digital empire today.
          </p>
        </header>

        <StatsCards
          income={user?.totalIncome || 0}
          xp={user?.xp || 0}
          streak={user?.streakDays || 0}
          level={user?.level || 1}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Action Area */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-luxury opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-black uppercase tracking-widest">
                    Featured Playbook
                  </div>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold uppercase">Trending #1</span>
                  </div>
                </div>

                <h2 className="text-3xl font-black text-white mb-4">
                  The AI Content Agency: <br /> From $0 to $10K/Month
                </h2>
                <p className="text-text-secondary mb-8 max-w-lg">
                  Learn how to leverage Claude 3.5 and Midjourney to build a high-ticket content agency in 30 days. No experience required.
                </p>

                <Link href="/dashboard/playbooks/ai-content-agency" className="btn-premium inline-flex items-center gap-2">
                  <Play size={18} fill="currentColor" />
                  Continue Learning
                </Link>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Goal</CardTitle>
                  <CardDescription>Complete these to earn 500 XP</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "Complete 1 Playbook Module",
                    "Log today's income",
                    "Ask AI Coach a question",
                  ].map((goal, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-text-primary">
                      <div className="w-5 h-5 rounded border border-border flex items-center justify-center">
                        <div className="w-2 h-2 rounded-sm bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {goal}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Milestone</CardTitle>
                  <CardDescription>Level {user?.level + 1} Unlocks Elite AI Tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-text-secondary">Progress</span>
                    <span className="text-xs font-bold text-white">{user?.xp % 1000} / 1000 XP</span>
                  </div>
                  <div className="w-full h-3 bg-bg-primary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(user?.xp % 1000) / 10}%` }}
                      className="h-full bg-gradient-premium"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">Recent Wins</CardTitle>
                <Link href="/dashboard/community" className="text-xs font-bold text-gold hover:underline">View All</Link>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { user: "Alex J.", win: "Just closed a $2k client using the AI Agency playbook!", time: "2m ago" },
                  { user: "Sarah K.", win: "Hit my first $100 day on TikTok Creativity!", time: "15m ago" },
                  { user: "Marcus T.", win: "Finally reached Level 5 and unlocked the Elite prompts!", time: "1h ago" },
                ].map((win, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-bg-elevated flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white mb-0.5">{win.user}</p>
                      <p className="text-xs text-text-secondary leading-tight">{win.win}</p>
                      <p className="text-[10px] text-text-muted mt-1 uppercase font-bold">{win.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-premium border-none text-bg-primary">
              <CardHeader>
                <CardTitle className="text-bg-primary">Upgrade to Pro</CardTitle>
                <CardDescription className="text-bg-primary/70">Unlock the AI Coach and Elite Playbooks.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/pricing" className="w-full py-3 rounded-xl bg-bg-primary text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                  View Tiers
                  <ArrowRight size={14} />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
