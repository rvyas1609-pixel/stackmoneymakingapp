"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AICoachChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your STACK AI Coach. I've been trained on all our playbooks and the latest AI income strategies. How can I help you scale today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
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

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        assistantContent += chunkValue;

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantContent;
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[75vh] flex flex-col p-0 overflow-hidden border-none shadow-gold-glow">
      <div className="p-6 border-b border-border bg-bg-card/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center shadow-gold-glow">
            <Bot size={24} className="text-bg-primary" />
          </div>
          <div>
            <h3 className="font-bold text-white">AI Coach</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Gemini 1.5 Flash</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20">
          <Sparkles size={14} className="text-gold" />
          <span className="text-[10px] font-black text-gold uppercase tracking-widest">Elite Access</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-border"
      >
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  m.role === "user" ? "bg-bg-elevated text-white" : "bg-gradient-premium text-bg-primary"
                }`}>
                  {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-bg-elevated text-white rounded-tr-none"
                    : "bg-bg-card border border-border text-text-primary rounded-tl-none"
                }`}>
                  <ReactMarkdown className="prose prose-invert max-w-none prose-sm">
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center animate-pulse">
                   <Bot size={16} className="text-bg-primary" />
                </div>
                <div className="p-4 rounded-2xl bg-bg-card border border-border flex gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" />
                   <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
                   <div className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border bg-bg-card/50">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a playbook, strategy, or scaling..."
            className="w-full bg-bg-primary border border-border rounded-2xl pl-6 pr-14 py-4 text-sm focus:border-gold outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 w-10 h-10 rounded-xl bg-gradient-premium text-bg-primary flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center text-text-muted mt-4 uppercase font-bold tracking-widest">
          AI Coach may provide inaccurate info. Verify important business decisions.
        </p>
      </div>
    </Card>
  );
};
