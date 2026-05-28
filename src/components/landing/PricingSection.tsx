"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Copy, Check, X, Wallet, ChevronDown } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "0",
    desc: "Test the waters of the AI economy.",
    features: [
      "3 Sample Playbooks",
      "50 Basic AI Prompts",
      "Community Access (Read-only)",
      "Basic Income Tracker",
    ],
    button: "Get Started",
    highlight: false,
  },
  {
    name: "Starter",
    price: "29",
    desc: "For the dedicated side-hustler.",
    features: [
      "All 65+ Weekly Playbooks",
      "Full Prompt Vault (1,000+)",
      "Resource Library Access",
      "Community Wins Channel",
      "Weekly Research Reports",
    ],
    button: "Start Stacking",
    highlight: false,
  },
  {
    name: "Pro",
    price: "79",
    desc: "Scale your income with AI leverage.",
    features: [
      "Everything in Starter",
      "Unlimited AI Mentor (Gemini)",
      "Advanced Learning Roadmaps",
      "Monthly Live Masterclasses",
      "Exclusive Tool Discounts",
      "Priority Support",
    ],
    button: "Go Pro Now",
    highlight: true,
  },
  {
    name: "Elite",
    price: "149",
    desc: "The ultimate mastermind experience.",
    features: [
      "Everything in Pro",
      "1-on-1 Monthly Strategy Call",
      "Private Elite Discord Channel",
      "Done-For-You Templates",
      "Early Access to New Methods",
      "Stack Elite Welcome Kit",
    ],
    button: "Apply for Elite",
    highlight: false,
  },
];

const networks = [
  { name: "Solana", symbol: "SOL", address: process.env.NEXT_PUBLIC_WALLET_SOL || "A6J3diQzGfGFtGhwX2mnY2UMjbj571m8zvgv6Nc1LW9A" },
  { name: "Ethereum", symbol: "ETH/USDT", address: process.env.NEXT_PUBLIC_WALLET_ETH || "0xe8BD02dD2D361E0F189DC3607677758AA4d7D7c4" },
  { name: "Bitcoin", symbol: "BTC", address: process.env.NEXT_PUBLIC_WALLET_BTC || "bc1p04xmaq3y4e9vff5llfpghvkgrygkav4tfxzm4qfw6gfsn6rssg2qudlcfq" },
  { name: "Base", symbol: "ETH/USDC", address: process.env.NEXT_PUBLIC_WALLET_BASE || "0xe8BD02dD2D361E0F189DC3607677758AA4d7D7c4" },
];

export const PricingSection = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [txHash, setTxHash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleTierClick = (tier: any) => {
    if (tier.price === "0") {
      router.push("/auth/sign-up");
      return;
    }
    if (!isSignedIn) {
      toast.error("Please sign in to subscribe");
      router.push("/auth/sign-in");
      return;
    }
    setSelectedTier(tier);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedNetwork.address);
    setIsCopied(true);
    toast.success(`${selectedNetwork.name} address copied!`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmitTx = async () => {
    if (!txHash) {
      toast.error("Please enter your transaction hash");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post("/api/crypto/submit-transaction", {
        tier: selectedTier.name.toLowerCase(),
        transactionHash: txHash,
        amount: selectedTier.price,
        network: selectedNetwork.name,
      });
      toast.success("Transaction submitted! Manual verification in progress.");
      setSelectedTier(null);
      setTxHash("");
      router.push("/dashboard?status=pending");
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 font-serif"
          >
            Invest in Your <span className="text-gradient">Financial Freedom</span>
          </motion.h2>
          <p className="text-xl text-text-secondary">
            Pay directly via <span className="text-white font-bold">Multi-Chain Crypto</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-1 rounded-3xl ${
                tier.highlight
                  ? "bg-gradient-premium shadow-gold-glow"
                  : "bg-border/20"
              }`}
            >
              <div className="h-full bg-bg-card rounded-[22px] p-8 flex flex-col">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black text-white">
                    ${tier.price}
                  </span>
                  <span className="text-text-secondary font-bold">/mo</span>
                </div>
                <p className="text-text-secondary text-sm mb-8">{tier.desc}</p>

                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <svg
                        className="w-5 h-5 text-gold shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-text-primary/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleTierClick(tier)}
                  className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    tier.highlight
                      ? "btn-premium"
                      : "bg-bg-elevated text-white hover:bg-bg-elevated/70"
                  }`}
                >
                  {tier.button}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Multi-Chain Payment Modal */}
      <AnimatePresence>
        {selectedTier && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTier(null)}
              className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xl"
            >
              <Card className="p-10 shadow-gold-glow border-gold/30">
                <button
                  onClick={() => setSelectedTier(null)}
                  className="absolute top-6 right-6 text-text-secondary hover:text-white"
                >
                  <X size={24} />
                </button>

                <div className="text-center mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-premium flex items-center justify-center mx-auto mb-6">
                    <Wallet size={32} className="text-bg-primary" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2 font-serif">Multi-Chain Payment</h3>
                  <p className="text-text-secondary">
                    Select a network and send <span className="text-white font-bold">${selectedTier.price}</span>.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Network Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    {networks.map((net) => (
                      <button
                        key={net.name}
                        onClick={() => setSelectedNetwork(net)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedNetwork.name === net.name
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/30"
                        }`}
                      >
                        <p className={`text-xs font-black uppercase tracking-widest ${selectedNetwork.name === net.name ? "text-gold" : "text-text-muted"}`}>
                          {net.name}
                        </p>
                        <p className="text-sm font-bold text-white">{net.symbol}</p>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gold mb-3">Send to this {selectedNetwork.name} Address</label>
                    <div className="flex items-center gap-3 bg-bg-primary border border-border p-4 rounded-xl">
                      <code className="flex-1 text-[10px] text-text-primary overflow-x-auto whitespace-nowrap scrollbar-none font-mono">
                        {selectedNetwork.address}
                      </code>
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg bg-bg-elevated text-text-secondary hover:text-gold transition-colors flex-shrink-0"
                      >
                        {isCopied ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gold mb-3">Transaction ID / Hash</label>
                    <input
                      type="text"
                      placeholder="Paste TXID from your wallet..."
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      className="w-full bg-bg-primary border border-border rounded-xl px-4 py-4 text-sm focus:border-gold outline-none transition-colors"
                    />
                    <p className="text-[10px] text-text-muted mt-2 font-medium">
                      * Manual verification takes 1-6 hours.
                    </p>
                  </div>

                  <button
                    onClick={handleSubmitTx}
                    disabled={isSubmitting || !txHash}
                    className="w-full btn-premium py-5 text-lg"
                  >
                    {isSubmitting ? "Verifying..." : "Confirm Payment"}
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
