"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, FileText } from "lucide-react";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { Card } from "@/components/ui/Card";

const categories = ["All", "Templates", "Scripts", "Spreadsheets", "Frameworks", "Contracts", "Swipe Files", "Checklists"];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [previewResource, setPreviewResource] = useState<any>(null);

  const { data: resources, isLoading } = useQuery({
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

  const mostDownloaded = resources?.sort((a: any, b: any) => b.downloads - a.downloads).slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-5xl font-black text-white mb-2 font-serif uppercase tracking-tight italic">
                Resource <span className="text-gradient">Library</span>
             </h1>
             <p className="text-text-secondary font-medium italic opacity-70 tracking-widest uppercase text-[10px]">Elite templates & automation frameworks.</p>
          </motion.div>

          <div className="relative w-full md:w-96">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
             <input
               type="text"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search assets..."
               className="w-full bg-bg-card border border-border rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-gold outline-none transition-colors"
             />
          </div>
        </header>

        {/* Most Downloaded Section */}
        {!isLoading && mostDownloaded && !search && activeCategory === "All" && (
          <section className="space-y-6">
             <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-gold" />
                <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">Popular Downloads</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mostDownloaded.map((r: any) => (
                  <Card key={r.id} className="bg-gradient-luxury border-none p-6 flex flex-col gap-4 group overflow-hidden">
                     <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-bg-primary/50 flex items-center justify-center text-white">
                           {r.type === 'pdf' ? <FileText size={20} /> : <Layout size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                           <h3 className="font-bold text-white truncate text-sm">{r.title}</h3>
                           <p className="text-[10px] text-white/50 font-black uppercase tracking-widest">{r.downloads} Downloads</p>
                        </div>
                     </div>
                  </Card>
                ))}
             </div>
          </section>
        )}

        {/* Categories */}
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

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {isLoading ? (
             [...Array(6)].map((_, i) => (
               <div key={i} className="h-64 rounded-[2rem] bg-bg-card animate-pulse border border-border" />
             ))
           ) : (
             <AnimatePresence>
                {filtered?.map((r: any) => (
                  <ResourceCard key={r.id} resource={r} onPreview={setPreviewResource} />
                ))}
             </AnimatePresence>
           )}
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewResource && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreviewResource(null)} className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md" />
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative w-full max-w-2xl bg-bg-card border border-border rounded-[3rem] overflow-hidden shadow-2xl"
             >
                <div className="p-12 space-y-8">
                   <div className="flex items-start justify-between">
                      <div className="flex items-center gap-6">
                         <div className="w-20 h-20 rounded-3xl bg-bg-primary flex items-center justify-center text-gold border border-border shadow-xl">
                            {previewResource.type === 'pdf' ? <FileText size={40} /> : <Layout size={40} />}
                         </div>
                         <div>
                            <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-1 block">{previewResource.category}</span>
                            <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">{previewResource.title}</h2>
                         </div>
                      </div>
                      <button onClick={() => setPreviewResource(null)} className="p-2 rounded-xl bg-bg-elevated border border-border text-text-muted hover:text-white"><X size={24} /></button>
                   </div>

                   <p className="text-lg text-text-secondary leading-relaxed font-medium">{previewResource.description}</p>

                   <div className="p-8 rounded-3xl bg-bg-primary border border-border">
                      <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-6">Asset Intelligence</h4>
                      <div className="grid grid-cols-2 gap-8">
                         <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">File Format</p>
                            <p className="text-sm font-black text-white uppercase">{previewResource.type}</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Membership Required</p>
                            <p className="text-sm font-black text-gold uppercase">{previewResource.tier}</p>
                         </div>
                      </div>
                   </div>

                   <button className="w-full btn-premium py-5 text-lg font-black uppercase tracking-widest shadow-gold-glow">
                      Download Full Asset
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
