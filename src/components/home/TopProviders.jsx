import { getUsers } from "@/lib/api/users";
import Image from "next/image";
import React from "react";
import { FiStar, FiTruck, FiAward, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

const TopProviders = async () => {
  const users = await getUsers();

  const librarians = users?.filter((user) => user?.role === "librarian") || [];

  // Functionality intact: extracting indices 4 to 6
  const threeLibrarians = librarians.slice(4, 7);

  if (!threeLibrarians || threeLibrarians.length === 0) {
    return null;
  }

  const staticStats = [
    { deliveries: 142, rating: "4.9" },
    { deliveries: 128, rating: "4.8" },
    { deliveries: 115, rating: "4.9" },
  ];

  return (
    <section className="py-10 md:py-18 bg-purple-50 relative overflow-hidden selection:bg-[#7C3AED]/10">
      {/* Background Blur Decorations */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid Layout: Left Content, Right Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: TEXT CONTENT & MOTION CARD */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-100 rounded-full text-[#7C3AED] text-xs font-bold uppercase tracking-widest">
              <FiAward size={14} />
              <span>Excellence in Service</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none">
              Leading Publishing Partners
            </h2>
            
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Celebrating our trusted publishing and distribution partners who ensure quality books reach libraries, institutions, and readers efficiently across the network.
            </p>

            {/* --- NEW: INTERACTIVE MOTION CARD --- */}
            <div className="relative group/motion max-w-md mx-auto lg:mx-0 pt-2">
              {/* Outer Glowing Decorative Border (Animated) */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7C3AED] to-blue-500 rounded-2xl opacity-10 group-hover/motion:opacity-20 transition duration-500 blur-sm"></div>
              
              {/* Main Card */}
              <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all duration-300 group-hover/motion:bg-white group-hover/motion:shadow-md group-hover/motion:border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center relative">
                    <FiTrendingUp size={20} className="relative z-10" />
                    {/* Pulsing Core */}
                    <span className="absolute inset-0 rounded-xl bg-[#7C3AED]/20 animate-pulse"></span>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Network Status</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">98.4% On-Time Deliveries</p>
                  </div>
                </div>
                
                {/* Live Indicator Dot */}
                <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: PROVIDERS PROFILES LIST */}
          <div className="lg:col-span-7 space-y-4 w-full max-w-2xl mx-auto lg:max-w-none">
            {threeLibrarians.map((provider, index) => {
              const fallbackInitial = provider?.name?.charAt(0).toUpperCase() || "L";
              const stats = staticStats[index];

              return (
                <div
                  key={provider._id || index}
                  className="group bg-slate-50/60 hover:bg-white border border-slate-100 hover:border-purple-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-600/5 hover:-translate-y-1"
                >
                  {/* Left part of card: Avatar & Identity */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    {/* Ranking Badge & Avatar Container */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-2 border-white shadow-md overflow-hidden bg-purple-50 flex items-center justify-center ring-1 ring-slate-200/60">
                        {provider?.image ? (
                          <Image
                            src={provider.image}
                            alt={provider?.name || "Provider"}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <span className="text-[#7C3AED] text-2xl font-bold">
                            {fallbackInitial}
                          </span>
                        )}
                      </div>
                      {/* Rank Badge */}
                      <div className="absolute -top-1 -left-1 bg-[#7C3AED] text-white w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>

                    {/* Identity Details */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#7C3AED] transition-colors tracking-tight">
                        {provider?.name || "Unknown Provider"}
                      </h3>
                      <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase mt-0.5">
                        Certified Librarian
                      </p>
                    </div>
                  </div>

                  {/* Right part of card: Stats */}
                  <div className="flex items-center gap-6 border-t sm:border-t-0 border-slate-200/60 pt-4 sm:pt-0 w-full sm:w-auto justify-around sm:justify-end">
                    {/* Deliveries */}
                    <div className="text-center sm:text-right">
                      <div className="flex items-center justify-center sm:justify-end gap-1.5 text-slate-400 mb-0.5">
                        <FiTruck size={13} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          Deliveries
                        </span>
                      </div>
                      <p className="text-xl font-bold text-slate-800">
                        {stats?.deliveries}
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

                    {/* Rating */}
                    <div className="text-center sm:text-right">
                      <div className="flex items-center justify-center sm:justify-end gap-1.5 text-slate-400 mb-0.5">
                        <FiStar size={13} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          Rating
                        </span>
                      </div>
                      <p className="text-xl font-bold text-slate-800">
                        {stats?.rating}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopProviders;