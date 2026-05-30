"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Layout, FileCode, CheckCircle2, Eye, Bookmark, Share2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { toast } from "sonner";
import axios from "axios";

interface ResourceCardProps {
  resource: any;
  onPreview: (resource: any) => void;
}

export const ResourceCard = ({ resource, onPreview }: ResourceCardProps) => {
  const [isDownloading, setIsSubmitting] = useState(false);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "notion": return <Layout className="text-blue-400" />;
      case "pdf": return <FileText className="text-red-400" />;
      case "doc": return <FileCode className="text-blue-500" />;
      case "sheet": return <CheckCircle2 className="text-green-400" />;
      default: return <FileText className="text-gold" />;
    }
  };

  const handleDownload = async () => {
    setIsSubmitting(true);
    toast.success(`Downloading ${resource.title}...`);
    try {
      await axios.post(`/api/resources/${resource.id}`);
      // In a real app, window.open(resource.downloadUrl);
    } catch (e) {
      console.error("Failed to log download");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card className="h-full flex flex-col group border-border hover:border-gold/30 transition-all duration-500 rounded-[2rem] overflow-hidden p-0 bg-bg-card/50">
        <div className="p-8 flex-1">
          <div className="flex items-center justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-bg-primary flex items-center justify-center border border-border group-hover:scale-110 transition-transform shadow-lg">
               {getIcon(resource.type)}
            </div>
            <div className="flex flex-col items-end gap-1.5">
               <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border ${
                 resource.tier === 'free' ? 'border-text-muted text-text-muted' : 'border-gold text-gold bg-gold/5'
               }`}>
                 {resource.tier}
               </span>
               <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest">{resource.downloads} Downloads</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{resource.title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-8 font-medium">{resource.description}</p>

          <div className="flex flex-wrap gap-2">
             {resource.tags?.map((tag: string) => (
               <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-bg-primary text-text-muted border border-border">{tag}</span>
             ))}
          </div>
        </div>

        <div className="p-6 bg-bg-primary/30 border-t border-border flex gap-3">
           <button
             onClick={() => onPreview(resource)}
             className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-bg-elevated border border-border text-white font-black uppercase text-[10px] tracking-widest hover:border-gold transition-all"
           >
              <Eye size={16} /> Preview
           </button>
           <button
             onClick={handleDownload}
             disabled={isDownloading}
             className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-premium text-bg-primary font-black uppercase text-[10px] tracking-widest shadow-gold-glow"
           >
              <Download size={16} /> {isDownloading ? "..." : "Download"}
           </button>
        </div>
      </Card>
    </motion.div>
  );
};
