"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Zap,
  Library,
  MessageSquare,
  TrendingUp,
  Map,
  Users,
  Wrench,
  Trophy,
  Settings,
  LogOut,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: BookOpen, label: "Playbooks", href: "/dashboard/playbooks" },
  { icon: Zap, label: "Prompt Vault", href: "/dashboard/prompts" },
  { icon: Library, label: "Resources", href: "/dashboard/resources" },
  { icon: MessageSquare, label: "AI Coach", href: "/dashboard/ai-coach" },
  { icon: TrendingUp, label: "Income", href: "/dashboard/income" },
  { icon: Map, label: "Roadmap", href: "/dashboard/roadmap" },
  { icon: Users, label: "Community", href: "/dashboard/community" },
  { icon: Wrench, label: "Tools", href: "/dashboard/tools" },
  { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-bg-card border-r border-border flex flex-col fixed left-0 top-0 z-[50]">
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center">
          <svg className="w-5 h-5 text-bg-primary fill-current" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14H11V21L20 10H13Z" />
          </svg>
        </div>
        <span className="text-xl font-black tracking-tighter text-white">STACK</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2 py-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                isActive
                  ? "bg-gold/10 text-gold"
                  : "text-text-secondary hover:bg-white/5 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-gold rounded-r-full"
                />
              )}
              <item.icon size={20} className={isActive ? "text-gold" : "group-hover:text-gold transition-colors"} />
              <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-secondary hover:bg-white/5 hover:text-white transition-all"
        >
          <Settings size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Settings</span>
        </Link>
        <SignOutButton>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Sign Out</span>
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
};
