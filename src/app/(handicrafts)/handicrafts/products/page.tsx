"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowUpRight, Filter } from "lucide-react";
import { handicraftsProducts } from "@/data/handicrafts";

function CraftsListContent() {
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
    router.replace(`/handicrafts/products?cat=${cat}`);
  };

  const filteredProducts = handicraftsProducts.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categoriesList = [
    { id: "all", name: "All Crafts" },
    { id: "wooden", name: "Wooden Handicrafts" },
    { id: "brass", name: "Brass & Metal" },
    { id: "pottery", name: "Blue Pottery" },
    { id: "textiles", name: "Handwoven Textiles" },
    { id: "stone", name: "Inlaid Stone Craft" }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-[#f9f5eb] py-12 border-b border-amber-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-3">
            <li><Link href="/handicrafts" className="hover:text-[#b45309]">Handicrafts Home</Link></li>
            <li className="text-slate-400">/</li>
            <li className="text-[#b45309] font-semibold">Craft Collections</li>
          </ul>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-blue-dark tracking-tight">Artisanal Sourcing Catalog</h1>
        </div>
      </section>

      {/* Main Browse Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-[#fdfbf7] border border-amber-100/50 p-6 rounded-2xl">
              <h3 className="font-extrabold text-brand-blue-dark text-sm flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-[#b45309]" /> Craft Categories
              </h3>
              <nav className="flex flex-col gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`text-left px-3.5 py-2.5 rounded-none text-xs font-bold transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-[#b45309] text-white"
                        : "text-slate-655 hover:bg-amber-50 hover:text-[#b45309]"
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
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search crafts catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#b45309]"
                />
              </div>
              <div className="text-[10px] font-bold text-slate-405 tracking-wider uppercase">
                Showing {filteredProducts.length} Items
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
                        ? "bg-[#b45309] border-[#b45309] text-white"
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
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
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
                        <span className="absolute top-3 left-3 bg-[#b45309]/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-extrabold text-brand-blue-dark text-sm sm:text-base leading-snug group-hover:text-[#b45309] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                      <Link
                        href={`/handicrafts/products/${product.slug}`}
                        className="text-[#b45309] font-bold hover:underline flex items-center gap-0.5"
                      >
                        Details <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/handicrafts/rfq"
                        className="text-emerald-600 hover:text-emerald-700 font-bold uppercase tracking-wider hover:underline"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No matching crafts found.</p>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}

export default function CraftsListPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs font-bold text-slate-400">Loading catalog...</div>}>
      <CraftsListContent />
    </Suspense>
  );
}
