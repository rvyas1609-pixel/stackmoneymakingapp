"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Sidebar - Desktop: fixed, Mobile: overlays */}
      <div className={`fixed inset-y-0 left-0 z-[60] w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full relative">
        <header className="flex items-center justify-between p-6 md:p-8 border-b border-border bg-bg-primary/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-xl bg-bg-card border border-border text-gold"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-sm font-bold text-gold uppercase tracking-[0.3em] hidden md:block">System Active</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-text-secondary font-black uppercase tracking-widest">All modules operational</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">Global Ranking</span>
                <span className="text-lg font-black text-white italic tracking-tight">#1,248</span>
             </div>
             <div className="w-[1px] h-8 bg-border opacity-50 hidden sm:block" />
             <div className="hover:scale-110 transition-transform">
               <UserButton afterSignOutUrl="/" />
             </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
