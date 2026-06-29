"use client";

import React from "react";
import Image from "next/image";
import { FiBook, FiDollarSign, FiClock, FiTrendingUp, FiActivity, FiPieChart, FiCalendar } from "react-icons/fi";
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
  AreaChart,
  Area
} from "recharts";

const LibrarianOverview = ({ orders = [], books = [] }) => {
  // ১. Quick Stats Logic (100% Identical & Dynamic)
  const totalBooksListed = books.length;

  const activePendingRequests = orders.filter(
    (order) => order.orderStatus?.toLowerCase() === "pending"
  ).length;

  const totalEarnings = orders
    .filter((order) => order.orderStatus?.toLowerCase() === "delivered")
    .reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0)
    .toFixed(2);

  // ২. Chart 1: Earnings by Category
  const categoryEarnings = {};
  orders.forEach((order) => {
    if (order.orderStatus?.toLowerCase() === "delivered") {
      const category = order.bookDetails?.category || "Unknown";
      categoryEarnings[category] =
        (categoryEarnings[category] || 0) + (parseFloat(order.price) || 0);
    }
  });

  const barChartData = Object.keys(categoryEarnings).map((key) => ({
    name: key,
    earnings: Number(categoryEarnings[key].toFixed(2)),
  }));

  // ৩. NEW DYNAMIC CHART: Monthly Earnings Timeline (Area Chart)
  // এটি আপনার অর্ডারের 'createdAt' বা তারিখ থেকে মাস নিয়ে ডাইনামিকালি রেভিনিউ ট্রেন্ড লাইন তৈরি করবে
  const monthlyDataMap = {};
  orders.forEach((order) => {
    if (order.orderStatus?.toLowerCase() === "delivered") {
      // যদি createdAt ডেট থাকে তবে সেটা ব্যবহার করবে, না থাকলে কারেন্ট মাসের নাম দেখাবে
      const dateObj = order.createdAt ? new Date(order.createdAt) : new Date();
      const monthName = dateObj.toLocaleString("default", { month: "short" });
      
      monthlyDataMap[monthName] = (monthlyDataMap[monthName] || 0) + (parseFloat(order.price) || 0);
    }
  });

  // যদি কোনো ডেটা না থাকে তবে গ্রাফ খালি না দেখিয়ে একটি সুন্দর ডিফল্ট ডাইনামিক স্টেট সেট করবে
  const areaChartData = Object.keys(monthlyDataMap).length > 0 
    ? Object.keys(monthlyDataMap).map(month => ({ month, revenue: Number(monthlyDataMap[month].toFixed(2)) }))
    : [{ month: new Date().toLocaleString("default", { month: "short" }), revenue: Number(totalEarnings) }];

  // ৪. Chart 3: Order Status Distribution (Pie Chart)
  const statusCount = {};
  orders.forEach((order) => {
    const status = order.orderStatus || "pending";
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const pieChartData = Object.keys(statusCount).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: statusCount[key],
  }));

  const PIE_COLORS = ["#F59E0B", "#2563EB", "#7C3AED", "#EF4444"]; // Pending, Dispatched, Delivered, Cancelled

  // ৫. Mini-list: Most Requested Books
  const bookRequests = {};
  orders.forEach((order) => {
    const title = order.bookDetails?.title || order.title;
    if (title) {
      if (!bookRequests[title]) {
        bookRequests[title] = {
          count: 0,
          image: order.bookDetails?.image || "/placeholder-book.png",
          author: order.bookDetails?.author || "Unknown",
        };
      }
      bookRequests[title].count += 1;
    }
  });

  const topRequestedBooks = Object.keys(bookRequests)
    .map((title) => ({
      title,
      ...bookRequests[title],
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    // পেছনের ব্যাকগ্রাউন্ডে হালকা পার্পল ব্লেন্ডেড আভা (bg-purple-50/40) এবং গ্লাস-মরফিজম ভাইব দেওয়া হয়েছে
    <div className="space-y-8 w-full max-w-[1400px] mx-auto p-4 md:p-6 bg-gradient-to-tr from-purple-50/30 via-transparent to-indigo-50/20 rounded-3xl animate-fadeIn">
      
      {/* --- QUICK STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Books */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-purple-100 shadow-[0_10px_30px_rgba(124,58,237,0.03)] flex items-center justify-between relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-600/5 rounded-full blur-xl" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl border border-blue-100 shadow-sm">
              <FiBook strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Total Books Listed</p>
              <h3 className="text-2xl font-black text-[#0D3B66] mt-0.5">{totalBooksListed}</h3>
            </div>
          </div>
        </div>

        {/* Card 2: Total Earnings */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-purple-100 shadow-[0_10px_30px_rgba(124,58,237,0.03)] flex items-center justify-between relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-600/5 rounded-full blur-xl" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl border border-purple-100 shadow-sm">
              <FiDollarSign strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-2xl font-black text-[#0D3B66] mt-0.5">${totalEarnings}</h3>
            </div>
          </div>
        </div>

        {/* Card 3: Pending Requests */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-purple-100 shadow-[0_10px_30px_rgba(124,58,237,0.03)] flex items-center justify-between relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-amber-600/5 rounded-full blur-xl" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl border border-amber-100 shadow-sm">
              <FiClock strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Pending Approvals</p>
              <h3 className="text-2xl font-black text-[#0D3B66] mt-0.5">{activePendingRequests}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* --- GRID CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Charts Section (Takes 2/3 space) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* NEW GRAPH: Dynamic Revenue Timeline Area Chart */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.02)]">
            <div className="flex items-center gap-2 mb-6 border-b border-purple-50 pb-4">
              <FiCalendar className="text-purple-600" size={16} />
              <h3 className="text-base font-black text-[#0D3B66] tracking-tight">Revenue Growth Timeline</h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                    formatter={(value) => [`$${value}`, "Revenue Generated"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Category Earnings */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.02)]">
            <div className="flex items-center gap-2 mb-6 border-b border-purple-50 pb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
              <h3 className="text-base font-black text-[#0D3B66] tracking-tight">Financial Matrix by Category</h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: "rgba(124, 58, 237, 0.02)" }}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                    formatter={(value) => [`$${value}`, "Revenue"]}
                  />
                  <Bar dataKey="earnings" fill="#7C3AED" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column (Takes 1/3 space) */}
        <div className="lg:col-span-1 space-y-6 flex flex-col h-full">
          
          {/* Chart 3: Pipeline Distribution (Pie Chart Moved to Right Sidebar for unique look) */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.02)]">
            <div className="flex items-center gap-2 mb-4 border-b border-purple-50 pb-3">
              <FiPieChart className="text-purple-600" size={16} />
              <h3 className="text-base font-black text-[#0D3B66] tracking-tight">Distribution Flow Pipeline</h3>
            </div>
            <div className="h-44 w-full flex justify-center items-center">
              {orders.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-xs font-semibold text-slate-400">No distribution data.</p>
              )}
            </div>
            <div className="flex flex-col gap-2.5 mt-2">
              {pieChartData.slice(0, 3).map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-xs border-b border-slate-50 pb-1 last:border-none">
                  <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></span>
                    {entry.name}
                  </div>
                  <span className="text-slate-700 font-bold">{entry.value} Items</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini-list: Velocity Rankings */}
          <div className="bg-white p-6 rounded-3xl border border-purple-100/60 shadow-[0_15px_40px_rgba(124,58,237,0.02)] flex-grow">
            <div className="flex items-center justify-between mb-4 border-b border-purple-50 pb-3">
              <h3 className="text-base font-black text-[#0D3B66] tracking-tight flex items-center gap-1.5">
                <FiActivity className="text-purple-600" /> Velocity Rankings
              </h3>
            </div>
            
            <div className="space-y-3.5">
              {topRequestedBooks.length > 0 ? (
                topRequestedBooks.map((book, index) => (
                  <div key={index} className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-purple-50/40 transition-colors">
                    <div className="relative w-9 h-12 rounded-md overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200/60">
                      <Image src={book.image} alt={book.title} fill className="object-cover" sizes="36px" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-slate-800 text-[12px] truncate tracking-tight">{book.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{book.author}</p>
                    </div>
                    <div className="flex-shrink-0 bg-purple-50 text-purple-700 font-extrabold px-2 py-0.5 rounded-md text-[10px]">
                      {book.count} Req
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 text-xs py-6">No data parameters monitored yet.</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LibrarianOverview;