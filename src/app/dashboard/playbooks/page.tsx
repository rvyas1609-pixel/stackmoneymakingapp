"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PlaybookCard } from "@/components/dashboard/PlaybookCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Search, Filter } from "lucide-react";

export default function PlaybooksPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data: playbooks, isLoading } = useQuery({
    queryKey: ["playbooks"],
    queryFn: async () => {
      const { data } = await api.get("/api/playbooks");
      return data;
    },
  });

  const categories = ["All", "AI Agency", "Content", "Automation", "E-commerce", "Freelancing"];

  const filteredPlaybooks = playbooks?.filter((p: any) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Income Playbooks</h1>
            <p className="text-text-secondary font-medium">Proven, step-by-step blueprints for the AI economy.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input
                type="text"
                placeholder="Search methods..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:border-gold outline-none w-full md:w-64 transition-colors"
              />
            </div>
            <button className="p-3 rounded-xl bg-bg-card border border-border text-text-secondary hover:text-gold transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </header>

        <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                category === cat
                  ? "bg-gold border-gold text-bg-primary"
                  : "bg-transparent border-border text-text-secondary hover:border-gold/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-3xl bg-bg-card animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlaybooks?.map((playbook: any) => (
              <PlaybookCard key={playbook.id} playbook={playbook} />
            ))}
          </div>
        )}

        {!isLoading && filteredPlaybooks?.length === 0 && (
          <div className="text-center py-20 glass-elevated rounded-[3rem]">
             <div className="text-6xl mb-6">🔍</div>
             <h3 className="text-2xl font-bold text-white mb-2">No playbooks found</h3>
             <p className="text-text-secondary">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
