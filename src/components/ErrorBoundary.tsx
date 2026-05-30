"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props { children: ReactNode; fallbackMessage?: string; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center bg-bg-primary rounded-3xl border border-border p-12 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 bg-gradient-premium rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-gold-glow">
              <span className="text-3xl font-black text-bg-primary">S</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-4">Something went wrong</h1>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              {this.props.fallbackMessage || this.state.error?.message || "An unexpected error occurred in the system."}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="btn-premium px-8 py-3"
              >
                Try Again
              </button>
              <a href="mailto:support@stack.app" className="text-gold font-bold py-3 hover:underline">
                Report Issue
              </a>
            </div>
          </motion.div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  fallbackMessage?: string
) {
  return function WithErrorBoundary(props: T) {
    return (
      <ErrorBoundary fallbackMessage={fallbackMessage}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export const DashboardErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary fallbackMessage="We had trouble loading your dashboard data. Please refresh to resync your progress.">
    {children}
  </ErrorBoundary>
);
