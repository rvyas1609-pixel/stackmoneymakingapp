'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-bg/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center text-bg font-serif font-bold text-lg">
              S
            </div>
            <span className="font-serif text-xl font-bold text-text-primary italic">
              STACK
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-text-secondary hover:text-text-primary transition">
              Features
            </a>
            <a href="#pricing" className="text-text-secondary hover:text-text-primary transition">
              Pricing
            </a>
            <a href="#faq" className="text-text-secondary hover:text-text-primary transition">
              FAQ
            </a>
          </div>
          <Link
            href="/auth/sign-in"
            className="px-6 py-2 rounded-lg bg-gold text-bg font-semibold hover:opacity-90 transition"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-serif font-bold italic text-text-primary mb-6"
            variants={itemVariants}
          >
            Your AI Money<br />Operating System
          </motion.h1>

          <motion.p
            className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Everything you need to make money online using AI tools, automation, and digital leverage. 5,000+ Gen Z creators already earning.
          </motion.p>

          <motion.div className="flex gap-4 justify-center mb-12 flex-wrap" variants={itemVariants}>
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 rounded-lg bg-gradient-gold text-bg font-semibold hover:opacity-90 transition text-lg"
            >
              Start Free Trial →
            </Link>
            <button className="px-8 py-4 rounded-lg border border-gold-border text-gold hover:bg-gold-bg transition text-lg">
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16"
            variants={itemVariants}
          >
            {[
              { label: 'Users Earning', value: '5,000+' },
              { label: 'Avg Income/Month', value: '$2,400' },
              { label: 'Money Methods', value: '50+' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-lg border border-border glass hover-lift"
              >
                <div className="text-gold text-2xl font-bold">{stat.value}</div>
                <div className="text-text-secondary text-sm mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* How People Make Money */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold italic text-text-primary text-center mb-4">
            How Creators Are Making $1K–10K/Month
          </h2>
          <p className="text-text-secondary text-center mb-16 max-w-2xl mx-auto">
            Real money, real methods, real results. No fake guru energy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Content Agency',
                desc: 'Create content for businesses using AI',
                income: '$800–2,500/mo',
              },
              {
                title: 'Digital Products',
                desc: 'Sell templates, guides, and workflows',
                income: '$500–5,000/mo',
              },
              {
                title: 'AI Freelancer',
                desc: 'Offer copywriting, SEO, design at 10x speed',
                income: '$1,000–4,000/mo',
              },
              {
                title: 'Paid Newsletter',
                desc: 'Go micro-niche and charge per email',
                income: '$500–10,000/mo',
              },
              {
                title: 'Paid Community',
                desc: 'Build accountability + transformation',
                income: '$1,000–8,000/mo',
              },
              {
                title: 'AI Automation',
                desc: 'Sell automation workflows to agencies',
                income: '$2,000–15,000/mo',
              },
            ].map((method, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-xl border border-border glass hover-lift"
                whileHover={{ y: -4 }}
              >
                <h3 className="font-semibold text-text-primary mb-2">{method.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{method.desc}</p>
                <div className="text-gold font-semibold">{method.income}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold italic text-text-primary text-center mb-4">
            Everything You Need
          </h2>
          <p className="text-text-secondary text-center mb-16 max-w-2xl mx-auto">
            All-in-one platform for learning, building, and monetizing online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '📖',
                title: 'Weekly Playbooks',
                desc: 'New money-making method every week with step-by-step execution guide',
              },
              {
                icon: '✨',
                title: 'Prompt Vault',
                desc: '1,000+ AI prompts for copywriting, marketing, and automation',
              },
              {
                icon: '🛠',
                title: 'Resource Library',
                desc: 'Templates, scripts, and frameworks ready to use',
              },
              {
                icon: '🤖',
                title: 'AI Tools Database',
                desc: 'Every tool you need with tutorials and income angles',
              },
              {
                icon: '🎯',
                title: 'Personal Roadmaps',
                desc: 'Your path from $0 to $1K, $5K, or $10K/month',
              },
              {
                icon: '👥',
                title: 'Private Community',
                desc: 'Discord community of 5,000+ creators sharing wins',
              },
              {
                icon: '🤖',
                title: 'AI Mentor',
                desc: 'Ask me anything about making money, pricing, scaling',
              },
              {
                icon: '🏆',
                title: 'Gamification',
                desc: 'XP, levels, achievements, and leaderboards',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-lg border border-border glass hover-lift"
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/50">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold italic text-text-primary text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-secondary text-center mb-16">Start free, upgrade when ready</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Free',
                price: '$0',
                features: ['Weekly roadmap', 'Limited playbooks', 'Community access'],
              },
              {
                name: 'Starter',
                price: '$19',
                features: ['Everything in Free', 'Full playbook library', 'Prompt vault access'],
              },
              {
                name: 'Pro',
                price: '$49',
                highlighted: true,
                features: [
                  'Everything in Starter',
                  'Full resource vault',
                  'Monthly live calls',
                  'AI tool database',
                ],
              },
              {
                name: 'Elite',
                price: '$149',
                features: [
                  'Everything in Pro',
                  'Private mastermind',
                  'Direct mentorship',
                  'Done-for-you templates',
                ],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                className={`p-8 rounded-lg border ${
                  plan.highlighted
                    ? 'border-gold bg-gold-bg'
                    : 'border-border glass'
                } hover-lift`}
                whileHover={{ y: -4 }}
              >
                <h3 className="font-semibold text-text-primary mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gold mb-6">
                  {plan.price}
                  <span className="text-sm text-text-secondary">/mo</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-text-secondary text-sm flex gap-2">
                      <span className="text-gold">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    plan.highlighted
                      ? 'bg-gold text-bg hover:opacity-90'
                      : 'border border-gold-border text-gold hover:bg-gold-bg'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold italic text-text-primary text-center mb-16">
            What Members Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'Made $800 my first month just following the playbooks. The prompts saved me 20 hours a week.',
                author: 'Sarah, 21',
              },
              {
                quote:
                  'Finally understand how to actually monetize. This is the blueprint everyone needs.',
                author: 'Marcus, 23',
              },
              {
                quote:
                  'The community keeps me accountable. Seeing others win makes me believe it\'s possible.',
                author: 'Alex, 20',
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-lg border border-border glass hover-lift"
                whileHover={{ y: -4 }}
              >
                <p className="text-text-primary mb-4">"{testimonial.quote}"</p>
                <p className="text-gold font-semibold">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-gold">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-serif font-bold italic text-bg mb-4">
            Ready to start making money?
          </h2>
          <p className="text-bg/80 mb-8">
            Join 5,000+ creators already building their income online.
          </p>
          <Link
            href="/auth/sign-up"
            className="px-8 py-4 rounded-lg bg-bg text-gold font-semibold hover:opacity-90 transition text-lg inline-block"
          >
            Start Your Free Trial →
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-bg/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="font-serif text-xl font-bold text-text-primary mb-4">STACK</div>
            <p className="text-text-secondary text-sm">
              The AI money operating system for Gen Z.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition">Features</a></li>
              <li><a href="#" className="hover:text-text-primary transition">Pricing</a></li>
              <li><a href="#" className="hover:text-text-primary transition">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition">About</a></li>
              <li><a href="#" className="hover:text-text-primary transition">Blog</a></li>
              <li><a href="#" className="hover:text-text-primary transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-text-primary transition">Privacy</a></li>
              <li><a href="#" className="hover:text-text-primary transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-text-secondary text-sm">
          <p>&copy; 2025 STACK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
