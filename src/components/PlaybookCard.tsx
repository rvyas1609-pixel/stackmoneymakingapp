'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface PlaybookCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  range: string;
  timeCommitment: string;
  difficulty: string;
  tag: string;
  tagBg: string;
  tagColor: string;
}

export function PlaybookCard({
  id,
  title,
  description,
  range,
  timeCommitment,
  difficulty,
  tag,
  tagBg,
  tagColor,
}: PlaybookCardProps) {
  return (
    <motion.div
      className="p-6 rounded-lg border border-border glass hover-lift cursor-pointer group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-text-primary text-lg">{title}</h3>
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold"
          style={{ background: tagBg, color: tagColor }}
        >
          {tag}
        </span>
      </div>

      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex gap-4 text-xs text-text-tertiary mb-4">
        <span className="flex items-center gap-1">💰 {range}</span>
        <span className="flex items-center gap-1">⏱ {timeCommitment}</span>
        <span className="flex items-center gap-1">📊 {difficulty}</span>
      </div>

      <Link
        href={`/playbooks/${id}`}
        className="text-gold font-semibold text-sm group-hover:underline transition"
      >
        View Playbook →
      </Link>
    </motion.div>
  );
}
