"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Filter, Bookmark, Copy, Play, Zap, Info } from "lucide-react";
import { PromptCard } from "@/components/prompts/PromptCard";
import { useRouter } from "next/navigation";
import { UpgradeGate } from "@/components/UpgradeGate";
import { Card } from "@/components/ui/Card";

const categories = [
  "All",
  "Copywriting",
  "YouTube Scripts",
  "Email Marketing",
  "Social Media",
  "Sales",
  "Coding",
  "Business Plans",
  "Research",
  "SEO",
  "Cold Outreach",
  "Personal Brand"
];

export default function PromptsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: packs, isLoading } = useQuery({
    queryKey: ["prompts", activeCategory, debouncedSearch],
    queryFn: async () => {
      const url = activeCategory === "All" ? "/api/prompts" : `/api/prompts?category=${activeCategory}`;
      return (await api.get(url)).data;
    },
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/api/user")).data,
  });

  const handleTryCoach = (content: string) => {
    localStorage.setItem("stack_coach_prefill", content);
    router.push("/dashboard/ai-coach");
  };

  const allPrompts = packs?.flatMap((p: any) => p.prompts) || [];
  const filteredPrompts = allPrompts.filter((p: any) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    p.content.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
             <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif uppercase tracking-tight italic leading-none">
                Prompt <span className="text-gradient">Vault</span>
             </h1>
             <p className="text-lg text-text-secondary font-medium leading-relaxed italic opacity-80 tracking-widest uppercase text-[10px]">
                Proprietary algorithmic triggers for maximal digital leverage. 1000+ elite presets.
             </p>
          </motion.div>

          <div className="relative w-full xl:w-[450px]">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={24} />
             <input
               type="text"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search triggers by keyword..."
               className="w-full bg-bg-card border border-border rounded-2xl pl-16 pr-6 py-6 text-sm text-white focus:border-gold outline-none transition-all shadow-inner"
             />
          </div>
        </header>

        {/* Categories Bar */}
        <div className="flex bg-bg-card p-1.5 rounded-2xl border border-border overflow-x-auto no-scrollbar scroll-smooth">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-10 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                 activeCategory === cat ? "bg-gold text-bg-primary shadow-gold-glow" : "text-text-muted hover:text-white"
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Featured Prompt of the Day */}
        {!isLoading && !debouncedSearch && activeCategory === "All" && allPrompts.length > 0 && (
          <Card className="bg-gradient-luxury border-none p-12 flex flex-col md:flex-row items-center gap-16 group overflow-hidden relative rounded-[3rem]">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
             <div className="relative z-10 w-32 h-32 rounded-[2.5rem] bg-bg-primary border border-white/5 flex items-center justify-center text-6xl shadow-2xl group-hover:scale-110 transition-transform duration-1000">
                🚀
             </div>
             <div className="relative z-10 flex-1 space-y-6">
                <div className="flex items-center gap-4">
                   <span className="px-4 py-2 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md">Elite Selection</span>
                   <div className="flex items-center gap-2 text-gold">
                      <Sparkles size={16} fill="currentColor" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Prompt of the Day</span>
                   </div>
                </div>
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{allPrompts[0].title}</h2>
                <p className="text-lg text-white/70 max-w-2xl font-medium leading-relaxed">
                   Engineered for viral retention. This trigger uses the 'Controversial Paradox' framework to force massive engagement on LinkedIn and Twitter.
                </p>
                <div className="flex items-center gap-6">
                   <button
                     onClick={() => handleTryCoach(allPrompts[0].content)}
                     className="px-12 py-4 rounded-2xl bg-white text-bg-primary font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                   >
                      Test in Coach
                   </button>
                   <div className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-widest">
                      <Info size={14} />
                      Verified 98% Output Quality
                   </div>
                </div>
             </div>
          </Card>
        )}

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
           {isLoading ? (
             [...Array(9)].map((_, i) => (
               <div key={i} className="h-96 rounded-[3rem] bg-bg-card animate-pulse border border-border" />
             ))
           ) : (
             <AnimatePresence>
                {filteredPrompts.map((p: any, idx: number) => {
                  const userTier = user?.subscription?.tier || 'free';
                  const tierLimits: Record<string, number> = { free: 50, starter: 300, pro: 1000, elite: 5000 };
                  const isLocked = idx >= (tierLimits[userTier] || 50);

                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (idx % 20) * 0.02 }}
                    >
                      {isLocked ? (
                        <UpgradeGate
                          requiredTier={userTier === 'free' ? 'starter' : 'pro'}
                          featureName={`Advanced Trigger #${idx + 1}`}
                          userTier={userTier}
                          preview
                        >
                           <PromptCard prompt={p} onTry={handleTryCoach} />
                        </UpgradeGate>
                      ) : (
                        <PromptCard prompt={p} onTry={handleTryCoach} />
                      )}
                    </motion.div>
                  );
                })}
             </AnimatePresence>
           )}
        </div>

        {!isLoading && filteredPrompts.length === 0 && (
           <div className="text-center py-40 border border-dashed border-border rounded-[3rem] bg-bg-card/20">
              <p className="text-2xl font-black text-white italic uppercase opacity-50 tracking-tighter">System Zero Results</p>
           </div>
        )}
      </div>
    </DashboardLayout>
  );
}
