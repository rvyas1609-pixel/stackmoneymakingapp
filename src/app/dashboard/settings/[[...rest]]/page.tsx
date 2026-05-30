"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { useUser, UserProfile } from "@clerk/nextjs";
import { CreditCard, Bell, Shield, User } from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <header>
          <h1 className="text-4xl font-black text-white mb-2 font-serif uppercase tracking-tight">Settings</h1>
          <p className="text-text-secondary font-medium">Manage your profile, subscription, and notifications.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
             {[
               { icon: User, label: "Profile", active: true },
               { icon: CreditCard, label: "Billing" },
               { icon: Bell, label: "Notifications" },
               { icon: Shield, label: "Security" },
             ].map((item, i) => (
               <button
                 key={i}
                 className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                   item.active
                     ? "bg-bg-card border-gold/50 shadow-gold-glow"
                     : "bg-bg-card border-border hover:border-gold/30"
                 }`}
               >
                 <div className={`p-2 rounded-lg bg-bg-elevated ${item.active ? "text-gold" : "text-text-muted"}`}>
                   <item.icon size={20} />
                 </div>
                 <span className={`text-sm font-bold uppercase tracking-widest ${item.active ? "text-white" : "text-text-secondary"}`}>
                   {item.label}
                 </span>
               </button>
             ))}
          </div>

          <div className="lg:col-span-3">
             <Card className="p-0 border-none bg-transparent">
                <UserProfile
                  path="/dashboard/settings"
                  routing="path"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-bg-card border border-border shadow-none w-full",
                      navbar: "hidden",
                      headerTitle: "text-white font-serif",
                      headerSubtitle: "text-text-secondary font-sans",
                      formButtonPrimary: "bg-gradient-premium text-bg-primary font-black",
                      formFieldLabel: "text-text-secondary",
                      formFieldInput: "bg-bg-primary border-border text-white focus:border-gold",
                      footerActionLink: "text-gold hover:text-gold/80",
                      breadcrumbsItem: "text-text-secondary",
                      profileSectionTitleText: "text-white font-bold",
                      userPreviewMainIdentifier: "text-white",
                      userPreviewSecondaryIdentifier: "text-text-secondary",
                    },
                  }}
                />
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
