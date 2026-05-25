'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  useCount: number;
  rating: number;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch('/api/prompts');
        const { data } = await res.json();
        setPrompts(data || []);
      } catch (error) {
        console.error('Failed to fetch prompts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const categories = ['all', 'copywriting', 'video', 'marketing', 'business', 'automation', 'money'];

  const filtered = selectedCategory === 'all'
    ? prompts
    : prompts.filter(p => p.category === selectedCategory);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-bg/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-bg font-serif font-bold">
              S
            </div>
            <span className="font-serif text-lg font-bold text-text-primary italic">STACK</span>
          </Link>
          <div className="text-sm text-text-secondary">Prompt Vault</div>
          <button className="w-10 h-10 rounded-lg border border-border hover:bg-border/50 transition">⚙</button>
        </div>
      </nav>

      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Title Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-serif font-bold italic text-text-primary mb-3">
              Prompt Vault
            </h1>
            <p className="text-text-secondary max-w-2xl">
              1,000+ AI prompts for copywriting, content, marketing, and business. Copy, paste, win.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex gap-2 mb-8 overflow-x-auto pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition capitalize ${
                  selectedCategory === cat
                    ? 'bg-gold text-bg'
                    : 'border border-border hover:border-gold-border text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat === 'all' ? 'All Prompts' : cat}
              </button>
            ))}
          </motion.div>

          {/* Prompts Grid */}
          {loading ? (
            <div className="text-center text-text-secondary">Loading prompts...</div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
            >
              {filtered.map((prompt, idx) => (
                <motion.div
                  key={prompt.id}
                  className="p-6 rounded-lg border border-border glass hover-lift group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-text-primary flex-1">{prompt.title}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-gold-bg text-gold font-semibold whitespace-nowrap ml-2">
                      {prompt.category}
                    </span>
                  </div>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">{prompt.content}</p>

                  <div className="flex items-center justify-between text-xs text-text-tertiary mb-4">
                    <span>⭐ {prompt.rating.toFixed(1)} • {prompt.useCount} uses</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded text-sm font-semibold transition border border-border hover:border-gold-border hover:text-gold">
                      Save
                    </button>
                    <button
                      onClick={() => handleCopy(prompt.id, prompt.content)}
                      className="flex-1 py-2 bg-gold text-bg rounded text-sm font-semibold hover:opacity-90 transition"
                    >
                      {copiedId === prompt.id ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center text-text-secondary py-12">
              No prompts found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
