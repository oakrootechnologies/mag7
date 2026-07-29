import React from "react";
import IndustrialNavbar from "@/components/IndustrialNavbar";
import IndustrialFooter from "@/components/IndustrialFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function IndustrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
      {/* Navigation */}
      <IndustrialNavbar />

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Footer */}
      <IndustrialFooter />
    </div>
  );
}
