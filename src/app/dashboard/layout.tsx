'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const SidebarLink = ({ href, icon, label, badge }: { href: string; icon: string; label: string; badge?: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ x: 4 }}
        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive ? 'bg-violet/10 text-white' : 'text-text-secondary hover:text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`text-lg ${isActive ? 'text-violet-light' : 'group-hover:text-violet-light transition'}`}>{icon}</span>
          <span className="text-sm font-bold tracking-tight">{label}</span>
        </div>
        {badge && (
          <span className="px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green text-[10px] font-black uppercase">
            {badge}
          </span>
        )}
      </motion.div>
    </Link>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isSidebarOpen = true;

  const links = [
    { href: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { href: '/dashboard/playbooks', icon: '📖', label: 'Playbooks' },
    { href: '/dashboard/prompts', icon: '✨', label: 'Prompt Vault' },
    { href: '/dashboard/resources', icon: '🛠', label: 'Resources' },
    { href: '/dashboard/roadmap', icon: '🗺', label: 'My Roadmap' },
    { href: '/dashboard/mentor', icon: '🤖', label: 'AI Mentor' },
    { href: '/dashboard/income', icon: '💰', label: 'Income Tracker' },
    { href: '/dashboard/leaderboard', icon: '🏆', label: 'Leaderboard' },
    { href: '/dashboard/community', icon: '👥', label: 'Community' },
    { href: '/dashboard/masterclasses', icon: '🎓', label: 'Masterclasses', badge: 'Pro' },
  ];

  return (
    <div className="flex min-h-screen bg-bg-primary text-text-primary">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-bg-secondary border-r border-border transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full p-6">
          {/* User Profile Area */}
          <div className="flex items-center gap-3 mb-10 p-2 rounded-2xl bg-bg-card border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-gradient-premium p-[1px]">
              <div className="w-full h-full rounded-[11px] bg-bg-card flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Stacker1" alt="avatar" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black truncate">Stacker_X</span>
                <span className="px-1.5 py-0.5 rounded-md bg-violet/20 text-violet-light text-[10px] font-black uppercase">Lvl 7</span>
              </div>
              <div className="mt-1.5 w-full bg-white/5 rounded-full h-1 overflow-hidden">
                <div className="bg-violet-light h-full w-[65%]" />
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
            {links.map((link) => (
              <SidebarLink key={link.href} {...link} />
            ))}
          </nav>

          {/* Bottom Area */}
          <div className="mt-6 pt-6 border-t border-border">
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-text-muted hover:text-white transition group mb-4">
              <span className="text-lg group-hover:rotate-45 transition-transform duration-300">⚙️</span>
              <span className="text-sm font-bold">Settings</span>
            </Link>

            <div className="p-4 rounded-2xl bg-gradient-premium relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-xs font-black text-bg-primary uppercase tracking-widest mb-1">Upgrade Plan</span>
                <span className="text-xs font-bold text-bg-primary/70">Unlock Pro Features</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="noise" />

        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-bg-primary/50 backdrop-blur-md border-b border-border relative z-10">
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Active Challenge: YouTube 1k Subs</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border-violet/20">
              <span className="text-sm font-black text-violet-light">🔥 14 DAY STREAK</span>
            </div>

            <button className="relative p-2 rounded-xl hover:bg-white/5 transition">
              <span className="text-xl">🔔</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-coral border-2 border-bg-primary" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
