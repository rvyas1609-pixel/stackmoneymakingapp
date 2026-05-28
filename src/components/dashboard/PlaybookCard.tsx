import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "lucide-react"; // Assuming I'll use Lucide icons
import Link from "next/link";
import { Clock, BarChart, ChevronRight } from "lucide-react";

interface PlaybookCardProps {
  playbook: {
    id: string;
    title: string;
    description: string;
    slug: string;
    category: string;
    difficulty: string;
    range: string;
    timeCommitment: string;
    tier: string;
    icon?: string;
  };
}

export const PlaybookCard = ({ playbook }: PlaybookCardProps) => {
  return (
    <Link href={`/dashboard/playbooks/${playbook.slug}`}>
      <Card className="h-full flex flex-col group">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-bg-elevated flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
            {playbook.icon || "📖"}
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            playbook.tier === 'free' ? 'border-text-secondary text-text-secondary' :
            playbook.tier === 'starter' ? 'border-blue-400 text-blue-400' :
            playbook.tier === 'pro' ? 'border-gold text-gold' : 'border-purple-400 text-purple-400'
          }`}>
            {playbook.tier}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{playbook.title}</h3>
        <p className="text-sm text-text-secondary mb-6 flex-1 line-clamp-2">{playbook.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
            <BarChart size={14} className="text-gold" />
            <span>Potential: {playbook.range}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-widest">
            <Clock size={14} className="text-gold" />
            <span>Time: {playbook.timeCommitment}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-black uppercase tracking-[0.2em] text-gold group-hover:text-white transition-colors">
          Open Playbook
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </Link>
  );
};
