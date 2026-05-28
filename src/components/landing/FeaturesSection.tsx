"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Weekly Playbooks",
    desc: "Exhaustive step-by-step guides on the newest money-making methods, updated every single Monday.",
    icon: "📖",
  },
  {
    title: "AI Mentor (Gemini 1.5)",
    desc: "A custom-trained AI coach available 24/7 to help you troubleshoot your business and scale faster.",
    icon: "🤖",
  },
  {
    title: "The Prompt Vault",
    desc: "1,000+ copy-paste AI prompts for copywriting, marketing, video scripts, and workflow automation.",
    icon: "✨",
  },
  {
    title: "Income Tracker",
    desc: "Beautifully log and visualize your earnings from different side hustles in one centralized dashboard.",
    icon: "📊",
  },
  {
    title: "Learning Roadmaps",
    desc: "Custom 30, 60, and 90-day action plans tailored to your specific goals and time commitment.",
    icon: "🗺",
  },
  {
    title: "Elite Community",
    desc: "Access to our private Discord with 5,000+ creators sharing wins, tools, and accountability.",
    icon: "👥",
  },
  {
    title: "Gamification",
    desc: "Earn XP, level up, and unlock exclusive rewards as you complete playbooks and hit income milestones.",
    icon: "🏆",
  },
  {
    title: "Resource Library",
    desc: "A massive library of templates, legal contracts, hiring scripts, and tech stacks for every business.",
    icon: "🛠",
  },
  {
    title: "AI Tools Directory",
    desc: "Vetted database of 500+ AI tools with specific tutorials on how to use them to generate revenue.",
    icon: "🔌",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 px-6 relative bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 font-serif"
          >
            Everything You Need to <span className="text-gradient">Scale to $10K</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Stop guessing. Start executing with the most comprehensive AI money toolkit ever built.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl glass border-white/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-bg-elevated flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gold transition-colors">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
