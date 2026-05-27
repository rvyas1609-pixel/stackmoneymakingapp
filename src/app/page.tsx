'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-xl bg-bg-primary/80 border-b border-border py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-premium flex items-center justify-center">
            <svg className="w-5 h-5 text-bg-primary fill-current" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter gradient-text">STACK</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <Link href="#features" className="hover:text-white transition">Features</Link>
          <Link href="#methods" className="hover:text-white transition">Methods</Link>
          <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="#community" className="hover:text-white transition">Community</Link>
          <Link href="#blog" className="hover:text-white transition">Blog</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/sign-in" className="text-sm font-semibold hover:text-white transition hidden sm:block">Sign In</Link>
          <Link href="/auth/sign-up" className="px-6 py-2.5 rounded-full btn-neon text-sm font-bold">
            Start Free
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt((Math.random() * 350).toString())));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="gradient-text">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// --- Main Page ---

export default function LandingPage() {
  const methods = [
    { name: "AI Content Agency", income: "$8k", difficulty: "Intermediate", icon: "🤖" },
    { name: "YouTube Automation", income: "$5k", difficulty: "Beginner", icon: "📺" },
    { name: "TikTok Creativity", income: "$3k", difficulty: "Beginner", icon: "📱" },
    { name: "AI Ghostwriting", income: "$15k", difficulty: "Advanced", icon: "✍️" },
    { name: "Newsletter Biz", income: "$10k", difficulty: "Intermediate", icon: "📧" },
    { name: "Micro-SaaS Builder", income: "$20k", difficulty: "Advanced", icon: "🛠️" },
  ];

  return (
    <div className="relative min-h-screen mesh-gradient overflow-hidden">
      <div className="noise" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-44 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border-gold/20 mb-8"
          >
            <span className="text-xs font-bold text-gold">🔥 50,000+ Stackers earning online</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
          >
            Turn AI Into Your<br />
            <Typewriter words={["Income Stream", "Side Hustle", "Full-Time Job", "Empire"]} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg md:text-xl text-text-secondary mb-12"
          >
            The only membership that gives you the exact playbooks, AI prompts, and mentorship to make real money online — starting this week.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link href="/auth/sign-up" className="px-10 py-5 rounded-full btn-neon text-lg font-black w-full sm:w-auto">
              Start Stacking Free →
            </Link>
            <button className="px-10 py-5 rounded-full glass border-white/10 hover:bg-white/5 transition text-lg font-bold flex items-center gap-2 w-full sm:w-auto">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
              </div>
              Watch 2-min demo
            </button>
          </motion.div>

          {/* Social Proof Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary bg-bg-card overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="user" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-text-secondary">
              Join <span className="text-white font-bold">50,847</span> members
            </p>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 40 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-20 relative w-full max-w-5xl mx-auto rounded-2xl border border-white/10 glass p-3"
          >
            <div className="rounded-xl bg-bg-primary aspect-video flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-premium opacity-5 absolute animate-pulse-slow" />
              <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-20" alt="Dashboard" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 rounded-2xl glass border-white/20 flex flex-col items-center">
                  <div className="text-6xl font-black gradient-text mb-4">$1,247.50</div>
                  <div className="text-text-secondary font-medium">Earned this week</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-bg-secondary relative border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Earned by members", value: "$2.4M+" },
            { label: "Money methods", value: "65+" },
            { label: "AI prompts", value: "1,000+" },
            { label: "Average rating", value: "4.9★" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-text-muted uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Methods Section */}
      <section id="methods" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4">65+ Proven Ways to Make Money with AI</h2>
            <p className="text-xl text-text-secondary">New methods added every single week</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methods.map((method, i) => (
              <div key={i} className="card-premium p-8 rounded-3xl relative overflow-hidden group">
                <div className="text-4xl mb-6">{method.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{method.name}</h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-black px-2 py-1 rounded bg-neon-green/10 text-neon-green">Avg {method.income}/mo</span>
                  <span className="text-xs font-bold text-text-muted">{method.difficulty}</span>
                </div>
                <Link href="/dashboard" className="text-sm font-bold text-gold group-hover:text-white transition flex items-center gap-2">
                  Learn Method <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 rounded-full border border-white/10 font-bold hover:bg-white/5 transition">
              View All 65 Methods →
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Weekly Playbooks", desc: "Step-by-step money guides, new every Monday", icon: "📖" },
              { title: "AI Mentor", desc: "24/7 Claude-powered coach for your questions", icon: "🤖" },
              { title: "Prompt Vault", desc: "1,000+ copy-paste AI prompts that earn", icon: "✨" },
              { title: "Personal Roadmap", desc: "$0→$1K→$5K→$10K custom path", icon: "🗺" },
              { title: "Resource Library", desc: "Templates, contracts, scripts, frameworks", icon: "🛠" },
              { title: "Gamification", desc: "XP, levels, streaks, leaderboards", icon: "🏆" },
              { title: "Community", desc: "Private Discord with 5,000+ earners", icon: "👥" },
              { title: "Masterclasses", desc: "Video courses from 6-figure creators", icon: "🎓" },
              { title: "Income Tracker", desc: "Log and visualize your earnings", icon: "📊" },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-start gap-4">
                <div className="w-14 h-14 rounded-2xl glass border-white/10 flex items-center justify-center text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4">Choose Your Path</h2>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="text-sm font-bold text-white">Monthly</span>
              <div className="w-12 h-6 rounded-full bg-gold/30 p-1 flex justify-end">
                <div className="w-4 h-4 rounded-full bg-gold" />
              </div>
              <span className="text-sm font-bold text-text-muted">Yearly (Save 17%)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free */}
            <div className="card-premium p-8 rounded-3xl flex flex-col">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-black mb-8">$0</div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ 3 playbooks per month</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ 50 AI prompts</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ Community (read-only)</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ Basic roadmap</li>
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition">Get Started Free</button>
            </div>

            {/* Starter */}
            <div className="card-premium p-8 rounded-3xl flex flex-col">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-black mb-8">$19 <span className="text-sm text-text-muted">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ All weekly playbooks</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ Full prompt vault</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ Resource library</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ AI Mentor (50 msgs)</li>
              </ul>
              <button className="w-full py-4 rounded-xl glass border-gold/30 text-gold font-bold hover:bg-gold/10 transition">Start Starter</button>
            </div>

            {/* Pro */}
            <div className="p-[1px] rounded-3xl bg-gradient-premium flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-neon-green text-bg-primary text-[10px] font-black uppercase tracking-widest">Most Popular</div>
              <div className="flex-1 p-8 rounded-[23px] bg-bg-card flex flex-col">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-black mb-8 text-white">$49 <span className="text-sm text-text-muted">/mo</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="text-sm text-text-secondary flex items-center gap-2">✓ Everything in Starter</li>
                  <li className="text-sm text-text-secondary flex items-center gap-2">✓ AI Mentor (unlimited)</li>
                  <li className="text-sm text-text-secondary flex items-center gap-2">✓ Masterclass videos</li>
                  <li className="text-sm text-text-secondary flex items-center gap-2">✓ Income tracker</li>
                  <li className="text-sm text-text-secondary flex items-center gap-2">✓ Priority support</li>
                </ul>
                <button className="w-full py-4 rounded-xl btn-neon font-bold">Go Pro</button>
              </div>
            </div>

            {/* Elite */}
            <div className="card-premium p-8 rounded-3xl flex flex-col">
              <h3 className="text-xl font-bold mb-2">Elite</h3>
              <div className="text-4xl font-black mb-8">$149 <span className="text-sm text-text-muted">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ Everything in Pro</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ Private mastermind</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ 1-on-1 monthly call</li>
                <li className="text-sm text-text-secondary flex items-center gap-2">✓ DFY templates</li>
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-white/5 transition">Apply for Elite</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border bg-bg-primary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-gradient-premium flex items-center justify-center">
                <svg className="w-5 h-5 text-bg-primary fill-current" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">STACK</span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              Built for the generation that refuses to be broke. The only AI money operating system you'll ever need.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-text-muted">Product</h4>
            <ul className="space-y-4 text-sm text-text-secondary font-medium">
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#methods">Methods</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="#community">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-text-muted">Legal</h4>
            <ul className="space-y-4 text-sm text-text-secondary font-medium">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/refunds">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-text-muted">Newsletter</h4>
            <p className="text-sm text-text-secondary mb-4">Get 1 free money method every week.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-bg-card border border-border rounded-lg px-4 py-2 flex-1 text-sm" />
              <button className="px-4 py-2 rounded-lg bg-gold text-bg-primary font-bold text-sm">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">&copy; 2025 STACK. All rights reserved.</p>
          <div className="flex gap-6">
            {/* Social icons could go here */}
          </div>
        </div>
      </footer>
    </div>
  );
}
