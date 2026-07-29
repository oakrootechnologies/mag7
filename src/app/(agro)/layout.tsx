import React from "react";
import AgroNavbar from "@/components/AgroNavbar";
import AgroFooter from "@/components/AgroFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import DailyTicker from "@/components/DailyTicker";
import { client } from "@/sanity/lib/client";
import { headerConfigQuery } from "@/sanity/lib/queries";

async function getHeaderConfig() {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "your-project-id" || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      return null;
    }
    const data = await client.fetch(headerConfigQuery, {}, { cache: "no-store" });
    return data;
  } catch (error) {
    console.error("Failed to fetch header config from Sanity:", error);
    return null;
  }
}

interface SanityTickerItem {
  _type: 'productItem' | 'customItem';
  emoji?: string;
  name?: string;
  price?: number;
  currency?: string;
  weightUnit?: string;
  label?: string;
  value?: string;
}

function formatTickerItem(item: SanityTickerItem): string {
  if (!item) return '';
  const emojiStr = item.emoji ? `${item.emoji} ` : '';
  if (item._type === 'productItem') {
    return `${emojiStr}${item.name || 'Product'}: ${item.currency || '₹'}${item.price ?? 'N/A'}/${item.weightUnit || 'Kg'}`;
  } else if (item._type === 'customItem') {
    return `${emojiStr}${item.label || ''}${item.label && item.value ? ': ' : ''}${item.value || ''}`;
  }
  return '';
}

export default async function AgroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerConfig = await getHeaderConfig();

  const defaultTickerItems = [
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

  const tickerItems = headerConfig?.tickerItems?.length
    ? headerConfig.tickerItems.map(formatTickerItem).filter(Boolean)
    : defaultTickerItems;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Daily Rates Scrolling Marquee Ticker */}
      <DailyTicker tickerItems={tickerItems} />

      {/* Navigation */}
      <AgroNavbar config={headerConfig || undefined} />

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Footer */}
      <AgroFooter />
    </div>
  );
}
