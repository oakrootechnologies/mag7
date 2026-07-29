import React from "react";
import HandicraftsNavbar from "@/components/HandicraftsNavbar";
import HandicraftsFooter from "@/components/HandicraftsFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HandicraftsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfc]">
      {/* Navigation */}
      <HandicraftsNavbar />

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Footer */}
      <HandicraftsFooter />
    </div>
  );
}
