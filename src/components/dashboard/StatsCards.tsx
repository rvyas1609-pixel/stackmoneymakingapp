"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { TrendingUp, Zap, Trophy, Flame } from "lucide-react";

interface StatsCardsProps {
  income: number;
  xp: number;
  streak: number;
  level: number;
}

export const StatsCards = ({ income, xp, streak, level }: StatsCardsProps) => {
  const stats = [
    {
      label: "Total Income",
      value: `$${income.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Total XP",
      value: xp.toLocaleString(),
      icon: Zap,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      label: "Day Streak",
      value: streak.toString(),
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      label: "Current Level",
      value: level.toString(),
      icon: Trophy,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="flex items-center gap-5">
          <div className={`p-4 rounded-xl ${stat.bg}`}>
            <stat.icon size={24} className={stat.color} />
          </div>
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-white">{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
