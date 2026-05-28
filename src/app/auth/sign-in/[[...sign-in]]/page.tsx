import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-gradient-luxury opacity-10 pointer-events-none" />
      <div className="relative z-10">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-bg-card border border-border shadow-2xl",
              headerTitle: "text-white font-serif",
              headerSubtitle: "text-text-secondary font-sans",
              socialButtonsBlockButton: "bg-bg-elevated border-border text-white hover:bg-bg-elevated/70",
              formButtonPrimary: "bg-gradient-premium text-bg-primary font-black",
              footerActionText: "text-text-secondary",
              footerActionLink: "text-gold hover:text-gold/80",
              formFieldLabel: "text-text-secondary",
              formFieldInput: "bg-bg-primary border-border text-white focus:border-gold",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-gold",
            },
          }}
        />
      </div>
    </div>
  );
}
