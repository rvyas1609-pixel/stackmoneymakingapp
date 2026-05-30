"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Clock,
  BarChart,
  CheckCircle2,
  Play,
  Share2,
  Bookmark,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function PlaybookDetailPage() {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [checkedItems, setChecklist] = useState<Record<string, boolean>>({});

  const { data: playbook, isLoading } = useQuery({
    queryKey: ["playbook", slug],
    queryFn: async () => (await api.get(`/api/playbooks?slug=${slug}`)).data,
  });

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
          <div className="h-8 w-48 bg-bg-card rounded" />
          <div className="h-64 bg-bg-card rounded-[3rem]" />
        </div>
      </DashboardLayout>
    );
  }

  if (!playbook) return null;

  const completedSteps = 0; // Mocked
  const progress = (completedSteps / playbook.steps?.length) * 100;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
           <Link href="/playbooks" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors group">
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Back to Library</span>
           </Link>
           <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl border border-border text-text-muted hover:text-gold transition-colors">
                 <Bookmark size={20} />
              </button>
              <button className="p-2.5 rounded-xl border border-border text-text-muted hover:text-white transition-colors">
                 <Share2 size={20} />
              </button>
           </div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-[3rem] overflow-hidden border border-gold/20 shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-bg-elevated to-bg-primary" />
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

           <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-end justify-between gap-10">
              <div className="max-w-2xl">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="bg-gold/10 text-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-gold/20 backdrop-blur-md">
                       {playbook.category}
                    </span>
                    <div className="h-1.5 w-1.5 rounded-full bg-border" />
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{playbook.difficulty}</span>
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-white font-serif leading-none italic mb-8 tracking-tighter uppercase">{playbook.title}</h1>
                 <p className="text-xl text-text-secondary font-medium leading-relaxed">{playbook.description}</p>
              </div>

              <Card className="bg-bg-primary/50 backdrop-blur-xl border-white/5 p-8 flex flex-col items-center text-center min-w-[200px]">
                 <p className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-3">Profit Potential</p>
                 <p className="text-4xl font-black text-white italic mb-1">{playbook.incomeRange}</p>
                 <p className="text-[10px] text-text-muted font-bold uppercase">per month verified</p>
              </Card>
           </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-4">
           <div className="flex justify-between items-end">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Operational Progress</h3>
              <p className="text-xs font-black text-gold italic uppercase">{Math.round(progress)}% Complete</p>
           </div>
           <div className="w-full h-2 bg-bg-card border border-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-premium shadow-gold-glow"
              />
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
           {/* Steps Accordion */}
           <div className="lg:col-span-3 space-y-4">
              {playbook.steps?.map((step: any, i: number) => (
                <div key={step.id} className="group">
                   <div
                     onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                     className={`w-full flex items-center justify-between p-8 rounded-[2rem] border transition-all cursor-pointer ${
                       expandedStep === i ? "bg-bg-card border-gold/30 shadow-gold-glow" : "bg-bg-card/50 border-border hover:border-gold/20"
                     }`}
                   >
                      <div className="flex items-center gap-6">
                         <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-black text-xl italic transition-all ${
                            expandedStep === i ? "bg-gold text-bg-primary border-gold shadow-gold-glow" : "bg-bg-primary text-text-muted border-border"
                         }`}>
                            {i + 1}
                         </div>
                         <h4 className={`text-xl font-bold transition-colors ${expandedStep === i ? "text-white" : "text-text-secondary group-hover:text-white"}`}>
                            {step.title}
                         </h4>
                      </div>
                      {expandedStep === i ? <ChevronUp size={24} className="text-gold" /> : <ChevronDown size={24} className="text-text-muted" />}
                   </div>

                   <AnimatePresence>
                      {expandedStep === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                           <div className="p-10 pt-4 space-y-8">
                              <article className="prose prose-invert max-w-none text-text-secondary leading-relaxed font-medium">
                                 <ReactMarkdown>{step.content}</ReactMarkdown>
                              </article>

                              {step.videoUrl && (
                                <div className="aspect-video w-full rounded-3xl bg-bg-primary border border-border flex items-center justify-center relative overflow-hidden group/vid">
                                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80')] bg-cover opacity-20" />
                                   <button className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-gold-glow group-hover/vid:scale-110 transition-transform">
                                      <Play size={32} fill="currentColor" className="text-bg-primary ml-1" />
                                   </button>
                                </div>
                              )}

                              {step.checklist && (
                                <div className="p-8 rounded-3xl bg-bg-primary border border-border space-y-6">
                                   <h5 className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Action Checklist</h5>
                                   <div className="space-y-4">
                                      {(step.checklist as string[]).map((item, j) => (
                                        <div key={j} onClick={() => toggleCheck(`${i}-${j}`)} className="flex items-center gap-4 group/check cursor-pointer">
                                           <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                              checkedItems[`${i}-${j}`] ? "bg-gold border-gold" : "bg-transparent border-border group-hover/check:border-gold/50"
                                           }`}>
                                              {checkedItems[`${i}-${j}`] && <CheckCircle2 size={16} className="text-bg-primary" />}
                                           </div>
                                           <span className={`text-sm font-bold transition-all ${checkedItems[`${i}-${j}`] ? "text-text-muted line-through" : "text-text-primary"}`}>{item}</span>
                                        </div>
                                      ))}
                                   </div>
                                </div>
                              )}

                              <button className="btn-premium px-10 py-4 font-black uppercase text-xs tracking-widest w-fit">
                                 Mark Step as Complete
                              </button>
                           </div>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              ))}
           </div>

           {/* Sidebar */}
           <div className="space-y-8">
              <Card className="p-8 bg-gradient-premium border-none text-bg-primary">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-bg-primary/20">
                       <MessageSquare size={24} />
                    </div>
                    <h4 className="text-xl font-black italic uppercase tracking-tight">AI Guide</h4>
                 </div>
                 <p className="text-sm font-bold opacity-80 leading-relaxed mb-10">
                    I have context on the "{playbook.title}" blueprint. Ask me anything about implementing these steps.
                 </p>
                 <Link href="/ai-coach" className="w-full py-4 rounded-2xl bg-bg-primary text-white font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                    Ask Coach
                    <ExternalLink size={14} />
                 </Link>
              </Card>

              <Card>
                 <h4 className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-6 text-center">Required Gear</h4>
                 <div className="space-y-4">
                    {playbook.tools?.map((tool: string, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-bg-primary/50">
                         <span className="text-xs font-bold text-white">{tool}</span>
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                    ))}
                 </div>
              </Card>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
