"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AICoachChat } from "@/components/dashboard/AICoachChat";
import { Card } from "@/components/ui/Card";
import { Lightbulb, MessageSquare, Zap, Target } from "lucide-react";

export default function AICoachPage() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header>
          <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">AI Coach</h1>
          <p className="text-text-secondary font-medium">Your 24/7 strategic partner for building your digital empire.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <AICoachChat />
          </div>

          <div className="space-y-6">
            <Card>
              <h4 className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Lightbulb size={16} />
                Try Asking
              </h4>
              <div className="space-y-4">
                {[
                  "How do I land my first AI agency client?",
                  "Which playbook fits my 10hr/week schedule?",
                  "Write a cold DM script for TikTok creators.",
                  "Explain the YouTube Automation business model.",
                ].map((q, i) => (
                  <button
                    key={i}
                    className="text-left text-xs font-bold text-text-secondary hover:text-white transition-colors p-3 rounded-xl border border-border hover:border-gold/30 w-full"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </Card>

            <Card className="bg-gradient-premium border-none text-bg-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-bg-primary/20">
                  <Target size={20} className="text-bg-primary" />
                </div>
                <h4 className="font-bold">Coach Memory</h4>
              </div>
              <p className="text-xs font-medium text-bg-primary/80 leading-relaxed">
                I remember your goals and skills to provide personalized advice every time we chat.
              </p>
            </Card>

            <div className="p-6 rounded-2xl border border-dashed border-border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-bg-card flex items-center justify-center mb-4 text-text-muted">
                <MessageSquare size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">History</p>
              <p className="text-xs text-text-muted font-medium italic">No previous chats found.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
