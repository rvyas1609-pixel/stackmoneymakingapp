"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, FileText, Layout, Info, ChevronRight, FileCode, CheckCircle2 } from "lucide-react";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Card } from "@/components/ui/Card";

const categories = ["All", "Templates", "Scripts", "Spreadsheets", "Frameworks", "Contracts", "Swipe Files", "Checklists"];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [previewResource, setPreviewResource] = useState<any>(null);

  const { data: resources, isLoading, isError } = useQuery({
    queryKey: ["resources", activeCategory],
    queryFn: async () => {
      const url = activeCategory === "All" ? "/api/resources" : `/api/resources?category=${activeCategory}`;
      return (await api.get(url)).data;
    },
  });

  const filtered = resources?.filter((r: any) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  const mostDownloaded = resources?.slice()
    .sort((a: any, b: any) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-12">
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
             <h1 className="text-5xl md:text-7xl font-black text-white mb-4 font-serif uppercase tracking-tight italic leading-none">
                Asset <span className="text-gradient">Library</span>
             </h1>
             <p className="text-lg text-text-secondary font-medium leading-relaxed italic opacity-80 tracking-widest uppercase text-[10px]">
                Downloadable blueprints, legal contracts, and automation spreadsheets to scale operations.
             </p>
          </motion.div>

          <div className="relative w-full xl:w-[450px]">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted" size={24} />
             <input
               type="text"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search assets by name or use case..."
               className="w-full bg-bg-card border border-border rounded-2xl pl-16 pr-6 py-6 text-sm text-white focus:border-gold outline-none transition-all shadow-inner"
             />
          </div>
        </header>

        {/* Most Downloaded */}
        {!isLoading && mostDownloaded && !search && activeCategory === "All" && (
          <section className="space-y-6">
             <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-gold" />
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Hustler Favorites</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mostDownloaded.map((r: any) => (
                  <Card
                    key={r.id}
                    onClick={() => setPreviewResource(r)}
                    className="bg-gradient-luxury border-none p-8 flex items-center gap-6 group overflow-hidden relative cursor-pointer rounded-[2.5rem]"
                  >
                     <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="relative z-10 w-16 h-16 rounded-2xl bg-bg-primary/50 border border-white/5 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                        {r.type === 'pdf' ? <FileText size={28} /> : <Layout size={28} />}
                     </div>
                     <div className="relative z-10 flex-1 min-w-0">
                        <h3 className="font-black text-white truncate text-lg italic tracking-tight uppercase leading-none mb-2">{r.title}</h3>
                        <div className="flex items-center gap-3">
                           <span className="text-[9px] text-gold font-black uppercase tracking-widest">{r.downloads} Downloads</span>
                           <div className="w-1 h-1 rounded-full bg-border" />
                           <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">{r.category}</span>
                        </div>
                     </div>
                     <ChevronRight size={20} className="text-white/20 group-hover:text-gold transition-colors" />
                  </Card>
                ))}
             </div>
          </section>
        )}

        {/* Category Toggles */}
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

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
           {isLoading ? (
             [...Array(9)].map((_, i) => (
               <div key={i} className="h-80 rounded-[3rem] bg-bg-card animate-pulse border border-border" />
             ))
           ) : isError ? (
             <div className="col-span-full py-40 text-center glass-elevated rounded-[3rem]">
                <p className="text-red-400 font-black uppercase tracking-widest">Supabase Request Timeout</p>
             </div>
           ) : (
             <AnimatePresence>
                {filtered?.map((r: any) => (
                  <ResourceCard key={r.id} resource={r} onPreview={setPreviewResource} />
                ))}
             </AnimatePresence>
           )}
        </div>
      </div>

      {/* Modern Preview Modal */}
      <AnimatePresence>
        {previewResource && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreviewResource(null)} className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl" />
             <motion.div
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-2xl bg-bg-card border border-border rounded-[4rem] overflow-hidden shadow-2xl"
             >
                <div className="p-16 space-y-10">
                   <div className="flex items-start justify-between">
                      <div className="flex items-center gap-8">
                         <div className="w-24 h-24 rounded-[2rem] bg-bg-primary flex items-center justify-center text-gold border border-gold/20 shadow-2xl shadow-gold-glow/5">
                            {previewResource.type === 'pdf' ? <FileText size={48} /> : <Layout size={48} />}
                         </div>
                         <div>
                            <div className="flex items-center gap-3 mb-2">
                               <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">{previewResource.category}</span>
                               <span className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[8px] font-black uppercase">{previewResource.tier}</span>
                            </div>
                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{previewResource.title}</h2>
                         </div>
                      </div>
                      <button onClick={() => setPreviewResource(null)} className="p-3 rounded-2xl bg-bg-elevated border border-border text-text-muted hover:text-white transition-all"><X size={24} /></button>
                   </div>

                   <p className="text-xl text-text-secondary leading-relaxed font-medium">{previewResource.description}</p>

                   <div className="p-10 rounded-[3rem] bg-bg-primary border border-border">
                      <div className="grid grid-cols-2 gap-12">
                         <div className="space-y-2">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Format</p>
                            <p className="text-lg font-black text-white uppercase italic">{previewResource.type}</p>
                         </div>
                         <div className="space-y-2">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Status</p>
                            <p className="text-lg font-black text-green-400 uppercase italic">Verified</p>
                         </div>
                      </div>
                   </div>

                   <button className="w-full btn-premium py-6 text-xl font-black uppercase tracking-[0.2em] shadow-gold-glow">
                      Instant Access Download
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
