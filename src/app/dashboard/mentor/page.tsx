'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Message = ({ role, content }: { role: string; content: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
  >
    <div className={`max-w-[80%] rounded-3xl p-6 ${
      role === 'user'
        ? 'bg-violet text-white rounded-tr-none'
        : 'bg-bg-secondary border border-border text-text-primary rounded-tl-none'
    }`}>
      <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  </motion.div>
);

export default function MentorPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Yo! I'm your STACK AI Mentor. I know all 65 money-making methods inside out. How can I help you make money today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    // Mock AI response for now to show functionality
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "That's a solid question. To scale that method, you should first focus on your outreach volume. I recommend using the 'Cold Email Script' from the Resource Library and the 'Sales Outreach' prompts in the Vault. \n\nYour concrete next step: Send 20 personalized DMs today using the script. Let me know how it goes!"
      }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black tracking-tight">AI Mentor</h2>
          <p className="text-text-secondary font-medium">Powered by Claude 3.5 Sonnet</p>
        </div>
        <div className="px-4 py-2 rounded-xl glass border-violet/20 text-violet-light text-xs font-black uppercase">
          Unlimited Messages
        </div>
      </div>

      <div className="flex-1 bg-bg-card rounded-3xl border border-border flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet/5 to-transparent pointer-events-none" />

        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
          {messages.map((m, i) => (
            <Message key={i} role={m.role} content={m.content} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="bg-bg-secondary border border-border rounded-3xl rounded-tl-none p-6 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-light animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-violet-light animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-violet-light animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-6 bg-bg-secondary border-t border-border relative z-10">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about making money..."
              className="flex-1 bg-bg-card border border-border rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-violet transition"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-8 py-4 rounded-2xl bg-violet text-white font-black text-sm hover:opacity-90 transition shadow-neon disabled:opacity-50"
            >
              Send
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            {["Which method is best for me?", "How to price my service?", "Write a cold email"].map(s => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
