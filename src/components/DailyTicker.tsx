"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DailyTickerProps {
  tickerItems: string[];
}

export default function DailyTicker({ tickerItems }: DailyTickerProps) {
  const [direction, setDirection] = useState<"left" | "right">("left");

  if (!tickerItems || tickerItems.length === 0) return null;

  // Duplicate items to ensure smooth infinite marquee effect
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-brand-blue-dark py-2 text-white text-xs font-semibold overflow-hidden border-b border-brand-blue/20 relative z-50 flex items-center group">
      
      {/* Left Control & Gradient Overlay */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-2 pr-8 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setDirection("left")}
          className={`p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer ${
            direction === "left" ? "text-brand-yellow" : "text-white"
          }`}
          title="Scroll Left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Scrolling Container */}
      <div className="w-full overflow-hidden">
        <div
          className="flex animate-marquee whitespace-nowrap gap-8 hover:[animation-play-state:paused] cursor-pointer"
          style={{
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {repeatedItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Right Control & Gradient Overlay */}
      <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center pr-2 pl-8 bg-gradient-to-l from-brand-blue-dark via-brand-blue-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setDirection("right")}
          className={`p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer ${
            direction === "right" ? "text-brand-yellow" : "text-white"
          }`}
          title="Scroll Right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
