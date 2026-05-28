"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Copy, Check, Sparkles, Filter } from "lucide-react";
import { toast } from "sonner";

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: packs, isLoading } = useQuery({
    queryKey: ["prompts", activeCategory],
    queryFn: async () => {
      const url = activeCategory === "All" ? "/api/prompts" : `/api/prompts?category=${activeCategory.toLowerCase()}`;
      const { data } = await api.get(url);
      return data;
    },
  });

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ["All", "Copywriting", "Video", "Marketing", "Automation", "Images"];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Prompt Vault</h1>
            <p className="text-text-secondary font-medium">1,000+ elite AI prompts to automate your income.</p>
          </div>

          <div className="flex items-center gap-3">
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                   activeCategory === cat ? "bg-gold text-bg-primary" : "bg-bg-card border border-border text-text-secondary hover:text-white"
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 rounded-3xl bg-bg-card animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {packs?.map((pack: any) => (
              <div key={pack.id} className="space-y-6">
                <div className="flex items-center gap-4">
                   <h2 className="text-xl font-black text-white uppercase tracking-wider">{pack.title}</h2>
                   <div className="h-[1px] flex-1 bg-border" />
                   <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">{pack.tier} access</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pack.prompts?.map((prompt: any) => (
                    <Card key={prompt.id} className="group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4">
                        <button
                          onClick={() => handleCopy(prompt.content, prompt.id)}
                          className="p-2 rounded-lg bg-bg-elevated border border-border text-text-secondary hover:text-gold transition-colors"
                        >
                          {copiedId === prompt.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>

                      <div className="mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                           <Sparkles size={16} />
                        </div>
                        <h3 className="font-bold text-white">{prompt.title}</h3>
                      </div>

                      <div className="bg-bg-primary/50 rounded-xl p-4 border border-border/50 text-xs font-medium text-text-secondary leading-relaxed h-24 overflow-hidden relative">
                         <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
                         {prompt.content}
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                         {prompt.tags?.map((tag: string) => (
                           <span key={tag} className="text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded bg-bg-elevated text-text-muted">
                              #{tag}
                           </span>
                         ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
