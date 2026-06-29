import React from 'react';
import { 
  FiBookOpen, 
  FiUsers, 
  FiGlobe, 
  FiTarget, 
  FiHeart, 
  FiShield, 
  FiLayers, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiHelpCircle 
} from 'react-icons/fi';

const About = () => {
  return (
    <div className="space-y-12 w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 bg-gradient-to-tr from-purple-50/40 via-transparent to-indigo-50/30 rounded-3xl animate-fadeIn mt-4">
      
      {/* 🔮 --- 1. PREMIUM HERO BANNER WITH VIRTUAL GROWTH COUNTERS --- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#2e1065] to-[#120626] p-6 md:p-10 text-white shadow-[0_20px_50px_rgba(124,58,237,0.15)]">
        {/* Glowing Ambient Background Backdrops */}
        <div className="absolute -right-10 -top-40 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            {/* Modern Platform Identifier Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-300 border border-purple-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" /> 
              Discover Our Architecture
            </span>
            
            {/* Main Catchy Header */}
            <h1 className="mt-4 text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              Connecting Readers With The Books They Love
            </h1>
            
            {/* Elite Subtext */}
            <p className="mt-3 text-xs md:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
              We believe that boundless knowledge should be globally accessible. BiblioDrop bridges the operational gap between passionate readers and decentralized local repositories, making literary distribution smoother than ever.
            </p>
          </div>

          {/* Virtual Metrics/Stats Grid Inside Hero */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-inner hover:bg-white/10 transition-all">
              <p className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Active Readers</p>
              <p className="text-2xl font-black text-white mt-1">45K+</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-inner hover:bg-white/10 transition-all">
              <p className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Global Catalog</p>
              <p className="text-2xl font-black text-white mt-1">120K+</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 --- 2. CORE VALUES: MISSION & VISION CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Our Mission Card */}
        <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.01)] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(124,58,237,0.04)] hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-600/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
          <div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-xl border border-purple-100 shadow-sm mb-5">
              <FiTarget strokeWidth={2.2} />
            </div>
            <h3 className="text-lg font-black text-[#0D3B66] tracking-tight mb-3">Our Dedicated Mission</h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              To empower decentralized learning by constructing a seamless, logistics-backed library infrastructure. We strive to maintain a rock-solid platform where readers can dynamically catalog, request, and fetch literary masterpieces effortlessly.
            </p>
          </div>
        </div>

        {/* Our Vision Card */}
        <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.01)] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(124,58,237,0.04)] hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-600/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
          <div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl border border-indigo-100 shadow-sm mb-5">
              <FiGlobe strokeWidth={2.2} />
            </div>
            <h3 className="text-lg font-black text-[#0D3B66] tracking-tight mb-3">Our Global Vision</h3>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              We envision a highly integrated futuristic network where every distinct book efficiently locates its desired reader. By harnessing high-speed automated pipelines, we aim to design the largest trusted decentralized literary distribution hub.
            </p>
          </div>
        </div>
      </div>

      {/* 🚀 --- 3. PLATFORM CAPABILITIES / WHY CHOOSE US --- */}
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.02)]">
        <div className="flex flex-col items-center text-center mb-10 max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-purple-600 border border-purple-100/40">
            Why Choose BiblioDrop
          </span>
          <h2 className="text-xl md:text-2xl font-black text-[#0D3B66] mt-2 tracking-tight">The Core Pillars Of Our Innovation</h2>
          <p className="text-slate-400 text-xs mt-1 font-semibold">Discover the technological pillars driving our automated global library interface.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Pillar 1 */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-purple-50/30 transition-colors duration-200 group">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 border border-purple-100 shadow-sm group-hover:scale-110 transition-transform">
              <FiBookOpen size={18} />
            </div>
            <h4 className="text-sm font-black text-[#0D3B66] mb-1.5">Massive Catalog Stack</h4>
            <p className="text-slate-500 text-xs leading-relaxed font-medium max-w-xs">
              Gain instantaneous access to endless curated publications across multi-variant domains, actively verified by distributed curators.
            </p>
          </div>

          {/* Feature Pillar 2 */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-purple-50/30 transition-colors duration-200 group">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 border border-indigo-100 shadow-sm group-hover:scale-110 transition-transform">
              <FiUsers size={18} />
            </div>
            <h4 className="text-sm font-black text-[#0D3B66] mb-1.5">Community Centric Synergy</h4>
            <p className="text-slate-500 text-xs leading-relaxed font-medium max-w-xs">
              Engineered exclusively for community enrichment. Share real-time system critiques, write ratings, and save records autonomously.
            </p>
          </div>

          {/* Feature Pillar 3 */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-purple-50/30 transition-colors duration-200 group">
            <div className="w-12 h-12 bg-fuchsia-50 text-fuchsia-600 rounded-full flex items-center justify-center mb-4 border border-fuchsia-100 shadow-sm group-hover:scale-110 transition-transform">
              <FiShield size={18} />
            </div>
            <h4 className="text-sm font-black text-[#0D3B66] mb-1.5">Cryptographic Encryption</h4>
            <p className="text-slate-500 text-xs leading-relaxed font-medium max-w-xs">
              Authenticated administrative endpoints, lightning-fast secure logistics coordination, and total transaction audit transparency.
            </p>
          </div>
        </div>
      </div>

      {/* 🧭 --- 4. BRAND NEW EXTENSION: HOW WE OPERATE (TIMELINE MECHANISM) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center bg-gradient-to-br from-purple-900 via-[#1e1b4b] to-[#120626] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
        
        <div className="lg:pr-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-4">
            <FiLayers size={16} />
          </div>
          <h3 className="text-xl font-black tracking-tight mb-2">The Operational Lifecycle</h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            BiblioDrop converts basic traditional catalog operations into highly synchronized digitized distribution pipelines. Here is how our pipeline routes parameters.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <span className="text-xs font-black text-purple-400">01 / DISCOVER</span>
            <h5 className="text-xs font-black text-white mt-1 mb-1 uppercase tracking-wider">Browse Inventories</h5>
            <p className="text-[11px] text-slate-300 leading-normal font-medium">Explore massive admin-approved textbook pipelines filtered flawlessly by genre.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <span className="text-xs font-black text-purple-400">02 / INTERACT</span>
            <h5 className="text-xs font-black text-white mt-1 mb-1 uppercase tracking-wider">Deploy Actions</h5>
            <p className="text-[11px] text-slate-300 leading-normal font-medium">Instantly initialize fulfillment requests or log individual reading assessments.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <span className="text-xs font-black text-purple-400">03 / TRACK</span>
            <h5 className="text-xs font-black text-white mt-1 mb-1 uppercase tracking-wider">Verify Shipments</h5>
            <p className="text-[11px] text-slate-300 leading-normal font-medium">Watch order pipelines update via live transaction log monitors instantly.</p>
          </div>
        </div>
      </div>

      {/* 💬 --- 5. BRAND NEW EXTENSION: MODERN INTUITIVE PLATFORM FAQ --- */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.02)]">
        <div className="flex items-center gap-2 mb-6 border-b border-purple-50 pb-4">
          <FiHelpCircle className="text-purple-600" size={18} />
          <h3 className="text-base font-black text-[#0D3B66] tracking-tight">Frequently Answered Queries</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5 p-4 rounded-2xl bg-purple-50/30 border border-purple-100/20">
            <h5 className="text-xs font-black text-[#0D3B66] uppercase tracking-wide flex items-center gap-1.5">
              <FiCheckCircle className="text-purple-500 shrink-0" size={13} />
              Is book procurement data audited?
            </h5>
            <p className="text-slate-500 text-xs leading-relaxed font-medium pl-5">
              Yes, absolutely. Every transaction parameters, delivery costs, and operational logs are strictly calculated and hosted over isolated cloud tables.
            </p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-purple-50/30 border border-purple-100/20">
            <h5 className="text-xs font-black text-[#0D3B66] uppercase tracking-wide flex items-center gap-1.5">
              <FiCheckCircle className="text-purple-500 shrink-0" size={13} />
              Who authorizes systemic catalog status?
            </h5>
            <p className="text-slate-500 text-xs leading-relaxed font-medium pl-5">
              Platform administration controls the catalog approval architecture. Items go through automatic status streams before going live globally.
            </p>
          </div>
        </div>
      </div>

      {/* 💖 --- 6. MINIMALIST DEDICATED BRAND FOOTER --- */}
      <div className="text-center pb-4 pt-2">
        <p className="text-slate-400 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2">
          Developed By <FiHeart className="text-rose-500 fill-rose-500 animate-pulse" size={12} /> MD SHAHRIAR KABIR
        </p>
      </div>

    </div>
  );
};

export default About;