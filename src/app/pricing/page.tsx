import { Navbar } from "@/components/layout/Navbar";
import { PricingSection } from "@/components/landing/PricingSection";
import { Card } from "@/components/ui/Card";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 font-serif uppercase tracking-tight">Invest in Your <span className="text-gradient">Empire</span></h1>
           <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Unlock the full power of the AI economy. Every tier is designed to return its value 100x if you follow the playbooks.
           </p>
        </div>

        <PricingSection />

        <div className="max-w-4xl mx-auto px-6 mt-32">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-white uppercase tracking-wider">Frequently Asked Questions</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { q: "Can I cancel my subscription?", a: "Yes, you can cancel at any time from your settings panel. You'll keep access until the end of your billing period." },
                { q: "Do I need previous AI experience?", a: "Absolutely not. Our playbooks are designed for complete beginners, starting from $0." },
                { q: "What's the AI Mentor?", a: "It's a custom-trained version of Claude 3.5 Sonnet that has context on all our playbooks and your specific goals." },
                { q: "Is the community on Discord?", a: "Yes, we use Discord for real-time networking, but the core community feed is also available inside the app." },
              ].map((faq, i) => (
                <Card key={i}>
                   <h4 className="font-bold text-white mb-3 text-lg">{faq.q}</h4>
                   <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                </Card>
              ))}
           </div>
        </div>
      </main>

      <footer className="py-20 border-t border-border text-center">
         <p className="text-xs font-bold text-text-muted uppercase tracking-widest">&copy; 2025 STACK AI. Join the 1%.</p>
      </footer>
    </div>
  );
}
