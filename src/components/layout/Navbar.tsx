"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-bg-primary/80 border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-6 h-6 text-bg-primary fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M13 10V3L4 14H11V21L20 10H13Z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">
            STACK
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-text-secondary">
          <Link
            href="#features"
            className="hover:text-gold transition-colors duration-300"
          >
            Features
          </Link>
          <Link
            href="#methods"
            className="hover:text-gold transition-colors duration-300"
          >
            Playbooks
          </Link>
          <Link
            href="#pricing"
            className="hover:text-gold transition-colors duration-300"
          >
            Pricing
          </Link>
          <Link
            href="#community"
            className="hover:text-gold transition-colors duration-300"
          >
            Community
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-bold text-white hover:text-gold transition-colors"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="text-sm font-bold text-text-secondary hover:text-white transition-colors hidden sm:block"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="btn-premium px-6 py-2.5 text-sm"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
