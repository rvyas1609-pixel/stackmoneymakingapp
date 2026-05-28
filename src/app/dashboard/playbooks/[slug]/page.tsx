"use client";

import React from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/Card";
import { ChevronLeft, Clock, BarChart, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PlaybookDetailPage() {
  const { slug } = useParams();

  const { data: playbook, isLoading } = useQuery({
    queryKey: ["playbook", slug],
    queryFn: async () => {
      const { data } = await api.get(`/api/playbooks?slug=${slug}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-bg-card rounded" />
          <div className="h-64 bg-bg-card rounded-3xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (!playbook) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-white">Playbook not found</h2>
          <Link href="/dashboard/playbooks" className="text-gold mt-4 inline-block">Back to Playbooks</Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <Link
          href="/dashboard/playbooks"
          className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Playbooks</span>
        </Link>

        <header className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-2xl bg-gradient-premium flex items-center justify-center text-4xl shadow-gold-glow">
                {playbook.icon}
             </div>
             <div>
                <h1 className="text-4xl md:text-5xl font-black text-white font-serif">{playbook.title}</h1>
                <div className="flex items-center gap-6 mt-2">
                   <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-widest">
                      <BarChart size={14} className="text-gold" />
                      <span>{playbook.range}</span>
                   </div>
                   <div className="flex items-center gap-1.5 text-xs font-bold text-text-muted uppercase tracking-widest">
                      <Clock size={14} className="text-gold" />
                      <span>{playbook.timeCommitment}</span>
                   </div>
                </div>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <article className="prose prose-invert max-w-none prose-gold">
                <ReactMarkdown>{playbook.content}</ReactMarkdown>
              </article>
            </Card>

            <div className="space-y-4">
               <h3 className="text-xl font-bold text-white">Action Steps</h3>
               {playbook.steps?.map((step: any, i: number) => (
                 <Card key={i} className="flex gap-6 items-start">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-black flex-shrink-0 border border-gold/20">
                       {i + 1}
                    </div>
                    <div>
                       <h4 className="font-bold text-white mb-2">{step.heading}</h4>
                       <p className="text-sm text-text-secondary leading-relaxed">{step.body}</p>
                    </div>
                 </Card>
               ))}
            </div>
          </div>

          <div className="space-y-6">
             <Card>
                <h4 className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-6">Required Tools</h4>
                <ul className="space-y-3">
                   {playbook.tools?.map((tool: string, i: number) => (
                     <li key={i} className="flex items-center gap-2 text-sm font-bold text-text-primary">
                        <CheckCircle2 size={16} className="text-green-400" />
                        {tool}
                     </li>
                   ))}
                </ul>
             </Card>

             <Card className="bg-gradient-luxury border-none">
                <h4 className="text-sm font-black text-white mb-4">Need Help?</h4>
                <p className="text-xs text-white/80 mb-6 leading-relaxed">
                   Stuck on this playbook? Ask your AI Coach for specific advice on how to implement this strategy.
                </p>
                <Link href="/dashboard/ai-coach" className="w-full py-3 rounded-xl bg-bg-primary text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                   Ask AI Coach
                </Link>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
