"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Sparkles, Bookmark, Share2, Play } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { toast } from "sonner";
import axios from "axios";

interface PromptCardProps {
  prompt: any;
  onTry?: (content: string) => void;
}

export const PromptCard = ({ prompt, onTry }: PromptCardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopy = async () => {
    navigator.clipboard.writeText(prompt.content);
    setIsCopied(true);
    toast.success("Prompt copied to clipboard!");

    // Log usage to analytics
    try {
      await axios.post(`/api/prompts/${prompt.id}`);
    } catch (e) {
      console.error("Failed to log prompt usage");
    }

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <Card className="h-full flex flex-col p-8 border-border hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button
             onClick={() => setIsSaved(!isSaved)}
             className={`p-2 rounded-lg border border-border bg-bg-primary/80 backdrop-blur-md transition-colors ${isSaved ? "text-gold border-gold/30" : "text-text-muted hover:text-white"}`}
           >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
           </button>
           <button className="p-2 rounded-lg border border-border bg-bg-primary/80 backdrop-blur-md text-text-muted hover:text-white transition-colors">
              <Share2 size={16} />
           </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
             <Sparkles size={20} />
          </div>
          <div>
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-0.5 block">{prompt.category}</span>
            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-gold transition-colors">{prompt.title}</h3>
          </div>
        </div>

        <p className="text-xs text-text-muted font-bold uppercase tracking-widest mb-3">The Blueprint</p>
        <div className="bg-bg-primary/50 border border-border rounded-2xl p-5 mb-8 relative group/inner">
           <p className="text-sm text-text-secondary leading-relaxed line-clamp-4 font-medium italic">
             "{prompt.content}"
           </p>
           <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-card to-transparent rounded-b-2xl group-hover/inner:opacity-0 transition-opacity" />
        </div>

        <p className="text-xs text-text-muted font-bold uppercase tracking-widest mb-4">Optimal Use Case</p>
        <p className="text-[11px] text-text-secondary font-medium leading-relaxed mb-8 flex-1">{prompt.useCase}</p>

        <div className="flex gap-3">
           <button
             onClick={handleCopy}
             className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-bg-elevated border border-border text-white font-black uppercase text-[10px] tracking-widest hover:bg-gold hover:text-bg-primary hover:border-gold transition-all"
           >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
              {isCopied ? "Copied" : "Copy Prompt"}
           </button>
           <button
             onClick={() => onTry?.(prompt.content)}
             className="w-12 flex items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-gold hover:bg-gold hover:text-bg-primary transition-all"
           >
              <Play size={16} fill="currentColor" />
           </button>
        </div>
      </Card>
    </motion.div>
  );
};
