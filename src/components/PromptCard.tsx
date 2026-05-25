'use client';

import { motion } from 'framer-motion';

interface PromptCardProps {
  id: string;
  title: string;
  content: string;
  category: string;
  useCount: number;
  rating: number;
  onSave?: () => void;
  isSaved?: boolean;
}

export function PromptCard({
  id,
  title,
  content,
  category,
  useCount,
  rating,
  onSave,
  isSaved = false,
}: PromptCardProps) {
  return (
    <motion.div
      className="p-6 rounded-lg border border-border glass hover-lift"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-text-primary flex-1">{title}</h3>
        <span className="text-xs px-2 py-1 rounded bg-gold-bg text-gold font-semibold whitespace-nowrap ml-2">
          {category}
        </span>
      </div>

      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{content}</p>

      <div className="flex items-center justify-between text-xs text-text-tertiary mb-4">
        <span>⭐ {rating.toFixed(1)} ({useCount} uses)</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSave}
          className="flex-1 py-2 rounded text-sm font-semibold transition border border-border hover:border-gold-border"
        >
          {isSaved ? '✓ Saved' : 'Save'}
        </button>
        <button className="flex-1 py-2 bg-gold text-bg rounded text-sm font-semibold hover:opacity-90 transition">
          Copy
        </button>
      </div>
    </motion.div>
  );
}
