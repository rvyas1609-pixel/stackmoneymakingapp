"use client";

import React, { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Copy, Trash2, Target, Zap, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { UpgradeGate } from "@/components/UpgradeGate";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestions = [
  "How do I start an AI content agency?",
  "Give me a 30-day plan to make $1K/month",
  "What AI tools do I actually need?",
  "How do I find my first client?",
  "Review my business idea: [Type here]"
];

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => (await api.get("/api/user")).data,
  });

  useEffect(() => {
    const saved = localStorage.getItem("stack_chat_history");
    const prefill = localStorage.getItem("stack_coach_prefill");

    if (saved) setMessages(JSON.parse(saved));
    else setMessages([{ role: "assistant", content: "Hello! I'm your STACK AI Coach. I've been trained on all our playbooks and the latest AI strategies. How can I help you scale today?", timestamp: new Date().toLocaleTimeString() }]);

    if (prefill) {
       setInput(prefill);
       localStorage.removeItem("stack_coach_prefill");
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (messages.length > 0) localStorage.setItem("stack_chat_history", JSON.stringify(messages.slice(-20)));
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = response.body;
      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantContent = "";

      setMessages(prev => [...prev, { role: "assistant", content: "", timestamp: new Date().toLocaleTimeString() }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        assistantContent += chunkValue;

        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantContent;
          return newMessages;
        });
      }
    } catch (e) {
      toast.error("Coach connection failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: "Chat cleared. Ready for a new mission.", timestamp: new Date().toLocaleTimeString() }]);
    localStorage.removeItem("stack_chat_history");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-bg-card/50 border border-border rounded-3xl gap-6">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-gold/10">
                    <Target size={20} className="text-gold" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Monthly Goal</p>
                    <p className="text-sm font-black text-white italic">${user?.incomeGoal?.toLocaleString() || "5,000"}</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex-1 min-h-0">
           <UpgradeGate
             requiredTier="pro"
             featureName="Elite AI Coach"
             userTier={user?.subscription?.tier || "free"}
             preview
           >
              <Card className="h-full flex flex-col p-0 border-none shadow-gold-glow overflow-hidden bg-bg-card/30 backdrop-blur-md">
                 <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                    {messages.map((m, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                         <div className={`p-6 rounded-[2rem] text-sm font-medium ${m.role === 'user' ? 'bg-bg-elevated text-white' : 'bg-bg-card border border-border text-text-primary'}`}>
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                         </div>
                      </motion.div>
                    ))}
                 </div>
                 <div className="p-6 border-t border-border">
                    <div className="relative">
                       <input
                         type="text"
                         value={input}
                         onChange={(e) => setInput(e.target.value)}
                         onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                         placeholder="Ask anything..."
                         className="w-full bg-bg-card border border-border rounded-[2rem] px-8 py-5 text-sm text-white focus:border-gold outline-none"
                       />
                       <button onClick={() => handleSend(input)} className="absolute right-2 top-2 bottom-2 w-12 h-12 rounded-[1.5rem] bg-gold text-bg-primary flex items-center justify-center">
                          <Send size={20} />
                       </button>
                    </div>
                 </div>
              </Card>
           </UpgradeGate>
        </div>
      </div>
    </DashboardLayout>
  );
}
