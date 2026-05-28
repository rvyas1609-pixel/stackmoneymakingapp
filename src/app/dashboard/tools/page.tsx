"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { ExternalLink, Star, Search, Filter } from "lucide-react";

export default function ToolsPage() {
  const [search, setSearch] = useState("");

  const { data: tools, isLoading } = useQuery({
    queryKey: ["tools"],
    queryFn: async () => {
      const { data } = await api.get("/api/tools");
      return data;
    },
  });

  const filteredTools = tools?.filter((t: any) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">AI Tools Database</h1>
            <p className="text-text-secondary font-medium">The definitive stack for modern income generation.</p>
          </div>

          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
             <input
               type="text"
               placeholder="Search tools..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="bg-bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:border-gold outline-none w-full md:w-64 transition-colors"
             />
          </div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-3xl bg-bg-card animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools?.map((tool: any) => (
              <Card key={tool.id} className="group flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-bg-elevated border border-border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {tool.logo ? <img src={tool.logo} alt={tool.name} className="w-8 h-8 object-contain" /> : tool.name[0]}
                  </div>
                  <div className="flex items-center gap-1 text-gold">
                     <Star size={14} fill="currentColor" />
                     <span className="text-xs font-black">4.9</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{tool.name}</h3>
                <p className="text-sm text-text-secondary mb-6 flex-1 line-clamp-2">{tool.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                   {tool.categories?.map((cat: string) => (
                     <span key={cat} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-gold/10 text-gold border border-gold/20">
                        {cat}
                     </span>
                   ))}
                </div>

                <div className="flex items-center gap-4">
                   <a
                     href={tool.website}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex-1 py-3 rounded-xl bg-bg-elevated border border-border text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gold hover:text-bg-primary hover:border-gold transition-all"
                   >
                     Visit Website
                     <ExternalLink size={14} />
                   </a>
                   <div className="px-4 py-3 rounded-xl bg-bg-primary/50 border border-border text-[10px] font-black text-text-muted uppercase tracking-widest">
                      {tool.pricing}
                   </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
