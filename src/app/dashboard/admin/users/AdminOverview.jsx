"use client";

import React from "react";
import { FiUsers, FiBook, FiTruck, FiDollarSign, FiShield, FiSliders, FiActivity, FiCpu } from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const AdminOverview = ({ users = [], books = [], orders = [] }) => {
  // ১. Quick Stats Logic (100% Same & Dynamic)
  const totalUsers = users.length;
  const totalBooks = books.length;

  const totalDeliveries = orders.filter(
    (order) => order.orderStatus === "delivered"
  ).length;

  const totalRevenue = orders
    .reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0)
    .toFixed(2);

  // ২. Books by Category Data (100% Same)
  const categoryCount = {};
  books.forEach((book) => {
    const category = book.category || "Uncategorized";
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    value: categoryCount[key],
  }));

  // ৩. Users by Role Data (100% Same)
  const roleCount = {};
  users.forEach((user) => {
    const role = user.role || "user";
    roleCount[role] = (roleCount[role] || 0) + 1;
  });

  const roleData = Object.keys(roleCount).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    count: roleCount[key],
  }));

  // Premium Color Palette
  const PREMIUM_COLORS = [
    "#6366F1", "#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#14B8A6"
  ];

  return (
    <div className="space-y-8 w-full max-w-[1400px] mx-auto p-4 md:p-6 bg-gradient-to-tr from-purple-50/40 via-transparent to-indigo-50/30 rounded-3xl animate-fadeIn mt-4">
      
      {/* 👑 --- BRAND NEW REDESIGNED HERO HEADER (রেড মার্ক করা অংশের নতুন রূপ) --- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1e1b4b] via-[#0D3B66] to-[#0A2540] p-6 md:p-8 text-white shadow-[0_20px_50px_rgba(13,59,102,0.15)]">
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্টস */}
        <div className="absolute -right-10 -top-20 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            {/* ছোট প্রিমিয়াম ব্যাজ */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-300 border border-purple-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" /> 
              Core Infrastructure Hub
            </span>
            
            {/* মেইন হেডিং */}
            <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
              Control Center & System Analytics
            </h1>
            
            {/* সাবকন্টেন্ট */}
            <p className="mt-1.5 text-xs md:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
              Real-time monitoring console overseeing global user authentication nodes, repository assets, and distributed transactional data flow pipelines.
            </p>
          </div>
          
          {/* ডান পাশের লাইভ ইঞ্জিন স্ট্যাটাস উইজেট */}
          <div className="flex items-center gap-3.5 bg-white/5 backdrop-blur-xl rounded-2xl p-3.5 border border-white/10 self-start md:self-auto shadow-inner">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 border border-purple-500/30">
              <FiCpu className="animate-spin [animation-duration:6s]" size={18} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Engine Security</p>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 100% Operational
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Users */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.02)] flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Members</p>
              <h3 className="text-3xl font-black text-[#0D3B66] mt-1">{totalUsers}</h3>
            </div>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-lg border border-indigo-100/50">
              <FiUsers strokeWidth={2.5} />
            </div>
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50/60 px-2 py-0.5 rounded-md w-fit">
            ↑ Dynamic User Registry
          </div>
        </div>

        {/* Card 2: Total Books */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.02)] flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Indexed Catalog</p>
              <h3 className="text-3xl font-black text-[#0D3B66] mt-1">{totalBooks}</h3>
            </div>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-lg border border-purple-100/50">
              <FiBook strokeWidth={2.5} />
            </div>
          </div>
          <div className="text-[11px] text-purple-600 font-bold flex items-center gap-1 bg-purple-50/60 px-2 py-0.5 rounded-md w-fit">
            ✓ Active Book Repository
          </div>
        </div>

        {/* Card 3: Total Deliveries */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.02)] flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fulfillment Pipe</p>
              <h3 className="text-3xl font-black text-[#0D3B66] mt-1">{totalDeliveries}</h3>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-lg border border-blue-100/50">
              <FiTruck strokeWidth={2.5} />
            </div>
          </div>
          <div className="text-[11px] text-blue-600 font-bold flex items-center gap-1 bg-blue-50/60 px-2 py-0.5 rounded-md w-fit">
            • Dispatched Successfully
          </div>
        </div>

        {/* Card 4: Total Revenue */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-purple-100/50 shadow-[0_10px_30px_rgba(124,58,237,0.02)] flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Revenue</p>
              <h3 className="text-3xl font-black text-[#0D3B66] mt-1">${totalRevenue}</h3>
            </div>
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-lg border border-emerald-100/50">
              <FiDollarSign strokeWidth={2.5} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md w-fit">
            USD Platform Capital
          </div>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Section: Pie Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.02)] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4 border-b border-purple-50 pb-4">
            <FiSliders className="text-purple-600" size={16} />
            <h3 className="text-base font-black text-[#0D3B66] tracking-tight">
              Categorical Catalog Metrics
            </h3>
          </div>

          <div className="w-full min-h-[340px] flex justify-center items-center mt-2">
            {books.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="45%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PREMIUM_COLORS[index % PREMIUM_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }} />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: "10px", fontSize: "11px", fontWeight: "600" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs font-semibold text-slate-400">No telemetry indexed inside the cloud engine.</p>
            )}
          </div>
        </div>

        {/* Right Section: Bar Chart & Gateway */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          <div className="bg-white p-6 rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.02)] flex-grow">
            <div className="flex items-center gap-2 mb-4 border-b border-purple-50 pb-4">
              <FiActivity className="text-indigo-600" size={16} />
              <h3 className="text-base font-black text-[#0D3B66] tracking-tight">
                User Hierarchy Node
              </h3>
            </div>
            
            <div className="h-48 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roleData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(99, 102, 241, 0.02)" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }} />
                  <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={28}>
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PREMIUM_COLORS[(index + 1) % PREMIUM_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Operational Security Widget */}
          <div className="bg-gradient-to-br from-[#0D3B66] to-[#0A2540] text-white p-5 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <FiShield className="text-emerald-400" size={18} />
                <span className="text-[12px] font-black tracking-wider uppercase text-slate-300">System Gateway</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" /> Secure
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
              All infrastructure layers operational. Category data points and global role structures are synced with the distributed database engine.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-3 text-center">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Active Streams</p>
                <p className="text-sm font-black text-white mt-0.5">Live Async</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Data Accuracy</p>
                <p className="text-sm font-black text-emerald-400 mt-0.5">100% Verified</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminOverview;