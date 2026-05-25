'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Your XP', value: '2,450', icon: '⭐' },
    { label: 'Level', value: '3', icon: '🎯' },
    { label: 'This Month Earnings', value: '$1,240', icon: '💰' },
    { label: 'Streak', value: '12 days', icon: '🔥' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-bg/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-bg font-serif font-bold">
              S
            </div>
            <span className="font-serif text-lg font-bold text-text-primary italic">STACK</span>
          </div>
          <div className="text-sm text-text-secondary">Your Skill: Content Creation | Goal: $3K/mo</div>
          <button className="w-10 h-10 rounded-lg border border-border hover:bg-border/50 transition flex items-center justify-center">
            ⚙
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-serif font-bold italic text-text-primary mb-2">
              Welcome back, Sarah
            </h1>
            <p className="text-text-secondary">
              You're making solid progress. Keep the momentum going.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-lg border border-border glass hover-lift"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
            {['Dashboard', 'Playbooks', 'Prompts', 'Resources', 'AI Coach'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`pb-4 px-4 font-semibold transition border-b-2 ${
                  activeTab === tab.toLowerCase()
                    ? 'border-gold text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'dashboard' && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Current Roadmap */}
              <div className="lg:col-span-2 p-8 rounded-lg border border-border glass">
                <h2 className="font-serif text-2xl font-bold italic text-text-primary mb-4">
                  Your 90-Day Roadmap
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card border border-border-hover">
                    <div className="font-semibold text-text-primary mb-2">Days 1-30: Build Foundation</div>
                    <p className="text-text-secondary text-sm">
                      Set up online presence, identify niche, create sample work
                    </p>
                    <div className="mt-3 w-full bg-border rounded-full h-2">
                      <div className="bg-gold h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-text-tertiary mt-2">45% Complete</p>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="font-semibold text-text-primary mb-2">Days 31-60: Get First Money</div>
                    <p className="text-text-secondary text-sm">
                      Land first client, reach out to 10 per day, start earning
                    </p>
                    <div className="mt-3 w-full bg-border rounded-full h-2">
                      <div className="bg-gray-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-xs text-text-tertiary mt-2">Not Started</p>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="font-semibold text-text-primary mb-2">Days 61-90: Hit $3K/mo</div>
                    <p className="text-text-secondary text-sm">
                      Scale to multiple clients, build automation, systemize
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <div className="p-6 rounded-lg border border-gold-border bg-gold-bg">
                  <div className="font-semibold text-text-primary mb-2">🎯 Do This Today</div>
                  <p className="text-text-secondary text-sm mb-4">
                    DM 5 potential clients about your services. That's it.
                  </p>
                  <button className="w-full py-2 bg-gold text-bg rounded-lg font-semibold hover:opacity-90 transition">
                    Mark Complete
                  </button>
                </div>

                <div className="p-6 rounded-lg border border-border glass">
                  <div className="font-semibold text-text-primary mb-4">Recent Achievements</div>
                  <div className="space-y-2">
                    <div className="text-sm">🏆 Completed First Playbook</div>
                    <div className="text-sm">📖 Read 3 Guides</div>
                    <div className="text-sm">💬 5 Days Streak</div>
                  </div>
                </div>

                <Link href="/prompts" className="block p-4 rounded-lg border border-gold-border bg-gold-bg hover:bg-gold-border/30 transition cursor-pointer">
                  <div className="font-semibold text-text-primary mb-1">📝 Prompt Vault</div>
                  <div className="text-xs text-text-secondary">1,000+ AI prompts ready to use</div>
                </Link>
              </div>
            </motion.div>
          )}

          {activeTab === 'playbooks' && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="font-serif text-2xl font-bold italic text-text-primary mb-6">
                Side Hustle Playbooks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['AI Content Agency', 'Digital Products', 'AI Freelancer', 'Paid Newsletter'].map((playbook) => (
                  <motion.div
                    key={playbook}
                    className="p-6 rounded-lg border border-border glass hover-lift cursor-pointer"
                    whileHover={{ y: -4 }}
                  >
                    <h3 className="font-semibold text-text-primary mb-2">{playbook}</h3>
                    <p className="text-text-secondary text-sm mb-4">
                      Step-by-step guide with real strategies.
                    </p>
                    <button className="text-gold font-semibold text-sm hover:underline">
                      Start Playbook →
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
