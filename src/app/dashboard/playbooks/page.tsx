"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, BarChart, ChevronRight, Filter, Star } from "lucide-react";
import Link from "next/link";
import { UpgradeGate } from "@/components/UpgradeGate";

export default function PlaybooksPage() {
  const [filter, setFilter] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const { data: playbooks, isLoading } = useQuery({
    queryKey: ["playbooks"],
    queryFn: async () => (await api.get("/api/playbooks")).data,
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/api/user")).data,
  });

  const categories = ["All", "Agency", "Content", "Freelancing", "Business", "Automation", "E-commerce"];

  const filtered = playbooks?.filter((p: any) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.difficulty === filter;
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesFilter && matchesCategory;
  });

  const difficultyDots = (difficulty: string) => {
    const count = difficulty === "Beginner" ? 1 : difficulty === "Intermediate" ? 2 : 3;
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= count ? "bg-gold shadow-gold-glow" : "bg-border"}`} />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif uppercase tracking-tight italic">
              Income <span className="text-gradient">Playbooks</span>
            </h1>
            <p className="text-lg text-text-secondary font-medium leading-relaxed">
               Access our proprietary database of 65+ multi-chain money-making strategies. Updated every Monday.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blueprints..."
                className="w-full bg-bg-card border border-border rounded-2xl pl-14 pr-6 py-5 text-sm text-white focus:border-gold outline-none transition-all shadow-inner"
              />
            </div>
            <button className="p-5 rounded-2xl bg-bg-card border border-border text-gold hover:bg-gold/10 transition-all shadow-inner">
               <Filter size={24} />
            </button>
          </div>
        </header>

        <div className="flex bg-bg-card p-1.5 rounded-2xl border border-border overflow-x-auto no-scrollbar scroll-smooth">
           {categories.map((c) => (
             <button
               key={c}
               onClick={() => setCategory(c)}
               className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                 category === c ? "bg-gold text-bg-primary shadow-gold-glow" : "text-text-muted hover:text-white"
               }`}
             >
               {c}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
           {isLoading ? (
             [...Array(9)].map((_, i) => (
               <div key={i} className="h-[450px] rounded-[3rem] bg-bg-card animate-pulse border border-border" />
             ))
           ) : (
             <AnimatePresence>
                {filtered?.map((playbook: any, idx: number) => (
                  <motion.div
                    key={playbook.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <UpgradeGate
                      requiredTier={playbook.tier}
                      featureName={playbook.title}
                      userTier={user?.subscription?.tier || "free"}
                      preview
                    >
                      <Link href={`/dashboard/playbooks/${playbook.slug}`}>
                        <Card className="h-full group relative overflow-hidden flex flex-col p-0 rounded-[3rem] border-border hover:border-gold/30 transition-all duration-500 shadow-2xl">
                           <div className="h-48 bg-gradient-to-br from-bg-elevated to-bg-primary p-8 relative overflow-hidden">
                              <div className="absolute top-6 right-6 z-10 flex flex-col items-end gap-3">
                                 <span className="bg-gold/10 text-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-gold/20 backdrop-blur-md">
                                    {playbook.incomeRange}
                                 </span>
                                 <div className="bg-bg-primary/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-border flex items-center gap-3">
                                    {difficultyDots(playbook.difficulty)}
                                 </div>
                              </div>
                              <div className="absolute inset-0 opacity-20 group-hover:scale-125 transition-transform duration-1000 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                           </div>

                           <div className="p-10 pt-4 flex-1 flex flex-col">
                              <div className="flex items-center gap-3 mb-4">
                                 <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">{playbook.category}</span>
                                 <div className="h-1 w-1 rounded-full bg-border" />
                                 <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">{playbook.difficulty}</span>
                              </div>
                              <h3 className="text-3xl font-black text-white mb-4 group-hover:text-gold transition-colors italic tracking-tighter uppercase leading-none">{playbook.title}</h3>
                              <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mb-10 font-medium">{playbook.description}</p>

                              <div className="mt-auto flex items-center justify-between pt-8 border-t border-border">
                                 <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-text-muted">
                                       <Clock size={16} className="text-gold" />
                                       <span className="text-[10px] font-black uppercase tracking-widest">{playbook.timeToFirstIncome || "14 Days"}</span>
                                    </div>
                                 </div>
                                 <div className="w-12 h-12 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center text-white group-hover:bg-gold group-hover:text-bg-primary transition-all shadow-lg group-hover:shadow-gold-glow">
                                    <ChevronRight size={24} />
                                 </div>
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
