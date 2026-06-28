"use client";

import React from "react";
import { FiUsers, FiMapPin, FiTruck, FiGitCommit } from "react-icons/fi";

const BiblioEcosystem = () => {
  const metrics = [
    {
      id: 1,
      value: "15,000+",
      label: "Active Readers",
      description: "Avid community members borrowing and reading daily.",
      icon: <FiUsers size={20} />,
      bgColor: "bg-purple-50 text-[#7C3AED]",
      hoverGradient: "group-hover:from-purple-600 group-hover:to-indigo-600"
    },
    {
      id: 2,
      value: "120+",
      label: "Partner Libraries",
      description: "Local branches and private catalogs integrated seamlessly.",
      icon: <FiMapPin size={20} />,
      bgColor: "bg-blue-50 text-[#2563EB]",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-indigo-600"
    },
    {
      id: 3,
      value: "45 Mins",
      label: "Avg. Drop Time",
      description: "From digital confirmation right to your residential step.",
      icon: <FiTruck size={20} />,
      bgColor: "bg-amber-50 text-[#F59E0B]",
      hoverGradient: "group-hover:from-amber-500 group-hover:to-orange-500"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 relative overflow-hidden border-y border-slate-100/80">
      {/* Decorative Gradient Flare */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-10 w-[300px] h-[300px] bg-[#7C3AED]/5 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Context Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
              <FiGitCommit className="animate-pulse" /> Our Footprint
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight leading-none">
              Empowering <br />
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                Local Literacy.
              </span>
            </h2>
            
            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
              Biblio Drop bridges the gap between static regional libraries and readers who value a premium, home-delivery borrowing rhythm. 
            </p>
            
            <div className="pt-6 border-t border-slate-200 flex items-center gap-6">
              <div>
                <p className="text-2xl font-black text-[#111827]">99.4%</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Fulfillment Rate</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <p className="text-2xl font-black text-[#111827]">24/7</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Catalog Requests</p>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Dynamic Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <div 
                key={metric.id}
                className="bg-slate-50/50 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col justify-between h-[240px] group relative overflow-hidden"
              >
                {/* Smooth Background Color Fill on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

                {/* Upper row: Icon Container */}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${metric.bgColor} shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all duration-300`}>
                  {metric.icon}
                </div>

                {/* Content Block */}
                <div className="mt-6">
                  <h3 className="text-3xl font-black text-[#111827] group-hover:text-white tracking-tight mb-1 transition-colors duration-300">
                    {metric.value}
                  </h3>
                  <p className="text-sm font-bold text-[#111827] group-hover:text-white/90 tracking-wide mb-1.5 transition-colors duration-300">
                    {metric.label}
                  </p>
                  <p className="text-xs font-medium text-gray-400 group-hover:text-white/70 leading-relaxed transition-colors duration-300">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BiblioEcosystem;