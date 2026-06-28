"use client";

import Link from "next/link";
import React from "react";
import { 
  FiBookOpen, 
  FiCpu, 
  FiBriefcase, 
  FiSearch, 
  FiHeart,
  FiTrendingUp,
  FiArrowRight,
  FiStar,
  FiClock,
  FiUser,
  FiSun,
  FiSmile,
  FiFeather,
  FiCompass
} from "react-icons/fi";

const PopularCategories = () => {
  
  const categories = [
    {
      id: 1,
      name: "Fiction",
      count: "1,240+",
      icon: <FiBookOpen size={20} />,
      accentColor: "from-blue-500 to-indigo-500",
    },
    {
      id: 2,
      name: "Sci-Fi",
      count: "850+",
      icon: <FiCpu size={20} />,
      accentColor: "from-purple-500 to-fuchsia-500",
    },
    {
      id: 3,
      name: "Fantasy",
      count: "1,050+",
      icon: <FiStar size={20} />,
      accentColor: "from-indigo-500 to-purple-500",
    },
    {
      id: 4,
      name: "Mystery & Thriller",
      count: "940+",
      icon: <FiSearch size={20} />,
      accentColor: "from-orange-500 to-amber-500",
    },
    {
      id: 5,
      name: "Romance",
      count: "1,120+",
      icon: <FiHeart size={20} />,
      accentColor: "from-rose-500 to-pink-500",
    },
    {
      id: 6,
      name: "Academic",
      count: "3,120+",
      icon: <FiBriefcase size={20} />,
      accentColor: "from-emerald-500 to-teal-500",
    },
    {
      id: 7,
      name: "History",
      count: "730+",
      icon: <FiClock size={20} />,
      accentColor: "from-amber-500 to-yellow-500",
    },
    {
      id: 8,
      name: "Biography",
      count: "620+",
      icon: <FiUser size={20} />,
      accentColor: "from-cyan-500 to-blue-500",
    },
    {
      id: 9,
      name: "Self-Help",
      count: "1,530+",
      icon: <FiSun size={20} />,
      accentColor: "from-yellow-500 to-orange-500",
    },
    {
      id: 10,
      name: "Business & Economics",
      count: "620+",
      icon: <FiTrendingUp size={20} />,
      accentColor: "from-teal-500 to-emerald-500",
    },
    {
      id: 11,
      name: "Children's Books",
      count: "890+",
      icon: <FiSmile size={20} />,
      accentColor: "from-pink-500 to-rose-500",
    },
    {
      id: 12,
      name: "Poetry",
      count: "410+",
      icon: <FiFeather size={20} />,
      accentColor: "from-fuchsia-500 to-pink-500",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden border-y border-slate-100">
      {/* Dynamic Background Element */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Asymmetrical Sticky-Ready Brand Sidebar Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-8 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-6">
                <FiCompass className="animate-spin-slow" /> Library Index
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4 tracking-tight leading-none">
                Popular <br />
                <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                  Categories
                </span>
              </h2>
              
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
                Explore our vast collection of books spanning across various genres. Find exactly what you're looking for within the integrated delivery system.
              </p>
            </div>

            <Link 
              href="/browse-books" 
              className="inline-flex items-center justify-center gap-2 w-full bg-[#111827] hover:bg-[#7C3AED] text-white font-bold text-sm h-12 rounded-xl transition-all shadow-md group"
            >
              View All Categories
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid Content Column */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {categories.map((category) => (
              <Link
                href={''}
                // href={`/browse?category=${encodeURIComponent(category.name)}`}
                key={category.id}
                className="group relative bg-slate-50/40 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between h-[150px] transition-all duration-300 hover:bg-white hover:border-slate-300/80 hover:shadow-[0_12px_24px_rgba(15,23,42,0.04)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Upper Row: Dynamic Icon & Active Indicator */}
                <div className="flex items-center justify-between w-full">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 bg-white border border-slate-100 group-hover:bg-gradient-to-br ${category.accentColor} group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm`}>
                    {category.icon}
                  </div>
                  
                  {/* Modern Active Bullet Tracker */}
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#7C3AED] group-hover:scale-125 transition-all duration-300" />
                </div>

                {/* Bottom Row: Text Blocks */}
                <div className="mt-4">
                  <h3 className="text-base font-black text-[#111827] mb-1 tracking-tight line-clamp-1 group-hover:text-[#7C3AED] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {category.count} Titles
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PopularCategories;