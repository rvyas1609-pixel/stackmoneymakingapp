'use client';

import React, { useState } from 'react';

const PromptCard = ({ prompt }: { prompt: any }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-premium p-6 rounded-3xl flex flex-col group">
      <div className="flex items-center justify-between mb-4">
        <span className="px-2 py-0.5 rounded bg-violet/10 text-violet-light text-[10px] font-black uppercase tracking-widest">
          {prompt.category}
        </span>
        <span className="text-[10px] font-bold text-text-muted">Used {prompt.uses} times</span>
      </div>
      <h3 className="text-lg font-bold mb-3 group-hover:text-white transition">{prompt.title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-6 line-clamp-3">{prompt.content}</p>
      <button
        onClick={copy}
        className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
          copied ? 'bg-neon-green text-bg-primary' : 'bg-white/5 hover:bg-white/10 text-white'
        }`}
      >
        {copied ? '✓ Copied' : 'Copy Prompt'}
      </button>
    </div>
  );
};

export default function PromptsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ["All", "Copywriting", "Email Marketing", "Social Media", "Video Scripts", "Business Plans", "Sales", "SEO", "Coding", "Image Gen"];

  const prompts = [
    { title: "High-Ticket Cold Email", category: "Email Marketing", uses: "1.2k", content: "Act as a world-class sales copywriter. Write a 3-sentence cold email to a CEO of a SaaS company offering [Service]. The goal is to get a 15-min call. Use a pattern interrupt in the first line and focus on one specific pain point: [Pain Point]. No fluff." },
    { title: "Viral Thread Hook", category: "Social Media", uses: "2.5k", content: "Generate 10 viral hooks for a Twitter thread about [Topic]. Each hook must use one of these frameworks: 1. The 'I wish I knew earlier' framework. 2. The 'Unpopular Opinion' framework. 3. The 'Step-by-step to $X' framework. Make them punchy and Gen Z oriented." },
    { title: "AI Content Agency Offer", category: "Copywriting", uses: "840", content: "Draft a compelling offer for an AI Content Agency that targets [Niche]. The offer should include: 1. A bold guarantee. 2. A 3-tier pricing structure. 3. A list of 5 specific deliverables using AI tools. Focus on ROI and time saved for the business owner." },
    { title: "YouTube Script Intro", category: "Video Scripts", uses: "1.1k", content: "Write a high-retention intro for a YouTube video titled '[Title]'. You have 5 seconds to hook the viewer. Use the 'Negative Visualization' technique to show what they lose if they don't watch, then bridge to the solution." },
    { title: "SaaS Idea Validator", category: "Business Plans", uses: "620", content: "I have an idea for a Micro-SaaS: [Idea]. Act as a lean startup consultant. Give me: 1. 3 potential monetization models. 2. 5 ways to validate this in 48 hours without code. 3. The biggest risk factor and how to mitigate it." },
    { title: "Clean Landing Page Hero", category: "Copywriting", uses: "1.5k", content: "Write a hero section for a landing page for [Product]. Include: 1. A 5-word headline that hits the main benefit. 2. A sub-headline that explains the 'how'. 3. A primary CTA and a secondary 'low friction' CTA." },
  ];

  const filteredPrompts = prompts.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:row items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tight">Prompt Vault</h2>
          <p className="text-text-secondary font-medium">1,000+ AI Prompts — Copy. Paste. Profit.</p>
        </div>
        <div className="w-full md:w-96 relative">
          <input
            type="text"
            placeholder="Search prompts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-secondary border border-border rounded-2xl px-12 py-4 text-sm focus:outline-none focus:border-violet transition"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-40">🔍</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition ${activeCategory === c ? 'bg-violet text-white shadow-neon' : 'bg-bg-secondary text-text-muted hover:text-white border border-border'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((p, i) => (
          <PromptCard key={i} prompt={p} />
        ))}
      </div>
    </div>
  );
}
