import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1f3c] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-black text-[#06b6d4]">404</h1>
      <h2 className="text-2xl font-bold mt-2">Page Not Found</h2>
      <p className="text-slate-400 text-sm mt-2 max-w-md">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="mt-6 bg-[#06b6d4] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg">
        Return to Home
      </Link>
    </div>
  );
}