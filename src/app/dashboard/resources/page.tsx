"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Download, FileText, Layout, FileCode, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources", activeCategory],
    queryFn: async () => {
      const url = activeCategory === "All" ? "/api/resources" : `/api/resources?category=${activeCategory.toLowerCase()}`;
      const { data } = await api.get(url);
      return data;
    },
  });

  const handleDownload = (title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  const categories = ["All", "Templates", "Scripts", "Frameworks", "Legal"];

  const getIcon = (type: string) => {
    switch (type) {
      case "notion": return <Layout className="text-blue-400" />;
      case "pdf": return <FileText className="text-red-400" />;
      case "doc": return <FileCode className="text-blue-500" />;
      case "sheet": return <CheckCircle2 className="text-green-400" />;
      default: return <FileText className="text-gold" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Resource Library</h1>
            <p className="text-text-secondary font-medium">Download templates, scripts, and frameworks to scale faster.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-3xl bg-bg-card animate-pulse border border-border" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources?.map((resource: any) => (
              <Card key={resource.id} className="group flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(resource.type)}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                    resource.tier === 'free' ? 'border-text-secondary text-text-secondary' : 'border-gold text-gold'
                  }`}>
                    {resource.tier}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{resource.title}</h3>
                <p className="text-sm text-text-secondary mb-8 flex-1">{resource.description}</p>

                <button
                  onClick={() => handleDownload(resource.title)}
                  className="w-full py-4 rounded-xl bg-bg-elevated border border-border text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-gold hover:text-bg-primary hover:border-gold transition-all"
                >
                  <Download size={16} />
                  Download {resource.type}
                </button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
