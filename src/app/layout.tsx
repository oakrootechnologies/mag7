import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mag7 Global | Conglomerate Import-Export Partner",
  description: "Mag7 Global is a leading conglomerate exporter and importer, supplying high-quality agricultural products, handicrafts, and industrial equipments globally.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}

