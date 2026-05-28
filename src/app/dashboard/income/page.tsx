"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IncomeChart } from "@/components/dashboard/IncomeChart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Plus, TrendingUp, DollarSign, Calendar, Tag } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function IncomePage() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    date: format(new Date(), "yyyy-MM-dd"),
    methodId: "AI Agency",
    notes: "",
  });

  const { data: entries, isLoading } = useQuery({
    queryKey: ["income"],
    queryFn: async () => {
      const { data } = await api.get("/api/income");
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newData: any) => {
      const { data } = await api.post("/api/income", newData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["income"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Income logged! +50 XP awarded.");
      setIsAdding(false);
      setFormData({
        amount: "",
        date: format(new Date(), "yyyy-MM-dd"),
        methodId: "AI Agency",
        notes: "",
      });
    },
  });

  const totalIncome = entries?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Income Tracker</h1>
            <p className="text-text-secondary font-medium">Log your wins and track your journey to $10K/month.</p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="btn-premium flex items-center gap-2"
          >
            <Plus size={20} />
            Log Income
          </button>
        </header>

        {isAdding && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-gold/30 bg-gold/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addMutation.mutate(formData);
                }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end"
              >
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Amount ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                      required
                      type="number"
                      placeholder="500.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full bg-bg-primary border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-gold outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-bg-primary border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-gold outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Method</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <select
                      value={formData.methodId}
                      onChange={(e) => setFormData({...formData, methodId: e.target.value})}
                      className="w-full bg-bg-primary border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-gold outline-none appearance-none"
                    >
                      <option>AI Agency</option>
                      <option>YouTube Automation</option>
                      <option>TikTok Creativity</option>
                      <option>Freelancing</option>
                      <option>SaaS</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={addMutation.isPending}
                  className="btn-premium py-3"
                >
                  {addMutation.isPending ? "Logging..." : "Save Entry"}
                </button>
              </form>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Total earnings since joining STACK</CardDescription>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] block mb-1">Total Balance</span>
                <span className="text-3xl font-black text-white">${totalIncome.toLocaleString()}</span>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <IncomeChart data={entries || []} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your last 5 income entries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                [1,2,3].map(i => <div key={i} className="h-12 bg-bg-primary rounded-xl animate-pulse" />)
              ) : entries?.length === 0 ? (
                <div className="text-center py-10">
                   <p className="text-sm text-text-muted">No entries yet.</p>
                </div>
              ) : (
                entries?.slice(0, 5).map((entry: any) => (
                  <div key={entry.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{entry.methodId}</p>
                        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">
                          {format(new Date(entry.date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-green-400">+${entry.amount}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
