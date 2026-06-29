"use client";

import React, { useState, useEffect } from "react";
import { Select, ListBox, Button } from "@heroui/react";
import { FiSearch, FiSliders, FiX, FiCheck, FiChevronRight } from "react-icons/fi";
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 mb-10">
      
      {/* Dynamic Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tight mb-1">
            Explore Book Marketplace
          </h1>
          <p className="text-sm font-medium text-gray-400">
            Discover and securely reserve curated prints from independent collections nearby.
          </p>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-500 hover:text-[#7C3AED] bg-slate-100 hover:bg-purple-50 rounded-xl border border-transparent transition-all self-start sm:self-auto"
          >
            <FiX size={14} /> Clear Active Filters
          </button>
        )}
      </div>

      {/* Main Container Wrapper */}
      <div className="w-full bg-slate-50/60 backdrop-blur-md rounded-3xl border border-slate-200/60 p-4 md:p-6 space-y-6 shadow-sm">
        
        {/* Row 1: Search and Dropdowns combined wrapper */}
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Custom Search Input */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#7C3AED] transition-colors">
              <FiSearch size={18} />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by title, author keywords, or ISBN numbers..."
              className="w-full h-12 pl-11 pr-10 bg-white border border-slate-200 rounded-2xl outline-none hover:border-slate-300 focus:border-[#7C3AED] focus:ring-4 focus:ring-purple-50 transition-all text-sm font-medium text-gray-700 placeholder:text-gray-400 shadow-sm"
            />
            {searchValue && (
              <button 
                onClick={() => setSearchValue("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Premium Horizontal Scrolling Quick-Chips Carousel */}
        <div className="pt-4 border-t border-slate-200/60 relative flex items-center">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full py-1 pr-8">
            {categoryOptions.map((cat) => {
              const isSelected = currentCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  onClick={() => updateQueryParams("category", cat.id)}
                  className={`h-9 px-4 rounded-full text-xs font-bold transition-all shrink-0 whitespace-nowrap border ${
                    isSelected
                      ? "bg-[#7C3AED] text-white border-transparent shadow-[0_4px_12px_rgba(124,58,237,0.2)]"
                      : "bg-white text-gray-500 border-slate-200 hover:border-slate-300 hover:text-gray-700"
                  }`}
                >
                  {cat.label}
                </Button>
              );
            })}
          </div>
          {/* Edge fade gradient box indicating overflow navigation layout */}
          <div className="absolute right-0 top-3 bottom-0 w-12 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none flex items-center justify-end text-gray-300">
            <FiChevronRight size={16} className="mr-1 mt-1" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterBooks;