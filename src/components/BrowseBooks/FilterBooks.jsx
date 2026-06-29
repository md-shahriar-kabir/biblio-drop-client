"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { FiSearch, FiX, FiChevronRight, FiFilter, FiCompass } from "react-icons/fi";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FilterBooks = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  // Directly derive initial values as explicit fallback strings
  const currentCategory = searchParams.get("category") || "all";
  const currentFee = searchParams.get("fee") || "all";

  const categoryOptions = [
    { id: "all", label: "All Categories" },
    { id: "Fiction", label: "Fiction" },
    { id: "Sci-Fi", label: "Sci-Fi" },
    { id: "Fantasy", label: "Fantasy" },
    { id: "Mystery-Thriller", label: "Mystery & Thriller" },
    { id: "Romance", label: "Romance" },
    { id: "Academic", label: "Academic" },
    { id: "History", label: "History" },
    { id: "Biography", label: "Biography" },
    { id: "Self-Help", label: "Self-Help" },
    { id: "Business", label: "Business" },
    { id: "Children", label: "Children" },
    { id: "Poetry", label: "Poetry" },
  ];

  const updateQueryParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    setSearchValue("");
    router.push(pathname, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue !== (searchParams.get("search") || "")) {
        updateQueryParams("search", searchValue);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const hasActiveFilters = searchValue || currentCategory !== "all" || currentFee !== "all";

  return (
    <div className="max-w-[1400px] mx-auto w-full mt-30 mb-8 px-1">
      
      {/* 🌟 Dynamic Header Section with Glass-morphic Accents */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm shrink-0">
              <FiCompass size={16} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#0D3B66] tracking-tight">
              Explore Book Marketplace
            </h1>
          </div>
          <p className="text-xs font-semibold text-slate-400 pl-10">
            Discover and securely reserve curated prints from independent collections nearby.
          </p>
        </div>
        
        {/* Safe Clear Filters Action Button Trigger */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-black tracking-wider uppercase text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-full border border-rose-100/50 transition-all duration-200 shadow-sm self-start sm:self-auto"
          >
            <FiX size={13} strokeWidth={2.5} /> Clear Active Filters
          </button>
        )}
      </div>

      {/* 🔮 Main Luxury Glass-morphic Container Wrapper */}
      <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/50 p-4 md:p-5 space-y-5 shadow-[0_10px_30px_rgba(124,58,237,0.01)]">
        
        {/* Row 1: High-Performance Custom Search Input */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-600 transition-colors">
              <FiSearch size={16} />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by title, author keywords, or ISBN numbers..."
              className="w-full h-11 pl-11 pr-10 bg-purple-50/20 border border-purple-100/40 rounded-xl outline-none hover:border-purple-200/60 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-50 transition-all text-xs font-semibold text-slate-700 placeholder:text-slate-400/80 shadow-inner"
            />
            {searchValue && (
              <button 
                onClick={() => setSearchValue("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-rose-500 transition-colors"
              >
                <FiX size={15} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Premium Horizontal Scrolling Category Chips Carousel */}
        <div className="pt-4 border-t border-purple-50/60 relative flex items-center">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 pr-10">
            {/* Minimalist Filter Icon Indicator */}
            <div className="flex items-center gap-1 text-purple-400/80 pr-2 shrink-0 border-r border-purple-50 mr-1 hidden sm:flex">
              <FiFilter size={13} />
              <span className="text-[10px] font-black uppercase tracking-wider">Genres:</span>
            </div>

            {categoryOptions.map((cat) => {
              const isSelected = currentCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  onClick={() => updateQueryParams("category", cat.id)}
                  className={`h-8 px-4 rounded-full text-[11px] font-black tracking-wide transition-all duration-200 shrink-0 whitespace-nowrap border ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-[0_4px_12px_rgba(124,58,237,0.2)]"
                      : "bg-white text-slate-500 border-purple-100/50 hover:border-purple-200 hover:text-[#0D3B66] hover:bg-purple-50/30"
                  }`}
                >
                  {cat.label}
                </Button>
              );
            })}
          </div>
          
          {/* Edge Fade Gradient Box Layout Indicator */}
          <div className="absolute right-0 top-3 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none flex items-center justify-end text-purple-400/60">
            <FiChevronRight size={15} strokeWidth={2.5} className="mr-0.5" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterBooks;