import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileCheck, Settings, ShieldCheck } from "lucide-react";
import { industrialProducts } from "@/data/industrial";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return industrialProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default function IndustrialDetailPage({ params }: PageProps) {
  const product = industrialProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = industrialProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Banner Section */}
      <section className="relative h-[320px] md:h-[400px] w-full overflow-hidden bg-slate-900">
        <Image
          src={product.bannerImage}
          alt={product.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 md:space-y-6 text-white max-w-3xl text-left">
            <Link
              href="/industrial-equipments/products"
              className="inline-flex items-center gap-1 text-xs text-[#ea580c] hover:underline font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">{product.name}</h1>
            
            {/* Quick Specs */}
            <div className="text-xs md:text-sm font-semibold text-slate-350">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 border-l-2 border-[#ea580c] pl-4">
                {product.specs.power && (
                  <li>
                    <strong className="text-white">Rating:</strong> {product.specs.power}
                  </li>
                )}
                {product.specs.material && (
                  <li>
                    <strong className="text-white">Material:</strong> {product.specs.material}
                  </li>
                )}
                {product.specs.certification && (
                  <li>
                    <strong className="text-white">Standards:</strong> {product.specs.certification}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Profile & Specs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-slate-205 shadow-sm bg-slate-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#ea580c] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="font-extrabold text-brand-blue-dark text-xs sm:text-sm">Pre-Shipment Inspections</h5>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  We support third-party witness inspection runs (SGS, Intertek, Lloyd's Register) at assembly foundries in Gujarat and Maharashtra.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Actions */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="font-extrabold text-brand-blue-dark text-lg sm:text-xl border-b border-slate-100 pb-2">
                Equipment Description & Capabilities
              </h3>
              <p className="text-slate-655 text-xs sm:text-sm leading-relaxed font-semibold">
                {product.description}
              </p>
            </div>

            {/* Quick Sourcing Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={`/industrial-equipments/rfq?prod=${product.slug}`}
                className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-center py-4 text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1"
              >
                Inquire Technical RFQ <ArrowUpRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Detailed Specifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 pt-16">
        <h3 className="font-black text-brand-blue-dark text-xl sm:text-2xl mb-8">Technical Parameters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: Performance */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-slate-300 pb-2 flex items-center gap-2">
              <Settings className="w-4.5 h-4.5 text-[#ea580c]" /> Performance Ratings
            </h4>
            <table className="w-full text-xs text-slate-600 space-y-2">
              <tbody>
                {product.specs.power && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Motor Power</td><td className="py-2 text-right">{product.specs.power}</td></tr>
                )}
                {product.specs.pressure && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Operating Press.</td><td className="py-2 text-right">{product.specs.pressure}</td></tr>
                )}
                {product.specs.flowRate && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Flow Output</td><td className="py-2 text-right">{product.specs.flowRate}</td></tr>
                )}
                {product.specs.capacity && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Rating Capacity</td><td className="py-2 text-right">{product.specs.capacity}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Col 2: Construction */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-slate-300 pb-2 flex items-center gap-2">
              <FileCheck className="w-4.5 h-4.5 text-brand-blue" /> Mechanical Build
            </h4>
            <table className="w-full text-xs text-slate-605 space-y-2">
              <tbody>
                {product.specs.material && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Materials</td><td className="py-2 text-right">{product.specs.material}</td></tr>
                )}
                {product.specs.voltage && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Voltage/Freq.</td><td className="py-2 text-right">{product.specs.voltage}</td></tr>
                )}
                {product.specs.sizing && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Sizing</td><td className="py-2 text-right">{product.specs.sizing}</td></tr>
                )}
                {product.specs.certification && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Certificates</td><td className="py-2 text-right">{product.specs.certification}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Col 3: Shipping */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-slate-300 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" /> Sourcing & Logistics
            </h4>
            <table className="w-full text-xs text-slate-605 space-y-2">
              <tbody>
                {product.specs.moq && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Minimum Order</td><td className="py-2 text-right">{product.specs.moq}</td></tr>
                )}
                {product.specs.leadTime && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Lead Time</td><td className="py-2 text-right">{product.specs.leadTime}</td></tr>
                )}
                {product.specs.portOfLoading && (
                  <tr className="border-b border-slate-150"><td className="py-2 font-bold text-slate-800">Loading Port</td><td className="py-2 text-right">{product.specs.portOfLoading}</td></tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 4. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 pt-16">
          <h2 className="section-title">Similar Equipment</h2>
          <div className="section-subtitle text-[#ea580c] font-black uppercase tracking-widest text-center text-xs mb-10">Industrial Sourcing Options</div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-32 w-full overflow-hidden bg-slate-50">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-extrabold text-brand-blue-dark text-xs sm:text-sm truncate">
                      {p.name}
                    </h3>
                  </div>
                </div>
                <div className="px-3 pb-3 pt-2 border-t border-slate-50 flex items-center justify-between text-xs">
                  <Link
                    href={`/industrial-equipments/products/${p.slug}`}
                    className="text-[#ea580c] font-bold hover:underline flex items-center gap-0.5"
                  >
                    Details <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
