"use client";

import Link from "next/link";
import React from "react";
import { FiArrowRight, FiCheckCircle, FiUploadCloud } from "react-icons/fi";

const JoinProvider = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Structural Backdrop Soft Focus Flares */}
      <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-[#7C3AED]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50/50 rounded-[2.5rem] border border-gray-100 p-8 md:p-14 lg:p-16 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Premium Value Proposition Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
              <FiUploadCloud className="animate-bounce" /> Partner Ecosystem
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight leading-[1.1]">
              Turn your bookshelf into a <br />
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                Digital Neighborhood Library.
              </span>
            </h2>

            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-xl">
              Join the Biblio Drop supplier collective. List your literary works, orchestrate quick logistics, and earn while keeping your community connected to physical print.
            </p>

            {/* Micro Feature Bullet Matrix */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm font-semibold text-gray-600">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#7C3AED]" size={16} /> Integrated inventory systems
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#7C3AED]" size={16} /> Automated courier routing
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#7C3AED]" size={16} /> Complete control over catalogs
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-[#7C3AED]" size={16} /> Flexible rental windows
              </li>
            </ul>
          </div>

          {/* Right Column: Interaction Action Panel Box */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px] p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_20px_50px_rgba(17,24,39,0.04)] text-center relative overflow-hidden group">
              {/* Colored ambient border trace */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#7C3AED]" />
              
              <h3 className="text-[#111827] font-black text-xl mb-2 tracking-tight">
                Ready to distribute?
              </h3>
              <p className="text-gray-400 text-xs font-medium mb-8">
                Setup takes under 5 minutes. No technical overhead required.
              </p>

              {/* Stacked CTA Buttons */}
              <div className="flex flex-col gap-3">
                <Link 
                  href="/auth/signup?role=librarian" 
                  className="w-full h-14 bg-[#7C3AED] hover:bg-purple-700 text-white rounded-xl font-bold text-base transition-all shadow-[0_8px_20px_rgba(124,58,237,0.25)] flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  Join as Provider
                  <FiArrowRight size={18} />
                </Link>
                
                <Link 
                  href="#" 
                  className="w-full h-14 bg-gray-50 hover:bg-gray-100 text-[#111827] border border-gray-200 rounded-xl font-bold text-base transition-all flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinProvider;