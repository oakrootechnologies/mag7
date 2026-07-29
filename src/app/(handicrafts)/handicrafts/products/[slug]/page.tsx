import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileCheck, Compass, Sparkles } from "lucide-react";
import { handicraftsProducts } from "@/data/handicrafts";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return handicraftsProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default function CraftDetailPage({ params }: PageProps) {
  const product = handicraftsProducts.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = handicraftsProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Banner Section */}
      <section className="relative h-[320px] md:h-[400px] w-full overflow-hidden bg-[#18110b]">
        <Image
          src={product.bannerImage}
          alt={product.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-[#18110b]/60" />
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 md:space-y-6 text-white max-w-3xl text-left">
            <Link
              href="/handicrafts/products"
              className="inline-flex items-center gap-1 text-xs text-amber-300 hover:underline font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Crafts
            </Link>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-amber-100">{product.name}</h1>
            
            {/* Quick Specs */}
            <div className="text-xs md:text-sm font-semibold text-slate-350">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 border-l-2 border-amber-500 pl-4">
                {product.specs.material && (
                  <li>
                    <strong className="text-white">Material:</strong> {product.specs.material}
                  </li>
                )}
                {product.specs.sizing && (
                  <li>
                    <strong className="text-white">Sizing:</strong> {product.specs.sizing}
                  </li>
                )}
                {product.specs.moq && (
                  <li>
                    <strong className="text-white">MOQ:</strong> {product.specs.moq}
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
            <div className="relative h-96 w-full rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="bg-[#fdfbf7] border border-amber-100/50 p-6 rounded-2xl flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="font-extrabold text-brand-blue-dark text-xs sm:text-sm">Artisanal Customization</h5>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                  We support custom designs, bespoke sizing, custom velvet lining colors, logo engraving, and private label boxes. Specify requirements in the RFQ.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Actions */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="font-extrabold text-brand-blue-dark text-lg sm:text-xl border-b border-slate-100 pb-2">
                Craft Profile & Description
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                {product.description}
              </p>
            </div>

            {/* Quick Sourcing Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={`/handicrafts/rfq?prod=${product.slug}`}
                className="flex-1 bg-[#b45309] hover:bg-[#854d0e] text-white font-extrabold text-center py-4 text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-1"
              >
                Inquire wholesale quote <ArrowUpRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Detailed Specifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 pt-16">
        <h3 className="font-black text-brand-blue-dark text-xl sm:text-2xl mb-8">Technical Parameters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: Material & Sizing */}
          <div className="bg-[#fdfbf7] border border-amber-100/50 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-amber-250 pb-2 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-amber-600" /> Sizing & Materials
            </h4>
            <table className="w-full text-xs text-slate-655 space-y-2">
              <tbody>
                {product.specs.material && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Primary Material</td><td className="py-2 text-right">{product.specs.material}</td></tr>
                )}
                {product.specs.sizing && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Dimensions</td><td className="py-2 text-right">{product.specs.sizing}</td></tr>
                )}
                {product.specs.technique && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Craft Technique</td><td className="py-2 text-right">{product.specs.technique}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Col 2: Packaging */}
          <div className="bg-[#fdfbf7] border border-amber-100/50 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-amber-250 pb-2 flex items-center gap-2">
              <FileCheck className="w-4.5 h-4.5 text-emerald-600" /> Packaging Details
            </h4>
            <table className="w-full text-xs text-slate-655 space-y-2">
              <tbody>
                {product.specs.packaging && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Packaging Type</td><td className="py-2 text-right">{product.specs.packaging}</td></tr>
                )}
                {product.specs.customization && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Customization</td><td className="py-2 text-right">{product.specs.customization}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Col 3: Shipping */}
          <div className="bg-[#fdfbf7] border border-amber-100/50 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-amber-250 pb-2 flex items-center gap-2">
              <Compass className="w-4.5 h-4.5 text-brand-blue" /> Trade Terms
            </h4>
            <table className="w-full text-xs text-slate-655 space-y-2">
              <tbody>
                {product.specs.moq && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Min Order Qty (MOQ)</td><td className="py-2 text-right">{product.specs.moq}</td></tr>
                )}
                {product.specs.leadTime && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Delivery Lead Time</td><td className="py-2 text-right">{product.specs.leadTime}</td></tr>
                )}
                {product.specs.portOfLoading && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Port of Loading</td><td className="py-2 text-right">{product.specs.portOfLoading}</td></tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 4. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 pt-16">
          <h2 className="section-title">Similar Craft Styles</h2>
          <div className="section-subtitle text-[#b45309] font-black uppercase tracking-widest text-center text-xs mb-10">Artisanal Sourcing Portfolios</div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
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
                    href={`/handicrafts/products/${p.slug}`}
                    className="text-[#b45309] font-bold hover:underline flex items-center gap-0.5"
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
