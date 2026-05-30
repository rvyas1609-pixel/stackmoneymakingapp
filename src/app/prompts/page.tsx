"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { PromptCard } from "@/components/prompts/PromptCard";
import { useRouter } from "next/navigation";
import { UpgradeGate } from "@/components/UpgradeGate";

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
    router.push("/ai-coach");
  };

  const allPrompts = packs?.flatMap((p: any) => p.prompts) || [];
  const filteredPrompts = allPrompts.filter((p: any) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    p.content.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-5xl font-black text-white mb-2 font-serif uppercase tracking-tight italic">
                Prompt <span className="text-gradient">Vault</span>
             </h1>
             <p className="text-text-secondary font-medium italic opacity-70 tracking-widest uppercase text-[10px]">1,000+ proprietary triggers for digital leverage.</p>
          </motion.div>

          <div className="relative w-full md:w-96">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
             <input
               type="text"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search triggers..."
               className="w-full bg-bg-card border border-border rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-gold outline-none transition-colors"
             />
          </div>
        </header>

        {/* Categories Sidebar/Top */}
        <div className="flex bg-bg-card p-1 rounded-2xl border border-border overflow-x-auto no-scrollbar scroll-smooth">
           {categories.map((cat) => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                 activeCategory === cat ? "bg-gold text-bg-primary shadow-gold-glow" : "text-text-muted hover:text-white"
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Featured Prompt */}
        {!isLoading && !debouncedSearch && activeCategory === "All" && (
          <Card className="bg-gradient-luxury border-none p-10 flex flex-col md:flex-row items-center gap-12 group overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
             <div className="relative z-10 w-24 h-24 rounded-[2rem] bg-bg-primary flex items-center justify-center text-5xl shadow-2xl group-hover:scale-110 transition-transform duration-700">
                ✨
             </div>
             <div className="relative z-10 flex-1 space-y-4">
                <div className="flex items-center gap-3">
                   <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[9px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md">Featured Pick</span>
                   <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Prompt of the Day</span>
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{allPrompts[0]?.title || "The Viral Script Architect"}</h2>
                <p className="text-sm text-white/70 max-w-xl font-medium leading-relaxed">
                   Optimized for high-retention short form. This prompt reverse-engineers the psychological hooks used by MrBeast and Alex Hormozi.
                </p>
                <button
                  onClick={() => handleTryCoach(allPrompts[0]?.content)}
                  className="px-8 py-3 rounded-xl bg-white text-bg-primary font-black uppercase tracking-widest text-[10px] hover:shadow-xl transition-all"
                >
                   Try in Coach
                </button>
             </div>
          </Card>
        )}

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {isLoading ? (
             [...Array(6)].map((_, i) => (
               <div key={i} className="h-64 rounded-[2rem] bg-bg-card animate-pulse border border-border" />
             ))
           ) : (
             <AnimatePresence>
                {filteredPrompts.map((p: any, idx: number) => {
                  const isLocked = idx >= (user?.subscription?.tier === 'free' ? 50 : user?.subscription?.tier === 'starter' ? 300 : 1000);

                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {isLocked ? (
                        <UpgradeGate
                          requiredTier={user?.subscription?.tier === 'free' ? 'starter' : 'pro'}
                          featureName={`Advanced Trigger #${idx + 1}`}
                          userTier={user?.subscription?.tier || 'free'}
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
      </div>
    </DashboardLayout>
  );
}
