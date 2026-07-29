import React from "react";
import GroupNavbar from "@/components/GroupNavbar";
import GroupFooter from "@/components/GroupFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <GroupNavbar />
      <main className="flex-grow bg-[#fafbfc] text-[#0f172a]">
        {children}
      </main>
      <GroupFooter />
      <WhatsAppButton />
    </div>
  );
}
