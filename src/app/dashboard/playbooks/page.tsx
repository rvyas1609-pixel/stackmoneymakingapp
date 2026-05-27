'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const PlaybookCard = ({ method }: { method: any }) => (
  <div className="card-premium p-6 rounded-3xl flex flex-col group">
    <div className="text-4xl mb-4">{method.icon}</div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{method.category}</span>
        <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase ${
          method.difficulty === 'Beginner' ? 'bg-neon-green/10 text-neon-green' :
          method.difficulty === 'Intermediate' ? 'bg-violet/10 text-violet-light' : 'bg-coral/10 text-coral'
        }`}>
          {method.difficulty}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-violet-light transition">{method.title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-4">{method.description}</p>
    </div>
    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-text-muted uppercase">Avg Earning</span>
        <span className="text-sm font-bold text-white">{method.income}/mo</span>
      </div>
      <Link href={`/dashboard/playbooks/${method.id}`} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition">
        View Steps
      </Link>
    </div>
  </div>
);

export default function PlaybooksPage() {
  const [filter, setFilter] = useState('All');

  const methods = [
    { id: '1', title: "AI Content Agency", category: "AI Content", income: "$1k–$8k", difficulty: "Intermediate", icon: "🤖", description: "Create + sell AI content to businesses." },
    { id: '2', title: "AI YouTube Automation", category: "AI Content", income: "$500–$5k", difficulty: "Beginner", icon: "📺", description: "Faceless channels using AI scripts + voiceover." },
    { id: '3', title: "AI TikTok Creativity", category: "AI Content", income: "$200–$3k", difficulty: "Beginner", icon: "📱", description: "Monetize TikTok with AI-made videos." },
    { id: '4', title: "AI Newsletter Biz", category: "AI Content", income: "$500–$10k", difficulty: "Intermediate", icon: "📧", description: "Weekly AI-curated newsletters with sponsorships." },
    { id: '5', title: "AI Ghostwriting", category: "AI Content", income: "$2k–$15k", difficulty: "Intermediate", icon: "✍️", description: "Write content for influencers using Claude/GPT." },
    { id: '6', title: "AI Micro-SaaS Builder", category: "Automation", income: "$500–$20k", difficulty: "Advanced", icon: "🛠️", description: "Build tiny tools using GPT API + no-code." },
    { id: '7', title: "AI Dropshipping 2.0", category: "E-Commerce", income: "$500–$10k", difficulty: "Intermediate", icon: "🚢", description: "AI product research + ad copy automation." },
    { id: '8', title: "AI Pinterest Affiliate", category: "Affiliate", income: "$200–$5k", difficulty: "Beginner", icon: "📌", description: "Drive affiliate traffic using AI-made pins." },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:row items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tight">65+ Money Playbooks</h2>
          <p className="text-text-secondary font-medium">New methods added every Monday.</p>
        </div>
        <div className="flex gap-2 p-1 bg-bg-secondary rounded-2xl border border-border">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${filter === f ? 'bg-violet text-white' : 'text-text-muted hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.filter(m => filter === 'All' || m.difficulty === filter).map(method => (
          <PlaybookCard key={method.id} method={method} />
        ))}
      </div>
    </div>
  );
}
