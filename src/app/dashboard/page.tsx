'use client';

import React from 'react';

const StatCard = ({ label, value, icon, change }: { label: string; value: string; icon: string; change?: string }) => (
  <div className="p-6 rounded-3xl bg-bg-card border border-border group hover:border-violet/30 transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {change && (
        <span className="text-xs font-black text-neon-green bg-neon-green/10 px-2 py-1 rounded-lg">
          {change}
        </span>
      )}
    </div>
    <div className="text-3xl font-black mb-1 text-white">{value}</div>
    <div className="text-xs font-bold text-text-muted uppercase tracking-widest">{label}</div>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Welcome Area */}
      <div className="flex flex-col md:row items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tight">Good morning, Stacker 👋</h2>
          <p className="text-text-secondary font-medium">Ready to stack some cash today?</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-2xl bg-bg-secondary border border-border font-bold text-sm hover:bg-white/5 transition flex items-center gap-2">
            <span>Ask AI Mentor</span>
          </button>
          <button className="px-6 py-3 rounded-2xl bg-violet text-white font-bold text-sm hover:opacity-90 transition shadow-neon flex items-center gap-2">
            <span>+ Log Income</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Earned" value="$1,247.50" icon="💰" change="+12%" />
        <StatCard label="Methods Learned" value="8 / 65" icon="📖" />
        <StatCard label="Prompts Used" value="234" icon="✨" />
        <StatCard label="Current Streak" value="14 Days" icon="🔥" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Weekly Featured Playbook */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-3xl overflow-hidden border border-white/5 group h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="featured"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-violet text-[10px] font-black uppercase tracking-widest">New This Week</span>
              <h3 className="text-3xl font-black text-white">Pinterest Affiliate Automation</h3>
              <p className="text-text-secondary font-medium max-w-lg">
                How to use AI to generate 50+ viral pins daily and drive traffic to high-ticket affiliate offers without spending a dime on ads.
              </p>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-text-muted uppercase">Avg Earning</span>
                  <span className="text-sm font-bold text-neon-green">$2k–$5k/mo</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-text-muted uppercase">Difficulty</span>
                  <span className="text-sm font-bold text-white">Beginner</span>
                </div>
                <button className="ml-auto px-8 py-3 rounded-xl bg-white text-bg-primary font-black text-sm hover:scale-105 transition-transform">
                  Start Playbook →
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-bg-card border border-border">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span>🎯</span> Your Roadmap Progress
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-text-muted">
                  <span>Current: $1k Milestone</span>
                  <span className="text-neon-green">85%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-gold h-full w-[85%] rounded-full shadow-[0_0_10px_#d4af37]" />
                </div>
                <p className="text-xs text-text-secondary font-medium italic">
                  "Only $152.50 left to hit your next level!"
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-bg-card border border-border">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span>🏆</span> Leaderboard (Weekly)
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Alpha_Stacker", xp: "12,450", rank: 1 },
                  { name: "AI_Wizard", xp: "11,200", rank: 2 },
                  { name: "You", xp: "8,940", rank: 14, isUser: true },
                ].map((user, i) => (
                  <div key={i} className={`flex items-center justify-between p-2 rounded-xl ${user.isUser ? 'bg-violet/10 border border-violet/20' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black ${user.rank === 1 ? 'text-gold' : 'text-text-muted'}`}>#{user.rank}</span>
                      <span className="text-sm font-bold">{user.name}</span>
                    </div>
                    <span className="text-xs font-black text-white">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Sidebar */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-bg-secondary border border-border">
            <h4 className="font-black text-xl mb-6">Recent Activity</h4>
            <div className="space-y-6">
              {[
                { title: "Completed Playbook", desc: "AI Content Agency", xp: "+250 XP", icon: "✅" },
                { title: "New Badge", desc: "Prompt Master", xp: "+500 XP", icon: "✨" },
                { title: "Income Logged", desc: "Digital Products", xp: "+50 XP", icon: "💰" },
                { title: "Streak Bonus", desc: "7-Day Milestone", xp: "+100 XP", icon: "🔥" },
              ].map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    {act.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">{act.title}</span>
                      <span className="text-[10px] font-black text-neon-green">{act.xp}</span>
                    </div>
                    <p className="text-xs text-text-muted font-medium mt-0.5">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-white/5 text-xs font-black uppercase tracking-widest text-text-muted hover:text-white transition">
              View All History
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-violet relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h4 className="text-xl font-black text-white mb-2">Upgrade to Pro</h4>
            <p className="text-white/80 text-xs font-medium mb-6">Unlock unlimited AI Mentor messages and 50+ masterclasses.</p>
            <button className="w-full py-3 rounded-xl bg-white text-violet font-black text-sm shadow-xl">
              Go Pro Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
