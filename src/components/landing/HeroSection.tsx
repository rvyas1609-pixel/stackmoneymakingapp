"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      Math.max(
        reverse ? 50 : subIndex === words[index].length ? 1500 : 100,
        Math.random() * 200
      )
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-gradient">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export const HeroSection = () => {
  return (
    <section className="relative pt-44 pb-32 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-bg-elevated/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-6 py-2 rounded-full glass border-gold/30 mb-10"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gold">
            50,000+ Members Earning Online
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.9] font-serif"
        >
          Turn AI Into Your
          <br />
          <Typewriter
            words={["Income Stream", "Side Hustle", "Empire", "Digital Leverage"]}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl text-xl md:text-2xl text-text-secondary mb-16 font-medium leading-relaxed"
        >
          The premium Gen-Z platform for making money online. Get the playbooks,
          AI prompts, and community to reach $10K/month.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <Link href="/auth/sign-up" className="btn-premium text-xl px-12 py-6">
            Start Stacking Free →
          </Link>
          <Link
            href="#demo"
            className="btn-outline text-xl px-12 py-6 bg-transparent"
          >
            Watch Demo
          </Link>
        </motion.div>

        {/* Hero Image Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-32 relative w-full max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl border border-white/10 glass p-4 shadow-2xl">
            <div className="absolute -inset-1 bg-gradient-premium opacity-20 blur-2xl rounded-3xl -z-10" />
            <div className="rounded-2xl bg-bg-primary aspect-video overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-elevated p-12 rounded-3xl flex flex-col items-center">
                  <div className="text-sm font-bold text-gold uppercase tracking-widest mb-4">
                    Current Balance
                  </div>
                  <div className="text-7xl font-black text-white mb-2">$12,450.80</div>
                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    <span>↑ 124% from last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
