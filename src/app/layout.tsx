import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mag7 Global | Reliable Agri Supply Import-Export Partner",
  description: "Mag7 Global is a leading exporter and supplier of high-quality Indian agricultural products, including Cavendish Banana, Nashik Onion, Grapes, and Spices worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tickerItems = [
    "🧅 Onion (Nashik Quality): ₹34/Kg",
    "🍌 Cavendish Banana: ₹26/Kg",
    "🌶️ Green Chilli (G4): ₹58/Kg",
    "🧄 Garlic (MP G2): ₹115/Kg",
    "🥥 Semi-Husked Coconut: ₹28/Pc",
    "🥭 Alphonso Mango (Premium): ₹650/Dozen",
    "💵 INR to USD: 0.012",
    "🇦🇪 INR to AED: 0.044",
    "✈️ Air Freight (Mumbai to Dubai): ₹82/Kg",
    "🚢 Sea Freight (JNPT to Jebel Ali): $750/FEU",
  ];

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white">
        
        {/* Daily Rates Scrolling Marquee Ticker */}
        <div className="w-full bg-brand-blue-dark py-2 text-white text-xs font-semibold overflow-hidden border-b border-brand-blue/20 relative z-50">
          <div className="flex animate-marquee whitespace-nowrap gap-8">
            {/* Repeat list to create infinite marquee loop */}
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
