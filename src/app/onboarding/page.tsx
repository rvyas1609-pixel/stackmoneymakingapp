'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SKILLS = [
  { id: 'content', icon: '📸', label: 'Content creation', desc: 'Videos, photos, social media' },
  { id: 'writing', icon: '✍️', label: 'Writing', desc: 'Blogs, copywriting, scripts' },
  { id: 'design', icon: '🎨', label: 'Design', desc: 'Canva, graphics, branding' },
  { id: 'coding', icon: '💻', label: 'Coding', desc: 'Web, apps, automation' },
  { id: 'teaching', icon: '🎓', label: 'Teaching', desc: 'Courses, coaching, tutoring' },
  { id: 'social', icon: '📱', label: 'Social media', desc: 'Growth, strategy, management' },
];

const HOURS = [
  { id: '8', label: '5–10 hrs / week', desc: 'Side project pace — the perfect start' },
  { id: '15', label: '10–20 hrs / week', desc: 'Serious commitment — real results' },
  { id: '30', label: '20+ hrs / week', desc: 'Full hustle mode — fastest growth' },
];

const GOALS = [
  { id: '500', label: '$500 / month', desc: 'Pay a bill, build a safety net' },
  { id: '2000', label: '$1K–3K / month', desc: 'Replace a part-time salary' },
  { id: '5000', label: '$3K+ / month', desc: 'Full financial freedom' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [skill, setSkill] = useState<string | null>(null);
  const [hours, setHours] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);

  const questions = [
    { title: "What's your strongest skill?", sub: 'Pick the one that feels most natural to you', key: 'skill', opts: SKILLS, grid: true },
    { title: 'How many hours can you commit weekly?', sub: 'Be honest — consistency beats intensity every time', key: 'hours', opts: HOURS, grid: false },
    { title: "What's your monthly income goal?", sub: 'Where do you want to be in 90 days?', key: 'goal', opts: GOALS, grid: false },
  ];

  const q = questions[step];
  const isAnswered = step === 0 ? skill : step === 1 ? hours : goal;

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else if (skill && hours && goal) {
      // Redirect to dashboard with onboarding complete
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-surface flex flex-col items-center justify-center p-4">
      {/* Background grain */}
      <div className="fixed inset-0 pointer-events-none opacity-60" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      }} />

      <motion.div
        className="max-w-2xl w-full relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo & Branding */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center text-bg font-serif font-bold text-xl">
              S
            </div>
          </div>
          <h1 className="font-serif text-4xl font-bold italic text-text-primary mb-2">STACK</h1>
          <p className="text-text-secondary text-sm letter-spacing-widest">GEN Z WEALTH OS</p>
        </div>

        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mb-12">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-full"
              initial={{ width: 10, backgroundColor: '#3E3C3A' }}
              animate={{
                width: i === step ? 28 : i < step ? 10 : 10,
                backgroundColor: i === step ? '#C8A869' : i < step ? '#8A8880' : '#3E3C3A',
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 4 }}
            />
          ))}
        </div>

        {/* Question Content */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          key={step}
        >
          <h2 className="text-3xl font-semibold text-text-primary text-center mb-3">
            {q.title}
          </h2>
          <p className="text-text-secondary text-center text-sm mb-8">
            {q.sub}
          </p>

          {q.grid ? (
            // Grid layout for skills
            <div className="grid grid-cols-2 gap-3 mb-8">
              {q.opts.map((opt: any) => (
                <motion.button
                  key={opt.id}
                  onClick={() => setSkill(opt.id)}
                  className={`p-4 rounded-lg border transition text-left ${
                    skill === opt.id
                      ? 'border-gold-border bg-gold-bg'
                      : 'border-border hover:border-gold-border bg-surface hover:bg-card'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <div className="font-semibold text-text-primary text-sm mb-1">{opt.label}</div>
                  <div className="text-text-secondary text-xs">{opt.desc}</div>
                </motion.button>
              ))}
            </div>
          ) : (
            // List layout for hours & goals
            <div className="space-y-2 mb-8">
              {q.opts.map((opt: any) => (
                <motion.button
                  key={opt.id}
                  onClick={() => {
                    if (step === 1) setHours(opt.id);
                    else setGoal(opt.id);
                  }}
                  className={`w-full p-4 rounded-lg border transition text-left flex justify-between items-center ${
                    (step === 1 ? hours : goal) === opt.id
                      ? 'border-gold-border bg-gold-bg'
                      : 'border-border hover:border-gold-border bg-surface hover:bg-card'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div>
                    <div className="font-semibold text-text-primary">{opt.label}</div>
                    <div className="text-text-secondary text-sm">{opt.desc}</div>
                  </div>
                  <div className="text-lg">→</div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Button */}
          <motion.button
            onClick={handleNext}
            disabled={!isAnswered}
            className={`w-full py-3 rounded-lg font-semibold transition text-lg ${
              isAnswered
                ? 'bg-gradient-gold text-bg hover:opacity-90'
                : 'bg-gray-700 text-text-tertiary cursor-not-allowed'
            }`}
            whileHover={isAnswered ? { scale: 1.02 } : {}}
            whileTap={isAnswered ? { scale: 0.98 } : {}}
          >
            {step === 2 ? 'Complete Onboarding →' : 'Next →'}
          </motion.button>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-full py-2 mt-3 text-text-secondary hover:text-text-primary transition"
            >
              ← Go Back
            </button>
          )}
        </motion.div>

        {/* Already have account */}
        <div className="text-center text-text-secondary text-sm">
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="text-gold hover:underline">
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
