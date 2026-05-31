"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Sidebar - Desktop: fixed, Mobile: overlays */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] w-64 transform transition-transform duration-500 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-6 -right-12 w-10 h-10 rounded-xl bg-bg-card border border-border text-white flex items-center justify-center shadow-2xl"
        >
          <X size={20} />
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-primary/80 backdrop-blur-md z-[55] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-24 flex items-center justify-between px-8 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center gap-6">
            <button
              className="lg:hidden p-3 rounded-xl bg-bg-card border border-border text-gold shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-sm font-black text-gold uppercase tracking-[0.3em] mb-1">System Operational</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] text-text-secondary font-black uppercase tracking-widest opacity-70">
                   Latency: 14ms • AI Status: Ready
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Global Ranking</span>
                <span className="text-lg font-black text-white italic tracking-tight group hover:text-gold transition-colors cursor-default">
                   #1,248
                </span>
             </div>
             <div className="w-[1px] h-10 bg-border opacity-50" />
             <div className="hover:scale-110 transition-transform cursor-pointer">
               <UserButton
                 afterSignOutUrl="/"
                 appearance={{
                   elements: {
                     userButtonAvatarBox: "w-10 h-10 border-2 border-gold shadow-gold-glow",
                   }
                 }}
               />
             </div>
          </div>
        </header>

        {/* Dynamic Page Content Wrapper */}
        <main className="flex-1 w-full relative z-0">
          <div className="max-w-7xl mx-auto px-6 py-10 md:p-12 space-y-12">
            {children}
          </div>
        </main>

        {/* Footer info for dashboard */}
        <footer className="px-12 py-8 border-t border-border bg-bg-card/30 flex flex-col sm:row items-center justify-between gap-4">
           <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">STACK OS v1.0.4 • PRE-RELEASE</p>
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-gold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Privacy</span>
              <span className="text-[10px] font-black text-gold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Terms</span>
              <span className="text-[10px] font-black text-gold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Support</span>
           </div>
        </footer>
      </div>

      {/* Global Background Grain/Blur effects */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-bg-elevated/50 rounded-full blur-[150px] -z-10 pointer-events-none" />
    </div>
  );
};
