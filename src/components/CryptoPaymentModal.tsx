"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Info, ShieldCheck, Wallet, ChevronRight, Clock } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/Card";
import axios from "axios";

interface CryptoPaymentModalProps {
  tier: any;
  billing: "monthly" | "yearly";
  onClose: () => void;
}

const chains = [
  { id: "SOL", name: "Solana", symbol: "SOL", address: process.env.NEXT_PUBLIC_WALLET_SOL, fee: "0.01", logo: "https://cryptologos.cc/logos/solana-sol-logo.png" },
  { id: "ETH", name: "Ethereum", symbol: "ETH/USDT", address: process.env.NEXT_PUBLIC_WALLET_ETH, fee: "5.00", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  { id: "BTC", name: "Bitcoin", symbol: "BTC", address: process.env.NEXT_PUBLIC_WALLET_BTC, fee: "2.00", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
  { id: "BASE", name: "Base", symbol: "ETH/USDC", address: process.env.NEXT_PUBLIC_WALLET_BASE, fee: "0.05", logo: "https://cryptologos.cc/logos/base-logo.png" },
];

export const CryptoPaymentModal = ({ tier, billing, onClose }: CryptoPaymentModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedChain, setSelectedChain] = useState(chains[0]);
  const [txHash, setTxHash] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins

  const amount = billing === "yearly" ? Math.round(tier.price * 12 * 0.8) : tier.price;

  useEffect(() => {
    if (step === 2) {
      const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedChain.address || "");
    setIsCopied(true);
    toast.success(`${selectedChain.id} address copied!`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleConfirm = async () => {
    if (!txHash) return toast.error("Please provide the transaction hash");
    setIsSubmitting(true);
    try {
      await axios.post("/api/crypto/submit-transaction", {
        tier: tier.name.toLowerCase(),
        transactionHash: txHash,
        amount: amount,
        network: selectedChain.name,
      });
      setStep(4);
    } catch (e) {
      toast.error("Submission failed. Please check your TXID.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-bg-primary/95 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl"
      >
        <Card className="p-0 border-gold/30 shadow-gold-glow overflow-hidden">
          <div className="p-8 border-b border-border bg-bg-elevated/50 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center text-bg-primary">
                   <Wallet size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-white uppercase tracking-wider">Premium Checkout</h3>
                   <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">Step {step} of 4</p>
                </div>
             </div>
             <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors"><X size={24} /></button>
          </div>

          <div className="p-8">
             <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                     <h4 className="text-xl font-bold text-white mb-2">Select Your Network</h4>
                     <p className="text-sm text-text-secondary mb-8">Choose the blockchain you'd like to use for payment.</p>

                     <div className="grid grid-cols-1 gap-3">
                        {chains.map((chain) => (
                          <button
                            key={chain.id}
                            onClick={() => setSelectedChain(chain)}
                            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                              selectedChain.id === chain.id
                                ? "bg-gold/10 border-gold"
                                : "bg-bg-primary border-border hover:border-gold/30"
                            }`}
                          >
                             <div className="flex items-center gap-4">
                                <img src={chain.logo} className="w-8 h-8 rounded-full" alt="" />
                                <div className="text-left">
                                   <p className="text-sm font-bold text-white">{chain.name}</p>
                                   <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{chain.symbol}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-[10px] text-text-muted uppercase font-bold">Est. Fee</p>
                                <p className="text-xs font-black text-white">${chain.fee}</p>
                             </div>
                          </button>
                        ))}
                     </div>

                     <button onClick={() => setStep(2)} className="w-full btn-premium py-4 mt-8 flex items-center justify-center gap-2 group">
                        Next Step
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                     <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-white">Send Payment</h4>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                           <Clock size={14} />
                           <span className="text-xs font-black font-mono">{formatTime(timeLeft)}</span>
                        </div>
                     </div>

                     <div className="bg-bg-primary border border-border rounded-3xl p-8 flex flex-col items-center mb-8">
                        <div className="w-48 h-48 bg-white p-4 rounded-2xl mb-6">
                           <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedChain.address}`} alt="qr" />
                        </div>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 text-center">Your unique {selectedChain.name} Address</p>
                        <div className="w-full flex items-center gap-3 bg-bg-card border border-border p-4 rounded-xl">
                           <code className="flex-1 text-[10px] text-white font-mono overflow-x-auto whitespace-nowrap scrollbar-none">{selectedChain.address}</code>
                           <button onClick={handleCopy} className="text-gold hover:scale-110 transition-transform">
                              {isCopied ? <Check size={20} /> : <Copy size={24} />}
                           </button>
                        </div>
                     </div>

                     <div className="p-4 rounded-2xl bg-gold/5 border border-gold/20 flex gap-4 mb-8">
                        <Info size={20} className="text-gold shrink-0" />
                        <p className="text-xs text-text-secondary leading-relaxed">
                           Send exactly <span className="text-white font-bold">${amount} USD</span> equivalent in {selectedChain.symbol}. Funds are usually verified within 1 hour.
                        </p>
                     </div>

                     <button onClick={() => setStep(3)} className="w-full btn-premium py-4">I've Sent the Funds</button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                     <h4 className="text-xl font-bold text-white mb-2">Verify Transaction</h4>
                     <p className="text-sm text-text-secondary mb-8">Paste your transaction hash (TXID) below to confirm your upgrade.</p>

                     <div className="space-y-6">
                        <div>
                           <label className="block text-[10px] font-black uppercase tracking-widest text-text-muted mb-3">Transaction ID / Hash</label>
                           <input
                             type="text"
                             value={txHash}
                             onChange={(e) => setTxHash(e.target.value)}
                             placeholder="0x..."
                             className="w-full bg-bg-primary border border-border rounded-xl px-4 py-4 text-sm text-white focus:border-gold outline-none"
                           />
                        </div>

                        <div className="flex gap-4">
                           <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl border border-border text-white font-bold text-sm">Back</button>
                           <button
                             onClick={handleConfirm}
                             disabled={isSubmitting}
                             className="flex-[2] btn-premium py-4 font-black uppercase text-sm"
                           >
                             {isSubmitting ? "Verifying..." : "Confirm Activation"}
                           </button>
                        </div>
                     </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                     <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8">
                        <ShieldCheck size={48} className="text-green-500" />
                     </div>
                     <h4 className="text-3xl font-black text-white mb-4 italic tracking-tight uppercase">Payment Received</h4>
                     <p className="text-text-secondary text-sm mb-10 max-w-xs mx-auto leading-relaxed">
                        Your transaction is under manual review. Membership will be activated within 1-24 hours. You'll receive an email notification.
                     </p>
                     <button onClick={onClose} className="btn-premium px-12 py-4 font-black uppercase text-sm">Return to Dashboard</button>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
