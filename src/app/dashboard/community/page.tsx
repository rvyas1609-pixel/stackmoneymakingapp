"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { MessageSquare, Trophy, Shield, Zap, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function CommunityPage() {
  const queryClient = useQueryClient();
  const [activeChannel, setActiveChannel] = useState("wins");
  const [message, setMessage] = useState("");

  const { data: messages, isLoading } = useQuery({
    queryKey: ["community", activeChannel],
    queryFn: async () => {
      const { data } = await api.get(`/api/community?channel=${activeChannel}`);
      return data;
    },
  });

  const postMutation = useMutation({
    mutationFn: async (content: string) => {
      const { data } = await api.post("/api/community", { channel: activeChannel, content });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community", activeChannel] });
      setMessage("");
      toast.success("Message posted! +25 XP");
    },
  });

  const channels = [
    { id: "wins", label: "Share Wins", icon: Trophy, color: "text-gold" },
    { id: "accountability", label: "Accountability", icon: Shield, color: "text-blue-400" },
    { id: "tools", label: "New Tools", icon: Zap, color: "text-purple-400" },
    { id: "general", label: "General", icon: MessageSquare, color: "text-green-400" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header>
          <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Community</h1>
          <p className="text-text-secondary font-medium">Connect with 5,000+ elite creators scaling their digital empires.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
             {channels.map((channel) => (
               <button
                 key={channel.id}
                 onClick={() => setActiveChannel(channel.id)}
                 className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                   activeChannel === channel.id
                     ? "bg-bg-card border-gold/50 shadow-gold-glow"
                     : "bg-bg-card border-border hover:border-gold/30"
                 }`}
               >
                 <div className={`p-2 rounded-lg bg-bg-elevated ${channel.color}`}>
                   <channel.icon size={20} />
                 </div>
                 <span className={`text-sm font-bold uppercase tracking-widest ${activeChannel === channel.id ? "text-white" : "text-text-secondary"}`}>
                   {channel.label}
                 </span>
               </button>
             ))}

             <Card className="mt-8 bg-gradient-luxury border-none">
                <h4 className="text-sm font-black text-white mb-2">Join Discord</h4>
                <p className="text-[10px] text-white/70 mb-4 leading-relaxed uppercase font-bold tracking-widest">Full 5,000+ member access</p>
                <button className="w-full py-3 rounded-xl bg-bg-primary text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                   Get Invite Link
                </button>
             </Card>
          </div>

          <div className="lg:col-span-3 flex flex-col h-[70vh]">
             <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 no-scrollbar">
                {isLoading ? (
                  [1,2,3].map(i => <div key={i} className="h-24 bg-bg-card rounded-2xl animate-pulse" />)
                ) : messages?.length === 0 ? (
                  <div className="text-center py-20 bg-bg-card rounded-3xl border border-dashed border-border">
                     <p className="text-text-secondary">Be the first to post in #{activeChannel}!</p>
                  </div>
                ) : (
                  messages?.map((msg: any) => (
                    <Card key={msg.id} className="border-none bg-bg-card/50">
                       <div className="flex gap-4">
                          <img src={msg.user.profileImage} className="w-10 h-10 rounded-full border border-border" alt="" />
                          <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-black text-white">{msg.user.username}</span>
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                   {formatDistanceToNow(new Date(msg.createdAt))} ago
                                </span>
                             </div>
                             <p className="text-sm text-text-secondary leading-relaxed">{msg.content}</p>
                          </div>
                       </div>
                    </Card>
                  ))
                )}
             </div>

             <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && postMutation.mutate(message)}
                  placeholder={`Post to #${activeChannel}...`}
                  className="w-full bg-bg-card border border-border rounded-2xl pl-6 pr-14 py-4 text-sm focus:border-gold outline-none transition-colors"
                />
                <button
                  onClick={() => postMutation.mutate(message)}
                  disabled={!message.trim() || postMutation.isPending}
                  className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-xl bg-gradient-premium text-bg-primary flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
