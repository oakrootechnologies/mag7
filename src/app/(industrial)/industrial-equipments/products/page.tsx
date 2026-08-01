"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowUpRight, Filter } from "lucide-react";
import { industrialProducts } from "@/data/industrial";

function IndustrialListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams?.get("cat") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleTabChange = (cat: string) => {
    setActiveCategory(cat);
    router.replace(`/industrial-equipments/products?cat=${cat}`);
  };

  const filteredProducts = industrialProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categoriesList = [
    { id: "all", name: "All Machinery" },
    { id: "pumps", name: "Centrifugal Pumps" },
    { id: "valves", name: "Industrial Valves" },
    { id: "motors", name: "Electric Motors" },
    { id: "generators", name: "Silent Generators" },
    { id: "compressors", name: "Air Compressors" }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-slate-100 py-12 border-b border-slate-205">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
            <li><Link href="/industrial-equipments" className="hover:text-[#ea580c]">Industrial Home</Link></li>
            <li className="text-slate-400">/</li>
            <li className="text-[#ea580c] font-semibold">Machinery Portfolio</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue-dark tracking-tight">Industrial Equipment Catalog</h1>
        </div>
      </section>

      {/* Main Browse Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl">
              <h3 className="font-extrabold text-brand-blue-dark text-sm flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-[#ea580c]" /> Equipment Class
              </h3>
              <nav className="flex flex-col gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`text-left px-3.5 py-2.5 rounded-none text-xs font-bold transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-[#ea580c] text-white"
                        : "text-slate-655 hover:bg-slate-150 hover:text-[#ea580c]"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column: Browse and Grid */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-slate-150 p-4 rounded-2xl shadow-sm">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search machinery catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-none text-xs font-medium focus:outline-none focus:border-[#ea580c]"
                />
              </div>
              <div className="text-[10px] font-bold text-slate-405 tracking-wider uppercase">
                Showing {filteredProducts.length} Equipment Items
              </div>
            </div>

            {/* Mobile Category Select */}
            <div className="block lg:hidden overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex gap-2">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                      activeCategory === cat.id
                        ? "bg-[#ea580c] border-[#ea580c] text-white"
                        : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid display */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-slate-50">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-[#ea580c]/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-extrabold text-brand-blue-dark text-sm sm:text-base leading-snug group-hover:text-[#ea580c] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <Link
                        href={`/industrial-equipments/products/${product.slug}`}
                        className="text-[#ea580c] font-bold hover:underline flex items-center gap-0.5"
                      >
                        Details <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/industrial-equipments/rfq"
                        className="text-emerald-600 hover:text-emerald-700 font-bold uppercase tracking-wider hover:underline"
                      >
                        RFQ
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-150">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No matching industrial equipment found.</p>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}

export default function IndustrialListPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-bold text-slate-400">Loading machinery...</div>}>
      <IndustrialListContent />
    </Suspense>
  );
}
