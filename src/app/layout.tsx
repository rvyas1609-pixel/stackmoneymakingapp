import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/components/providers/QueryProvider";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "STACK — Gen-Z AI Money Membership App",
  description: "Premium subscription-based platform helping Gen-Z make money online using AI tools and digital leverage.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#d4af37",
          colorBackground: "#132d44",
          colorText: "#ffffff",
          colorTextSecondary: "#c9b8a0",
          colorInputBackground: "#0a1428",
          colorInputText: "#ffffff",
        },
      }}
    >
      <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
        <body className="bg-bg-primary text-text-primary font-sans antialiased overflow-x-hidden min-h-screen">
          <QueryProvider>
            {children}
            <Toaster position="top-right" richColors />
          </QueryProvider>

          {/* Background Grain Effect */}
          <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />
        </body>
      </html>
    </ClerkProvider>
  );
}
