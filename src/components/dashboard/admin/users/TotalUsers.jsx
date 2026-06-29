"use client";

import React from "react";
import { FiUsers, FiActivity, FiHardDrive } from "react-icons/fi";

const TotalUsers = ({ users }) => {
  // Safe evaluation to ensure no breakdown if users array is missing
  const totalUsersCount = Array.isArray(users) ? users.length : 0;

  return (
    <div className="w-full bg-gradient-to-tr from-purple-50/20 via-transparent to-indigo-50/10 rounded-3xl p-1 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 🔮 1. TOTAL USERS CARD */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.01)] p-6 flex flex-col justify-between min-h-[140px] relative overflow-hidden group select-none hover:shadow-[0_15px_35px_rgba(124,58,237,0.03)] transition-all duration-300">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-600/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
              Total Managed Users
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100/40 shadow-sm">
              <FiUsers size={14} />
            </div>
          </div>
          
          <div className="flex items-baseline gap-2 mt-4 relative z-10">
            <span className="text-[36px] font-black text-[#0D3B66] tracking-tight leading-none">
              {totalUsersCount}
            </span>
            <span className="text-[10px] font-black text-emerald-600 tracking-wide bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/40">
              +12%
            </span>
          </div>
        </div>

        {/* ⚡ 2. ACTIVE SESSIONS CARD */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.01)] p-6 flex flex-col justify-between min-h-[140px] relative overflow-hidden group select-none hover:shadow-[0_15px_35px_rgba(124,58,237,0.03)] transition-all duration-300">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-600/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
              Active Sessions
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/40 shadow-sm">
              <FiActivity size={14} className="animate-pulse" />
            </div>
          </div>
          
          <div className="flex items-baseline gap-2 mt-4 relative z-10">
            <span className="text-[36px] font-black text-[#0D3B66] tracking-tight leading-none">
              1,500
            </span>
            <span className="text-[10px] font-extrabold text-indigo-500 tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              Live Now
            </span>
          </div>
        </div>

        {/* 💾 3. STORAGE USED CARD (WITH GRADIENT PROGRESS BAR) */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.01)] p-6 flex flex-col justify-between min-h-[140px] relative overflow-hidden group select-none hover:shadow-[0_15px_35px_rgba(124,58,237,0.03)] transition-all duration-300">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-fuchsia-600/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
              Cluster Storage Used
            </span>
            <div className="w-8 h-8 rounded-xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center border border-fuchsia-100/40 shadow-sm">
              <FiHardDrive size={14} />
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 mt-4 w-full relative z-10">
            <span className="text-[36px] font-black text-[#0D3B66] tracking-tight leading-none shrink-0">
              75%
            </span>
            {/* Smooth Premium Animated Gradient Progress Bar */}
            <div className="w-full bg-purple-50 h-2.5 rounded-full overflow-hidden max-w-[160px] border border-purple-100/30">
              <div 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                style={{ width: "84%" }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TotalUsers;