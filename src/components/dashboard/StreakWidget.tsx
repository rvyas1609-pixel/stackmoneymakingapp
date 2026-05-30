"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, AlertCircle, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { format, subDays, isSameDay } from "date-fns";

interface StreakWidgetProps {
  streak: number;
  lastActive: Date | string | null;
  tier: string;
}

export const StreakWidget = ({ streak, lastActive, tier }: StreakWidgetProps) => {
  const lastActiveDate = lastActive ? new Date(lastActive) : null;
  const isDoneToday = lastActiveDate ? isSameDay(lastActiveDate, new Date()) : false;

  const last7Days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), 6 - i));

  return (
    <Card className="relative overflow-hidden group">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center relative shadow-lg shadow-orange-500/5 group-hover:scale-110 transition-transform duration-500">
             <Flame size={28} className={`${isDoneToday ? "text-orange-500" : "text-text-muted"} transition-colors`} fill={isDoneToday ? "currentColor" : "none"} />
             {isDoneToday && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-card flex items-center justify-center"
               >
                 <div className="w-1.5 h-1.5 bg-white rounded-full" />
               </motion.div>
             )}
          </div>
          <div>
            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-0.5">Current Streak</h4>
            <p className="text-3xl font-black text-white">{streak} Days</p>
          </div>
        </div>

        {tier === 'pro' && (
           <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20">
              <ShieldCheck size={14} className="text-gold" />
              <span className="text-[10px] font-black text-gold uppercase tracking-widest">Protected</span>
           </div>
        )}
      </div>

      <div className="flex justify-between items-end gap-2 mb-6">
        {last7Days.map((day, i) => {
          const isActive = lastActiveDate ? isSameDay(day, lastActiveDate) : false;
          // In a real app, you'd check a history of active dates
          // For now, we only show today and mock the rest
          const isMockActive = isActive || (i < 5 && Math.random() > 0.3);

          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                isMockActive
                  ? "bg-orange-500/20 border-orange-500/50 text-orange-500"
                  : "bg-bg-primary border-border text-text-muted"
              }`}>
                <span className="text-[10px] font-black">{format(day, "EE")[0]}</span>
              </div>
              <span className="text-[8px] font-black text-text-muted uppercase">{format(day, "dd")}</span>
            </div>
          );
        })}
      </div>

      {!isDoneToday ? (
        <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 flex items-center gap-3">
          <AlertCircle size={16} className="text-orange-500 shrink-0" />
          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Don't break your streak! Complete a task today.</p>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center gap-3">
          <ShieldCheck size={16} className="text-green-500 shrink-0" />
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Great work! Your streak is secured for today.</p>
        </div>
      )}
    </Card>
  );
};
