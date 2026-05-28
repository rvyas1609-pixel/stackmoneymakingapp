"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { UserButton } from "@clerk/nextjs";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-sm font-bold text-gold uppercase tracking-[0.3em]">System Active</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-text-secondary font-medium uppercase">All modules operational</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Global Ranking</span>
                <span className="text-sm font-black text-white">#1,248</span>
             </div>
             <div className="w-[1px] h-8 bg-border" />
             <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};
