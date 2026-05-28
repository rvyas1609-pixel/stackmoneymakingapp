"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { CheckCircle2, Circle, MapPin, Flag, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RoadmapPage() {
  const [activeRoadmap, setActiveRoadmap] = useState<any>(null);

  const { data: roadmaps, isLoading } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const { data } = await api.get("/api/roadmap");
      if (data.length > 0 && !activeRoadmap) setActiveRoadmap(data[0]);
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Your Roadmap</h1>
            <p className="text-text-secondary font-medium">Strategic action plans from $0 to financial independence.</p>
          </div>

          <div className="flex items-center gap-3">
             {roadmaps?.map((r: any) => (
               <button
                 key={r.id}
                 onClick={() => setActiveRoadmap(r)}
                 className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                   activeRoadmap?.id === r.id ? "bg-gold text-bg-primary" : "bg-bg-card border border-border text-text-secondary hover:text-white"
                 }`}
               >
                 {r.title}
               </button>
             ))}
          </div>
        </header>

        {isLoading ? (
          <div className="h-64 rounded-3xl bg-bg-card animate-pulse border border-border" />
        ) : activeRoadmap && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1 space-y-6">
               <Card className="bg-gradient-luxury border-none text-white">
                  <div className="w-12 h-12 rounded-xl bg-bg-primary/20 flex items-center justify-center mb-6">
                     <Flag size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{activeRoadmap.title}</h3>
                  <p className="text-sm text-white/80 mb-8">{activeRoadmap.description}</p>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>Progress</span>
                        <span>0%</span>
                     </div>
                     <div className="w-full h-2 bg-bg-primary/30 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-white" />
                     </div>
                  </div>
               </Card>

               <Card>
                  <h4 className="text-[10px] font-black text-gold uppercase tracking-[0.2em] mb-4">Details</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-text-muted uppercase">Duration</span>
                        <span className="text-xs font-black text-white">{activeRoadmap.duration} Days</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-text-muted uppercase">Difficulty</span>
                        <span className="text-xs font-black text-white">{activeRoadmap.difficulty}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-text-muted uppercase">Milestones</span>
                        <span className="text-xs font-black text-white">{activeRoadmap.milestones?.length}</span>
                     </div>
                  </div>
               </Card>
            </div>

            <div className="lg:col-span-3">
               <div className="relative pl-8 space-y-12">
                  <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-border/50 border-dashed border-l" />

                  {activeRoadmap.milestones?.map((milestone: any, i: number) => (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                       <div className="absolute -left-[33px] top-1 w-8 h-8 rounded-full bg-bg-primary border-2 border-border flex items-center justify-center group-hover:border-gold transition-colors z-10">
                          {i === 0 ? <MapPin size={14} className="text-gold" /> : <Circle size={10} className="text-text-muted" />}
                       </div>

                       <Card className="hover:border-gold/30 transition-all">
                          <div className="flex items-center justify-between mb-2">
                             <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Day {milestone.day}</span>
                             <button className="text-[10px] font-black text-text-muted uppercase tracking-widest hover:text-white transition-colors">Mark as complete</button>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">{milestone.title}</h4>
                          <p className="text-sm text-text-secondary leading-relaxed mb-6">{milestone.description}</p>

                          <div className="flex items-center gap-2 text-xs font-black text-gold uppercase tracking-widest">
                             View Module
                             <ChevronRight size={14} />
                          </div>
                       </Card>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
