import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main>
        <HeroSection />

        {/* Stats Section */}
        <section className="py-20 border-y border-border bg-bg-card/30">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Earned by members", value: "$24M+" },
              { label: "Money methods", value: "65+" },
              { label: "AI prompts", value: "1,000+" },
              { label: "Success Rate", value: "94%" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-gold transition-colors duration-300">{stat.value}</div>
                <div className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <FeaturesSection />

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-luxury p-12 md:p-24 text-center relative overflow-hidden shadow-gold-glow">
            <div className="absolute inset-0 bg-bg-primary/40 backdrop-blur-sm" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-serif leading-tight">
                Ready to Stop Trading <br />
                <span className="text-gold">Time for Money?</span>
              </h2>
              <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-medium">
                Join 50,000+ others who are using STACK to build their digital empires. The next generation of wealth starts here.
              </p>
              <Link href="/auth/sign-up" className="btn-premium text-xl px-12 py-6 inline-block">
                Join the 1% for Free →
              </Link>
            </div>
          </div>
        </section>

        <PricingSection />
      </main>

      <footer className="py-20 px-6 border-t border-border bg-bg-primary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center">
                <svg className="w-5 h-5 text-bg-primary fill-current" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">STACK</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              The premier AI-powered wealth operating system for Gen-Z creators, hustlers, and entrepreneurs.
            </p>
            <div className="flex gap-4">
              {/* Socials */}
              <div className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center hover:border-gold transition-colors cursor-pointer">
                <i className="ti ti-brand-twitter text-xl text-white"></i>
              </div>
              <div className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center hover:border-gold transition-colors cursor-pointer">
                <i className="ti ti-brand-discord text-xl text-white"></i>
              </div>
              <div className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center hover:border-gold transition-colors cursor-pointer">
                <i className="ti ti-brand-instagram text-xl text-white"></i>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-[0.2em] text-gold">Platform</h4>
            <ul className="space-y-4 text-sm text-text-secondary font-bold">
              <li><Link href="#features" className="hover:text-white transition-colors">Playbooks</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Prompt Vault</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">AI Mentor</Link></li>
              <li><Link href="#features" className="hover:text-white transition-colors">Roadmaps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-[0.2em] text-gold">Company</h4>
            <ul className="space-y-4 text-sm text-text-secondary font-bold">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-[0.2em] text-gold">Updates</h4>
            <p className="text-sm text-text-secondary mb-6 font-medium">Get the latest AI money methods in your inbox.</p>
            <form className="relative">
              <input
                type="email"
                placeholder="email@stack.app"
                className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 rounded-lg bg-gold text-bg-primary font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-xs font-bold uppercase tracking-widest">&copy; 2025 STACK AI. Made for the 1%.</p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-text-secondary">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
