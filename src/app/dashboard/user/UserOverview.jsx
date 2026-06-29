"use client";

import React from "react";
import { FiBookOpen, FiTruck, FiDollarSign, FiAward, FiCompass, FiCpu } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const UserOverview = ({ orders = [] }) => {
  // ১. Quick Stats ক্যালকুলেশন (100% Identical & Dynamic)
  const totalBooksRead = orders.filter(
    (order) => order.orderStatus === "delivered"
  ).length;

  const pendingDeliveries = orders.filter(
    (order) => order.orderStatus !== "delivered"
  ).length;

  const totalSpentOnFees = orders.reduce((sum, order) => {
    const fee = parseFloat(order.bookDetails?.deliveryFee) || 0;
    return sum + fee;
  }, 0).toFixed(2);

  // ২. Bar Chart ডাটা (বইয়ের ক্যাটাগরি অনুযায়ী)
  const categoryCount = {};
  orders.forEach((order) => {
    const category = order.bookDetails?.category || "Unknown";
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    count: categoryCount[key],
  }));

  // ৩. Pie Chart ডাটা (অর্ডার স্ট্যাটাস অনুযায়ী)
  const statusCount = {};
  orders.forEach((order) => {
    const status = order.orderStatus || "pending";
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const statusData = Object.keys(statusCount).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: statusCount[key],
  }));

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

  return (
    <div className="space-y-8 w-full max-w-[1400px] mx-auto p-4 md:p-6 bg-gradient-to-tr from-emerald-50/30 via-transparent to-blue-50/20 rounded-3xl animate-fadeIn">
      
      {/* 🔮 --- BRAND NEW USER HERO BANNER --- */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6 md:p-8 text-white shadow-[0_20px_50px_rgba(15,23,42,0.15)]">
        {/* গ্লোয়িং ব্যাকগ্রাউন্ড ব্যাকড্রপস */}
        <div className="absolute -right-10 -top-20 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            {/* মডার্ন এলিট রিডার ব্যাজ */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 
              Personal Knowledge Hub
            </span>
            
            {/* ডাইনামিক বোল্ড হেডার */}
            <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-200 bg-clip-text text-transparent">
              Welcome Back to Your Reading Dashboard
            </h1>
            
            {/* রিফাইনড ডেসক্রিপশন */}
            <p className="mt-1.5 text-xs md:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
              Track your literal journey, analyze preferred genres, review transaction pipelines, and discover your overall reading velocity over time.
            </p>
          </div>
          
          {/* লাইভ ক্যাটালগ ট্র্যাক বক্স */}
          <div className="flex items-center gap-3.5 bg-white/5 backdrop-blur-xl rounded-2xl p-3.5 border border-white/10 self-start md:self-auto shadow-inner">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              <FiCompass className="animate-spin [animation-duration:12s]" size={18} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Reading Velocity</p>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                Steady Progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Books Read */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-600/5 rounded-full blur-xl" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl border border-emerald-100 shadow-sm">
              <FiBookOpen strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Total Books Read</p>
              <h3 className="text-2xl font-black text-slate-800 mt-0.5">{totalBooksRead}</h3>
            </div>
          </div>
        </div>

        {/* Card 2: Pending Deliveries */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-amber-600/5 rounded-full blur-xl" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl border border-amber-100 shadow-sm">
              <FiTruck strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Pending Deliveries</p>
              <h3 className="text-2xl font-black text-slate-800 mt-0.5">{pendingDeliveries}</h3>
            </div>
          </div>
        </div>

        {/* Card 3: Total Spent on Fees */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-600/5 rounded-full blur-xl" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl border border-blue-100 shadow-sm">
              <FiDollarSign strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Total Spent on Fees</p>
              <h3 className="text-2xl font-black text-slate-800 mt-0.5">${totalSpentOnFees}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart: Books by Category */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h3 className="text-base font-black text-slate-800 tracking-tight">Books by Category</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: "rgba(59, 130, 246, 0.02)" }}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Order Status Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.01)]">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="text-base font-black text-slate-800 tracking-tight">Order Status Breakdown</h3>
          </div>
          <div className="h-56 w-full flex justify-center items-center">
            {orders.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs font-semibold text-slate-400">No data parameters available</p>
            )}
          </div>
          
          {/* Custom Minimalist Legend */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-4 border-t border-slate-50 pt-4">
            {statusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name} <span className="text-slate-800 font-bold">({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserOverview;