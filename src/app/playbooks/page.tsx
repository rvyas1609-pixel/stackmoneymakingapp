"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Clock, BarChart, Lock, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { UpgradeGate } from "@/components/UpgradeGate";

export default function PlaybooksPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const { data: playbooks, isLoading } = useQuery({
    queryKey: ["playbooks"],
    queryFn: async () => (await api.get("/api/playbooks")).data,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/api/user")).data,
  });

  const filtered = playbooks?.filter((p: any) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.difficulty === filter;
    return matchesSearch && matchesFilter;
  });

  const difficultyDots = (difficulty: string) => {
    const count = difficulty === "Beginner" ? 1 : difficulty === "Intermediate" ? 2 : 3;
    return (
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= count ? "bg-gold shadow-gold-glow" : "bg-border"}`} />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-black text-white mb-2 font-serif uppercase tracking-tight italic">
              Income <span className="text-gradient">Playbooks</span>
            </h1>
            <p className="text-text-secondary font-medium italic opacity-70 tracking-widest uppercase text-[10px]">Proprietary wealth blueprints for the 1%.</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blueprints..."
                className="w-full bg-bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-gold outline-none transition-colors"
              />
            </div>
            <div className="flex bg-bg-card p-1 rounded-xl border border-border">
               {["All", "Beginner", "Intermediate", "Advanced"].map((t) => (
                 <button
                   key={t}
                   onClick={() => setFilter(t)}
                   className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? "bg-gold text-bg-primary shadow-gold-glow" : "text-text-muted hover:text-white"}`}
                 >
                   {t}
                 </button>
               ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {isLoading ? (
             [...Array(6)].map((_, i) => (
               <div key={i} className="h-80 rounded-[2rem] bg-bg-card animate-pulse border border-border" />
             ))
           ) : (
             <AnimatePresence>
                {filtered?.map((playbook: any, idx: number) => (
                  <motion.div
                    key={playbook.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <UpgradeGate
                      requiredTier={playbook.tier}
                      featureName={playbook.title}
                      userTier={user?.subscription?.tier || "free"}
                      preview
                    >
                      <Link href={`/playbooks/${playbook.slug}`}>
                        <Card className="h-full group relative overflow-hidden flex flex-col p-0 rounded-[2rem]">
                           <div className="h-40 bg-gradient-to-br from-bg-elevated to-bg-primary p-6 relative overflow-hidden">
                              <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
                                 <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-gold/20 backdrop-blur-md">
                                    {playbook.incomeRange}
                                 </span>
                                 <div className="bg-bg-primary/50 backdrop-blur-md px-3 py-1 rounded-full border border-border">
                                    {difficultyDots(playbook.difficulty)}
                                 </div>
                              </div>
                              {playbook.order === 1 && (
                                <div className="absolute -left-12 top-6 bg-white text-bg-primary px-12 py-1 rotate-[-45deg] text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl z-10">
                                   NEW THIS WEEK
                                </div>
                              )}
                              <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-700 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                           </div>

                           <div className="p-8 flex-1 flex flex-col">
                              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{playbook.title}</h3>
                              <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-8 flex-1">{playbook.description}</p>

                              <div className="flex items-center justify-between pt-6 border-t border-border">
                                 <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-text-muted">
                                       <Clock size={12} className="text-gold" />
                                       <span className="text-[9px] font-black uppercase tracking-widest">{playbook.timeToFirstIncome}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-text-muted">
                                       <BarChart size={12} className="text-gold" />
                                       <span className="text-[9px] font-black uppercase tracking-widest">0% Complete</span>
                                    </div>
                                 </div>
                                 <ChevronRight size={18} className="text-text-muted group-hover:text-gold group-hover:translate-x-1 transition-all" />
                              </div>
                           </div>
                        </Card>
                      </Link>
                    </UpgradeGate>
                  </motion.div>
                ))}
             </AnimatePresence>
           )}
        </div>
      </div>
    </DashboardLayout>
  );
}
