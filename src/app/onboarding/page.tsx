"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import api from "@/lib/api";

const steps = [
  {
    id: "welcome",
    title: "Welcome to the 1%",
    subtitle: "Let's personalize your path to financial freedom.",
  },
  {
    id: "skill",
    title: "What's your primary skill?",
    subtitle: "We'll tailor playbooks to your strengths.",
  },
  {
    id: "hours",
    title: "How much time can you commit?",
    subtitle: "Be realistic. Consistency beats intensity.",
  },
  {
    id: "goal",
    title: "What's your monthly income goal?",
    subtitle: "We'll build a roadmap to hit this number.",
  },
];

const skills = [
  "Copywriting",
  "Video Editing",
  "Social Media",
  "Web Design",
  "AI Prompting",
  "Sales/Closer",
  "Coding",
  "No-Code",
  "Other",
];

const goals = [
  { label: "$1,000 /mo", value: 1000 },
  { label: "$5,000 /mo", value: 5000 },
  { label: "$10,000 /mo", value: 10000 },
  { label: "$25,000+ /mo", value: 25000 },
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    skill: "",
    hours: 5,
    goal: 5000,
  });
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/api/user/onboarding", formData);
      toast.success("Profile customized! Welcome to STACK.");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-bg-elevated">
        <motion.div
          className="h-full bg-gradient-premium"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black mb-4 font-serif">
              {steps[currentStep].title}
            </h1>
            <p className="text-text-secondary">{steps[currentStep].subtitle}</p>
          </div>

          <div className="glass-elevated rounded-3xl p-8 mb-8">
            {currentStep === 0 && (
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-premium flex items-center justify-center mx-auto mb-6 shadow-gold-glow">
                  <span className="text-4xl">🚀</span>
                </div>
                <p className="text-lg font-medium mb-8">
                  Hey {user?.firstName || "there"}, you're just 3 steps away
                  from your personalized money-making engine.
                </p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      setFormData({ ...formData, skill });
                      handleNext();
                    }}
                    className={`p-4 rounded-xl border transition-all text-sm font-bold ${
                      formData.skill === skill
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-border hover:border-gold/50 text-text-secondary"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-6xl font-black text-white mb-2">
                    {formData.hours}
                  </div>
                  <div className="text-gold font-bold uppercase tracking-widest text-xs">
                    Hours Per Week
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="80"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-bg-primary rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-xs font-bold text-text-secondary">
                  <span>1 HR</span>
                  <span>40 HRS (FULL TIME)</span>
                  <span>80 HRS</span>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                {goals.map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => {
                      setFormData({ ...formData, goal: goal.value });
                    }}
                    className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between group ${
                      formData.goal === goal.value
                        ? "border-gold bg-gold/10"
                        : "border-border hover:border-gold/50"
                    }`}
                  >
                    <span
                      className={`text-xl font-black ${
                        formData.goal === goal.value
                          ? "text-gold"
                          : "text-white"
                      }`}
                    >
                      {goal.label}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.goal === goal.value
                          ? "border-gold"
                          : "border-border group-hover:border-gold/50"
                      }`}
                    >
                      {formData.goal === goal.value && (
                        <div className="w-3 h-3 rounded-full bg-gold" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {currentStep !== 1 && currentStep !== 3 && (
              <button
                onClick={handleNext}
                disabled={loading}
                className="btn-premium w-full py-5 text-lg"
              >
                {loading ? "Optimizing..." : "Continue"}
              </button>
            )}

            {currentStep === 3 && (
              <button
                onClick={handleNext}
                disabled={loading}
                className="btn-premium w-full py-5 text-lg"
              >
                {loading ? "Setting up your empire..." : "Complete Setup"}
              </button>
            )}

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-text-secondary font-bold text-sm hover:text-white transition-colors"
              >
                Go Back
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
