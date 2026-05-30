"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Plus, DollarSign, TrendingUp, Calendar, Tag, Lock, Unlock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function IncomePage() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    source: "AI Agency",
    notes: "",
    isPublic: true,
  });

  const { data: entries, isLoading } = useQuery({
    queryKey: ["income"],
    queryFn: async () => (await api.get("/api/income")).data,
  });

  const { data: playbooks } = useQuery({
    queryKey: ["playbooks"],
    queryFn: async () => (await api.get("/api/playbooks")).data,
  });

  const logMutation = useMutation({
    mutationFn: async (data: any) => (await api.post("/api/income", data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Income logged! +100 XP awarded.");
      setIsAdding(false);
      setFormData({ amount: "", source: "AI Agency", notes: "", isPublic: true });
    },
  });

  const totalAllTime = entries?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Income Logger</h1>
            <p className="text-text-secondary font-medium">Verify your wins and watch your progress to $10K/mo.</p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="btn-premium flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            Log New Win
          </button>
        </header>

        <AnimatePresence>
          {isAdding && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card className="border-gold/30 bg-gold/5 overflow-hidden">
                 <form
                   onSubmit={(e) => { e.preventDefault(); logMutation.mutate(formData); }}
                   className="p-4 grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
                 >
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gold uppercase tracking-widest">Amount ($)</label>
                       <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                          <input
                            required
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            placeholder="0.00"
                            className="w-full bg-bg-primary border border-border rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-gold outline-none"
                          />
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gold uppercase tracking-widest">Revenue Source</label>
                       <div className="relative">
                          <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                          <select
                            value={formData.source}
                            onChange={(e) => setFormData({...formData, source: e.target.value})}
                            className="w-full bg-bg-primary border border-border rounded-xl pl-12 pr-4 py-4 text-sm text-white focus:border-gold outline-none appearance-none cursor-pointer"
                          >
                             <option>AI Agency</option>
                             <option>YouTube Automation</option>
                             <option>Freelancing</option>
                             <option>TikTok Creativity</option>
                             <option>Micro-SaaS</option>
                             <option>Other</option>
                          </select>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gold uppercase tracking-widest">Privacy Setting</label>
                       <div className="flex gap-2 p-1 bg-bg-primary rounded-xl border border-border">
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, isPublic: true})}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase transition-all ${formData.isPublic ? "bg-gold text-bg-primary" : "text-text-muted hover:text-white"}`}
                          >
                             <Eye size={14} /> Public
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, isPublic: false})}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase transition-all ${!formData.isPublic ? "bg-bg-elevated text-white" : "text-text-muted hover:text-white"}`}
                          >
                             <EyeOff size={14} /> Private
                          </button>
                       </div>
                    </div>

                    <button
                      type="submit"
                      disabled={logMutation.isPending}
                      className="btn-premium py-4 font-black uppercase text-sm tracking-widest"
                    >
                       {logMutation.isPending ? "Logging..." : "Post Win"}
                    </button>
                 </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <Card className="lg:col-span-2">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xl font-bold text-white">Earnings History</h3>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Total Verified</p>
                    <p className="text-4xl font-black text-white italic tracking-tighter">${totalAllTime.toLocaleString()}</p>
                 </div>
              </div>

              <div className="space-y-6">
                 {isLoading ? (
                   [1,2,3].map(i => <div key={i} className="h-16 bg-bg-primary rounded-2xl animate-pulse" />)
                 ) : entries?.length === 0 ? (
                   <div className="text-center py-20 border border-dashed border-border rounded-3xl">
                      <p className="text-text-secondary">No entries found. Log your first win to start your journey.</p>
                   </div>
                 ) : (
                   entries.map((entry: any) => (
                     <div key={entry.id} className="flex items-center justify-between p-5 rounded-2xl bg-bg-primary/50 border border-border group hover:border-gold/30 transition-all">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-lg group-hover:scale-110 transition-transform">
                              <TrendingUp size={24} />
                           </div>
                           <div>
                              <p className="font-bold text-white group-hover:text-gold transition-colors">{entry.source}</p>
                              <div className="flex items-center gap-2 mt-1">
                                 <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{format(new Date(entry.date), "MMM dd, yyyy")}</p>
                                 <div className="w-1 h-1 rounded-full bg-border" />
                                 <div className="flex items-center gap-1">
                                    {entry.isPublic ? <Eye size={10} className="text-text-muted" /> : <EyeOff size={10} className="text-text-muted" />}
                                    <span className="text-[8px] font-black text-text-muted uppercase">{entry.isPublic ? "Public" : "Private"}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-xl font-black text-green-400">+$ {entry.amount.toLocaleString()}</p>
                        </div>
                     </div>
                   ))
                 )}
              </div>
           </Card>

           <div className="space-y-8">
              <Card className="bg-gradient-premium border-none text-bg-primary p-8">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-bg-primary/20">
                       <Zap size={24} fill="currentColor" />
                    </div>
                    <h4 className="text-xl font-black italic uppercase tracking-tight leading-none">Power Up</h4>
                 </div>
                 <p className="text-sm font-bold opacity-80 leading-relaxed mb-8">
                    Logging income awards you 100 XP and keeps your daily streak alive. Consistency is the only path to the 1%.
                 </p>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-60">
                       <span>Daily Progress</span>
                       <span>60%</span>
                    </div>
                    <div className="w-full h-2.5 bg-bg-primary/20 rounded-full overflow-hidden">
                       <div className="w-[60%] h-full bg-bg-primary" />
                    </div>
                 </div>
              </Card>

              <Card>
                 <h4 className="text-xs font-black text-gold uppercase tracking-[0.2em] mb-6">Income Milestones</h4>
                 <div className="space-y-6">
                    {[
                      { label: "First $1K", target: 1000, current: totalAllTime, icon: "🎯" },
                      { label: "Road to $5K", target: 5000, current: totalAllTime, icon: "📈" },
                      { label: "Elite $10K", target: 10000, current: totalAllTime, icon: "💎" },
                    ].map((m, i) => (
                      <div key={i} className="space-y-3">
                         <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2">
                               <span className="text-lg">{m.icon}</span>
                               <p className="text-[10px] font-black text-white uppercase tracking-widest">{m.label}</p>
                            </div>
                            <p className="text-[10px] font-black text-text-muted tabular-nums">
                               ${Math.min(m.current, m.target).toLocaleString()} / ${m.target.toLocaleString()}
                            </p>
                         </div>
                         <div className="w-full h-1.5 bg-bg-primary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.min((m.current / m.target) * 100, 100)}%` }}
                              className="h-full bg-gold shadow-gold-glow"
                            />
                         </div>
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
