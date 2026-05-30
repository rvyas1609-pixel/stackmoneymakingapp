"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function SupabaseTestPage() {
  const [status, setStatus] = useState("Testing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function test() {
      try {
        const { data } = await api.get("/api/user");
        setStatus("Success! Database and API are connected.");
        console.log("User data:", data);
      } catch (err: any) {
        setStatus("Failed.");
        setError(err.response?.data || err.message);
        console.error("Test error:", err);
      }
    }
    test();
  }, []);

  return (
    <div className="p-20 bg-bg-primary min-h-screen text-white">
      <h1 className="text-3xl font-black mb-8">System Connectivity Test</h1>
      <div className={`p-6 rounded-2xl border ${error ? "border-red-500 bg-red-500/10" : "border-gold bg-gold/10"}`}>
        <p className="font-bold text-xl mb-2">Status: {status}</p>
        {error && (
          <div className="mt-4">
             <p className="text-xs font-black uppercase text-red-400 mb-2">Error Details:</p>
             <pre className="bg-black/50 p-4 rounded-xl text-xs overflow-auto max-w-full">
                {JSON.stringify(error, null, 2)}
             </pre>
          </div>
        )}
      </div>
      <div className="mt-10 space-y-4 text-text-secondary text-sm">
         <p>• If status is "Failed", check your DATABASE_URL in .env.local</p>
         <p>• Ensure you have run "npx prisma db push" to sync the tables.</p>
         <p>• Ensure your Clerk session is active (Sign In first).</p>
      </div>
    </div>
  );
}
