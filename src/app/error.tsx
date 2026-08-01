"use client";

import React from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#0d1f3c] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-black text-red-400">Something went wrong</h1>
      <p className="text-slate-400 text-sm mt-2 max-w-md">{error?.message || "An unexpected error occurred."}</p>
      <div className="flex gap-3 mt-6">
        <button onClick={() => reset()} className="bg-[#06b6d4] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full cursor-pointer">
          Try Again
        </button>
        <Link href="/" className="bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full">
          Return Home
        </Link>
      </div>
    </div>
  );
}