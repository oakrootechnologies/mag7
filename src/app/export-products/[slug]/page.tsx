import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowUpRight,
  FileCheck,
  Ship,
  Sparkles
} from "lucide-react";
import { products } from "@/data/products";
import dynamic from "next/dynamic";

const ProductEnquiry = dynamic(() => import("@/components/ProductEnquiry"), {
  ssr: false,
});

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Default export steps
  const exportSteps = [
    { title: "Enquiry", desc: "Customer shares specs, quantity, packing & destination port." },
    { title: "Verification", desc: "Mag7 issues FOB/CIF quotes & verifies import barriers." },
    { title: "Farmer Sourcing", desc: "Harvesting directly from verified farms & FPCs." },
    { title: "Sizing & Grading", desc: "Grading for weight, length, and maturity compliance." },
    { title: "Box Packaging", desc: "Packing in export-grade telescopic cartons or mesh bags." },
    { title: "Phytosanitary Audit", desc: "FSSAI / APEDA certificates & lab analysis compliance check." },
    { title: "Custom Loading", desc: "Loading in clean reefer containers at JNPT Port." },
    { title: "Destination Delivery", desc: "Sea or air freight arrival at port & customs clearing." },
  ];

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
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 md:space-y-6 text-white max-w-3xl text-left">
            <Link
              href="/export-products"
              className="inline-flex items-center gap-1 text-xs text-brand-green hover:underline font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">{product.name}</h1>
            
            {/* Quick Specs horizontal list */}
            <div className="text-xs md:text-sm font-semibold text-slate-300">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 border-l-2 border-brand-green pl-4">
                {product.specs.color && (
                  <li>
                    <strong className="text-white">Color:</strong> {product.specs.color}
                  </li>
                )}
                {product.specs.maturity && (
                  <li>
                    <strong className="text-white">Maturity:</strong> {product.specs.maturity}
                  </li>
                )}
                {product.specs.shelfLife && (
                  <li>
                    <strong className="text-white">Shelf Life:</strong> {product.specs.shelfLife}
                  </li>
                )}
                {product.specs.weight && (
                  <li>
                    <strong className="text-white">Weight:</strong> {product.specs.weight}
                  </li>
                )}
              </ul>
            </div>

            <ProductEnquiry
              productName={product.name}
              className="btn-primary px-6 py-2.5 text-sm"
            >
              Get A Quote
            </ProductEnquiry>
          </div>
        </div>
      </section>

      {/* 2. Product Description Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50 p-6 md:p-10 rounded-2xl border border-slate-100">
          <div className="md:col-span-3 flex flex-col items-center gap-3">
            <Image
              src="/logo/hori logo.png"
              alt="Mag7 Global Logo"
              width={160}
              height={40}
              className="object-contain"
            />
            <div className="flex gap-2">
              <span className="text-2xl" title="India Origin">🇮🇳</span>
              <span className="text-2xl" title="Dubai Import">🇦🇪</span>
            </div>
          </div>
          <div className="md:col-span-9 text-slate-700 text-sm md:text-base leading-relaxed space-y-4">
            <p className="font-semibold text-brand-blue-dark">Premium Sourced Produce:</p>
            <p>{product.description}</p>
            <p className="text-xs text-slate-500 font-medium">
              Mag7 Global coordinates directly with regional farmers to establish standard sorting matrices, ensuring this produce conforms with residual pesticide MRL limits of importing nations (GCC, EU, US, Australia).
            </p>
          </div>
        </div>
      </section>

      {/* 3. Export Process Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Export Process</h2>
        <div className="section-subtitle">Our Quality Sourcing & Logistics Pipeline</div>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-8 pt-2">
          {exportSteps.map((step, idx) => (
            <div key={idx} className="relative pl-6 md:pl-10 group">
              <span className="absolute -left-[11px] top-1 flex items-center justify-center w-5 h-5 rounded-full bg-brand-green text-white text-[9px] font-bold shadow">
                {idx + 1}
              </span>
              <div className="space-y-1">
                <h4 className="font-bold text-brand-blue-dark text-sm md:text-base group-hover:text-brand-green transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Specifications Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Export Specifications</h2>
        <div className="section-subtitle">Standard Shipping & Packing Matrix</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: Product details */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-slate-200 pb-2 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-brand-green" /> Product Details
            </h4>
            <table className="w-full text-xs text-slate-600 space-y-2">
              <tbody>
                {product.specs.color && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Color</td><td className="py-2 text-right">{product.specs.color}</td></tr>
                )}
                {product.specs.length && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Length/Size</td><td className="py-2 text-right">{product.specs.length}</td></tr>
                )}
                {product.specs.maturity && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Maturity</td><td className="py-2 text-right">{product.specs.maturity}</td></tr>
                )}
                {product.specs.shelfLife && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Shelf Life</td><td className="py-2 text-right">{product.specs.shelfLife}</td></tr>
                )}
                {product.specs.weight && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Weight</td><td className="py-2 text-right">{product.specs.weight}</td></tr>
                )}
                {product.specs.temp && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Temp</td><td className="py-2 text-right">{product.specs.temp}</td></tr>
                )}
                {product.specs.origin && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Origin</td><td className="py-2 text-right">{product.specs.origin}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Col 2: Packaging */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-slate-200 pb-2 flex items-center gap-2">
              <FileCheck className="w-4.5 h-4.5 text-brand-blue" /> Packaging Details
            </h4>
            <table className="w-full text-xs text-slate-600 space-y-2">
              <tbody>
                {product.specs.packaging && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Packaging Type</td><td className="py-2 text-right">{product.specs.packaging}</td></tr>
                )}
                {product.specs.boxQuality && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Box Standard</td><td className="py-2 text-right">{product.specs.boxQuality}</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Col 3: Additional */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-brand-blue-dark text-base border-b border-slate-200 pb-2 flex items-center gap-2">
              <Ship className="w-4.5 h-4.5 text-brand-green" /> Shipping Terms
            </h4>
            <table className="w-full text-xs text-slate-600 space-y-2">
              <tbody>
                {product.specs.incoTerms && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">IncoTerms</td><td className="py-2 text-right">{product.specs.incoTerms}</td></tr>
                )}
                {product.specs.paymentTerms && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Payment</td><td className="py-2 text-right">{product.specs.paymentTerms}</td></tr>
                )}
                {product.specs.deliveryTime && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Delivery</td><td className="py-2 text-right">{product.specs.deliveryTime}</td></tr>
                )}
                {product.specs.portOfLoading && (
                  <tr className="border-b border-slate-100"><td className="py-2 font-bold text-slate-800">Loading Port</td><td className="py-2 text-right">{product.specs.portOfLoading}</td></tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 5. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Other Products...</h2>
          <div className="section-subtitle">Related Sourcing Portfolios</div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-32 w-full overflow-hidden">
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
                    href={`/export-products/${p.slug}`}
                    className="text-brand-blue font-bold hover:underline flex items-center gap-0.5"
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
