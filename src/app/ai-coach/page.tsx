"use client";

import React, { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Copy, Trash2, Target, Zap, Clock } from "lucide-react";
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        {/* Context Bar */}
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
              <div className="w-[1px] h-8 bg-border" />
              <div className="flex items-center gap-3">
                 <div className="p-2 rounded-lg bg-blue-400/10">
                    <Zap size={20} className="text-blue-400" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Primary Skill</p>
                    <p className="text-sm font-black text-white italic">{user?.primarySkill || "Not Set"}</p>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gold text-bg-primary font-black uppercase tracking-widest text-[10px] shadow-gold-glow">
              <Sparkles size={14} fill="currentColor" />
              Elite Access Active
           </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
           {/* Chat UI */}
           <div className="lg:col-span-3 flex flex-col min-h-0">
              <UpgradeGate
                requiredTier="pro"
                featureName="Elite AI Coach"
                userTier={user?.subscription?.tier || "free"}
                preview
              >
                 <Card className="flex-1 flex flex-col p-0 border-none shadow-gold-glow overflow-hidden bg-bg-card/30 backdrop-blur-md">
                    {/* Chat Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth no-scrollbar">
                       <AnimatePresence>
                          {messages.map((m, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                               <div className={`flex gap-4 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                  <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border transition-all ${
                                    m.role === 'user' ? 'bg-bg-elevated border-border text-white' : 'bg-gold border-gold text-bg-primary shadow-gold-glow'
                                  }`}>
                                     {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                                  </div>
                                  <div className="group relative">
                                     <div className={`p-6 rounded-[2rem] text-sm leading-relaxed font-medium ${
                                       m.role === 'user'
                                         ? 'bg-bg-elevated text-white rounded-tr-none'
                                         : 'bg-bg-card border border-border text-text-primary rounded-tl-none'
                                     }`}>
                                        <article className="prose prose-invert prose-sm max-w-none">
                                           <ReactMarkdown>{m.content}</ReactMarkdown>
                                        </article>
                                     </div>
                                     <div className={`flex items-center gap-4 mt-2 px-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">{m.timestamp}</span>
                                        <button
                                          onClick={() => handleCopy(m.content)}
                                          className="text-text-muted hover:text-gold transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                           <Copy size={12} />
                                        </button>
                                     </div>
                                  </div>
                               </div>
                            </motion.div>
                          ))}
                       </AnimatePresence>
                       {isLoading && (
                         <div className="flex justify-start">
                            <div className="flex gap-4">
                               <div className="w-10 h-10 rounded-2xl bg-gold flex items-center justify-center shadow-gold-glow animate-pulse">
                                  <Bot size={20} className="text-bg-primary" />
                               </div>
                               <div className="p-6 rounded-[2rem] rounded-tl-none bg-bg-card border border-border flex gap-1.5 items-center">
                                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-gold" />
                                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-gold" />
                                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-gold" />
                               </div>
                            </div>
                         </div>
                       )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 border-t border-border bg-bg-primary/50">
                       <div className="relative">
                          <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                            placeholder="Ask about a playbook, strategy, or scaling..."
                            className="w-full bg-bg-card border border-border rounded-[2rem] pl-8 pr-16 py-5 text-sm text-white focus:border-gold outline-none transition-all shadow-inner"
                          />
                          <button
                            onClick={() => handleSend(input)}
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-2 bottom-2 w-12 h-12 rounded-[1.5rem] bg-gold text-bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                          >
                             <Send size={20} />
                          </button>
                       </div>
                       <div className="flex items-center justify-between mt-6 px-4">
                          <div className="flex items-center gap-2">
                             <Clock size={12} className="text-text-muted" />
                             <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Responses in seconds via Gemini 1.5</span>
                          </div>
                          <button
                            onClick={clearChat}
                            className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors text-[10px] font-black uppercase tracking-widest"
                          >
                             <Trash2 size={12} /> Clear Conversation
                          </button>
                       </div>
                    </div>
                 </Card>
              </UpgradeGate>
           </div>

           {/* Sidebar */}
           <div className="space-y-6">
              <h4 className="text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                 <Zap size={14} fill="currentColor" /> Quick Triggers
              </h4>
              <div className="space-y-3">
                 {suggestions.map((s, i) => (
                   <button
                     key={i}
                     onClick={() => handleSend(s)}
                     className="w-full text-left p-5 rounded-2xl border border-border bg-bg-card/50 text-xs font-bold text-text-secondary hover:border-gold/30 hover:text-white transition-all group"
                   >
                      <span className="opacity-50 group-hover:opacity-100 transition-opacity">"</span>
                      {s}
                      <span className="opacity-50 group-hover:opacity-100 transition-opacity">"</span>
                   </button>
                 ))}
              </div>

              <Card className="mt-8 bg-gradient-luxury border-none p-8">
                 <h5 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Coach Memory</h5>
                 <p className="text-xs text-white/70 leading-relaxed font-medium">
                    I retain context of your skill set and income target to ensure every tactical advice is tailored for your execution style.
                 </p>
              </Card>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
